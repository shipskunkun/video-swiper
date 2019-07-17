<template>
    <div class="container">
        <canvas id="video-canvas" ref="videoCanvas"></canvas>
          <img src="../assets/record_1.png" class="out_time">lala</img>
          <img src="../assets/record_2.png" class="in_time">
          <div class="count_number" v-if="show_count_number">{{ count_number }}</div>
    </div>
</template>

<script>
import HomeSwiper from './Swiper'
import axios from 'axios'
import { beginrecord, getWebsocket  } from '@/testServer.js'

export default {
  name: 'Record',
  data() {
    return {
      duration: 0,
      count_number: 5,
      timeInterval: '',
      show_count_number: false,
      start_record: true,
      record_time: ""
    }
  },
  methods: {
    beginRecord(url) {
      beginrecord(url).then(res => {
        //开始录制成功
        if (res.status == 0) {
          this.beginPullVedio();
          //通知推送 WebSocket
          this.beginPullProgress();
        }

      }).catch(err => {
        //提示错误
      })
    },
    beginPullProgress() {
      var that = this;
      var ws = new WebSocket('ws://meeting-front.hunterslab.cn/station/');
      var heartCheck = {
        timeout: 1000,
        timeoutObj: null,
        reset: function() {
          clearInterval(this.timeoutObj);
          this.start();
        },
        start: function() {
          this.timeoutObj = setInterval(function() {
            if (ws.readyState == 1) {
              ws.send("HeartBeat");
            }
          }, this.timeout)
        }
      };
      ws.onopen = function() {
        console.log('onopen', new Date().getTime());
        heartCheck.start();
      };
      ws.onmessage = function(evt) {
        var received_msg = evt.data;
        // 后端开始录制，开始倒计时
        if(this.start_record && received_msg) {
            // this.countDown();
            this.start_record = false;
            console.log('开始收到第一个信息', new Date().getTime());
        }
        var data = evt.data;
        try {
          data = JSON.parse(evt.data);
        } catch (err) {
          data = evt.data;
        }
        console.log('转换后的data', data);

        if(data.category == "record" && data.method == "complete") {
            console.log('录制完成', new Date().getTime());
        }
        if (data.category == "transcode" && data.method == "complete") {
          console.log("执行预览", new Date().getTime());

          that.$store.commit('set_preview', data.preview);
          that.$store.commit('set_upload', data.path);
          that.$store.commit('set_step', 6);
          that.$router.push({name: 'Home'})
        }

        if (data.category == "upload" && data.method == "complete") {
          that.$store.commit('set_downlink', data.link);
        }
        heartCheck.reset();
      };

      ws.onclose = function() {
        console.log("onclose", evnt);
        if (evnt.code != 4500) {
          //4500为服务端在打开多tab时主动关闭返回的编码
          // reconnect();//重连
        }
      };
    },
    countDown() {
      // 倒计时5 秒，后跳转到 loading 页面
      setTimeout(() => {
        // 视频时长 - 5 秒后，倒数
        this.timeInterval = setInterval(() => {
          this.count_number--;
        }, 1000);
        this.show_count_number = true;

      }, this.duration - 5)
    },
    beginPullVedio() {
      var canvas = document.getElementById('video-canvas');
      var url = 'ws://meeting-front.hunterslab.cn/live/';
      var player = new JSMpeg.Player(url, {
        canvas: canvas,
        loop: true,
        autoplay: true,
        onPlay: function() {
            console.log('onPlay', new Date().getTime());
        },
        onPause: function() {
            console.log('onPause', new Date().getTime());
        },
        onEnded: function() {
            console.log('onEnded', new Date().getTime());
        },
        onStalled: function() {
            console.log('onStalled', new Date().getTime());
        },
        onSourceEstablished: function() {
            console.log('onSourceEstablished', new Date().getTime());
        },
        onSourceCompleted: function() {
            console.log('onSourceCompleted', new Date().getTime());
        }
      });
       console.log("开始播视频", new Date().getTime());
    }
  },
  watch: {
    count_number(val) {
      if (val == 0) {
        clearInterval(this.timeInterval);
        this.$store.commit('set_step', 4);
        this.$router.push({
          name: 'Home'
        });
      }
    }
  },
  mounted() {
    // 视频地址
    var data = "";
    try {
      data = JSON.parse(this.$route.params.message)
    } catch (err) {
      data = "";
    }
    console.log(data);
    //开始播放录制
    this.beginRecord(data.file);
    //倒计时
    this.duration = data.duration;
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
.container {
    position: relative;
    display: flex;
    justify-content: center;
    .out_time {
      position: absolute;
      bottom: 0;
      width: 4.8rem;
      height: 0.7rem;
      z-index: 999;
      display: block;
    }
    .count_number {
      position: absolute;
      bottom: 3.54rem;
      width: 2.59rem;
      height: 3.72rem;
      z-index: 999;
      display: block;
      font-size: 5rem;
      color: #A0A0A0;
    }
    .video-canvas {
      width: 100%;
      height: 100%;
    }
    .in_time {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      bottom: 0.135rem;
      left: 7.925rem;
    }
}
</style>
