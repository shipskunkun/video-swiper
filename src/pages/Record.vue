<template>
    <div class="container">
        <canvas id="video-canvas" ref="videoCanvas"></canvas>
          <img src="../assets/record_1.png" class="out_time"></img>
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
      duration: 0, //视频长度
      count_number: 5,  //倒计时从5开始
      timeInterval: '',  //全局interval
      show_count_number: false,  // 是否显示倒计时
      start_record: true,
      record_time: ""
    }
  },
   computed: {
      current_step() {
        return this.$store.state.current_step
      }
    },
  methods: {
    beginRecord(url) {
      beginrecord(url).then(res => {
        //开始录制成功
        if (res.status == 0) {
          this.beginPullVedio();
          //通知推送 WebSocket
          // this.beginPullProgress();
        }
      }).catch(err => {
        //提示错误
      })
    },
    beginPullProgress() {
      var that = this;
      var ws = new WebSocket('ws://meeting-front.hunterslab.cn/station/');
      // var ws = new WebSocket('ws://localhost:2011');
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
        /* 后端开始录制，开始倒计时
        if(this.start_record && received_msg) {
            this.countDown();
            this.start_record = false;
            console.log('开始收到第一个信息', new Date().getTime());
        }
        */
        var data = evt.data;
        try {
          data = JSON.parse(evt.data);
        } catch (err) {
          data = evt.data;
        }
        console.log('转换后的data', data, new Date().getTime());

        //失败
        if(data.category == "record" && data.method == "failed") {
            that.show_error_message('录制失败, 返回模板页');
            ws.close();
        }

        if(data.category == "upload" && data.method == "failed") {
            that.show_error_message('上传失败, 返回模板页');
            ws.close();
        }

        if(data.category == "transcode" && data.method == "failed") {
            that.show_error_message('转码失败, 返回模板页');
            ws.close();
        }


        //录制完成，跳转到loading页面
        if(data.category == "record" && data.method == "complete") {
            that.$store.commit('set_step', 4);
            that.$router.push({ path: '/home'});
            console.log('录制完成', new Date().getTime());
        }

        //转码完成，跳转到显示页面
        if (data.category == "transcode" && data.method == "complete") {
          that.$store.commit('set_preview', data.preview);
          that.$store.commit('set_upload', data.path);
          that.$store.commit('set_step', 6);
          that.$router.push({ path: '/home'});
        }

        //点击完成录制
        if (data.category == "upload" && data.method == "complete") {
          that.$store.commit('set_downlink', data.link);
          ws.close();
        }

        // 首页、轮播页、预览页，断开连接
        if(this.current_step == 0 ||  this.current_step == 1 || this.current_step == 2) {
            ws.close();
        }
        heartCheck.reset();
      };

      ws.onclose = function() {
        // if (evnt.code != 4500) {
          //4500为服务端在打开多tab时主动关闭返回的编码
          // reconnect();//重连
        // }
      };
    },
    show_error_message(msg) {
      this.$store.commit('set_step', 1);
      that.$router.push({ path: '/home'});
      this.$store.commit('set_error', msg);
      setTimeout(()=> {
        this.$store.commit('set_error', '');
      }, 3000);
    },
    countDown() {
      // 倒计时5 秒，后跳转到 loading 页面
      setTimeout(() => {
        // 视频时长 - 5 秒后，倒数
        this.timeInterval = setInterval(() => {
          if(this.count_number > 0) {
            this.count_number = this.count_number - 1;
          }
          else {
            clearInterval(this.timeInterval);
          }
          console.log('我执行倒计时了', this.count_number);
        }, 1000);
        this.show_count_number = true;

      }, this.duration - 5)
    },
    beginPullVedio() {
      var that = this;
      var canvas = document.getElementById('video-canvas');
      var url = 'ws://meeting-front.hunterslab.cn/live/';
      // var url = 'ws://localhost:2012';

      var player = new JSMpeg.Player(url, {
        canvas: canvas,
        loop: true,
        autoplay: true,
        progressive: false,
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
        onSourceCompleted: function (player) {
            console.log("Completed", new Date().getTime());
        },
        onSourceCompleted: function() {
            console.log('onSourceCompleted', new Date().getTime());
        }
      });

      this.countDown();
      this.beginPullProgress();

    }
  },
  watch: {
    /*没效果
    count_number(val) {
      if (val == 0) {
        clearInterval(this.timeInterval);
        this.$store.commit('set_step', 4);
        this.$router.push({ path: '/home'});
      }
    }
    */
  },
  mounted() {
    // 视频信息
    var video = this.$store.state.current_video;
    //开始播放录制
    this.beginRecord(video.file);
    //倒计时
    this.duration = video.duration;
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
