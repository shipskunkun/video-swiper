<template>
    <div class="container">
        <div class="background-pic"></div>
        <video></video>
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
            console.log('开始录制', res);
        }).catch(err => {
            //提示错误
        })
    },
    beginPullVedio(url) {
        var ws = new WebSocket(url);
        ws.onmessage = function(evt) {
            var received_msg = evt.data;
            console.log('数据已接收', received_msg)
            alert("数据已接收...");
        };
    },
    beginPullProgress(url) {
        var ws = new WebSocket(url);
        ws.onopen = function() {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("发送数据");
            alert("数据发送中...");
        };

        ws.onmessage = function(evt) {
            var received_msg = evt.data;
            console.log('数据已接收', received_msg)
            alert("数据已接收...");
        };

        ws.onclose = function() {
            // 关闭 websocket
            alert("连接已关闭...");
        };
    }
  },
  mounted () {
    // 视频地址
    var url = JSON.parse(this.$route.params.message).url;
    this.beginRecord(url);
    console.log("kakaka", "WebSocket" in window);

    this.beginPullProgress('ws://meeting-front.hunterslab.cn/live/');
    this.beginPullVedio('ws://meeting-front.hunterslab.cn/live/');
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
