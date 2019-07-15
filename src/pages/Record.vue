<template>
    <div class="container">
        <canvas id="video-canvas" ref="videoCanvas" width="900" height="600"></canvas>
    </div>
</template>

<script>
import HomeSwiper from './Swiper'
import axios from 'axios'
import { beginrecord } from '@/testServer.js'

export default {
  name: 'Record',
  data () {
    return {
    }
  },
  methods: {
    beginRecord(url) {
        beginrecord(url).then(res => {
            //开始录制成功
            if(res.status == 0) {
                this.beginPullVedio();
                //通知推送 WebSocket
                this.beginPullProgress();
            }

        }).catch(err => {
            //提示错误
        })
    },
    beginPullVedio() {
        var canvas = document.getElementById('video-canvas');
        var url = 'ws://meeting-front.hunterslab.cn/live/';
        var player = new JSMpeg.Player(url, {canvas: canvas,loop: true, autoplay: true});
    },

    beginPullProgress() {

        var ws = new WebSocket('ws://meeting-front.hunterslab.cn/station/');

        var heartCheck = {
            timeout: 30000,//30s
            timeoutObj: null,
            reset: function(){
                clearInterval(this.timeoutObj);
                this.start();
            },
            start: function(){
                this.timeoutObj = setInterval(function(){
                    if(ws.readyState==1){
                        ws.send("HeartBeat");
                    }
                }, this.timeout)
            }
        };

        console.log('beginPullProgress222');
        ws.onopen = function(){
            // Web Socket 已连接上，使用 send() 方法发送数据
            // ws.send("发送数据");
            console.log('onopen');
            heartCheck.start();
        };
        ws.onmessage = function(evt) {
            var received_msg = evt.data;
            heartCheck.reset();
            console.log('PullProgress接收', evt);
        };

        ws.onclose = function() {
            console.log("onclose", evnt);
            if (evnt.code != 4500) {
                //4500为服务端在打开多tab时主动关闭返回的编码
                // reconnect();//重连
            }
        };
    }
  },
  mounted () {
    // 视频地址
    var url = JSON.parse(this.$route.params.message).file;
    this.beginRecord(url);

  }
}
</script>

<style lang="stylus" >
  .background-pic{
    background: url('~@/assets/bg.png') no-repeat center center;
    // background-size:cover;
    background-size: 100% 100%;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: -999;
}
</style>
