<template>
    <div class="container">
        <canvas id="video-canvas" ref="videoCanvas"></canvas>
          <img src="../assets/record_1.png" class="out_time"></img>
          <img src="../assets/record_2.png" class="in_time">
          <div class="count_time" v-if="show_count_time">{{ count_time }}</div>
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
      show_count_time: false,  // 是否显示计时
      start_record: true,
      count_time: "",
      timeInterval2: ""
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
              console.log('执行发送数据');
            }
          }, this.timeout)
        }
      };
      ws.onopen = function() {
        console.log('onopen', new Date().getTime());
        heartCheck.start();
      };
      ws.onmessage = function(evt) {
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
            if(that.timeInterval2) {
              that.clearInterval(that.timeInterval2);
            }
        }

        //转码完成，跳转到显示页面
        if (data.category == "transcode" && data.method == "complete") {
          that.$store.commit('set_preview', data.preview);
          that.$store.commit('set_upload', data.path);
          that.$store.commit('set_step', 6);
          if(that.timeInterval2) {
            that.clearInterval(that.timeInterval2);
          }
          that.$router.push({ path: '/home'});
        }

        //点击完成录制
        if (data.category == "upload" && data.method == "complete") {
          that.$store.commit('set_downlink', data.link);
          ws.close();
        }

        console.log('current_step', that.current_step);
        // 首页、轮播页、预览页，断开连接
        if(that.current_step == 0 ||  that.current_step == 1 || that.current_step == 2) {
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
      this.$router.push({ path: '/home'});
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

      }, this.duration - 5);

      //计时器
      var n_sec = 0; //秒
      var n_min = 0; //分
      var n_hour = 0; //时
      this.timeInterval2 = setInterval(()=>{

        var str_sec = n_sec;
        var str_min = n_min;
        var str_hour = n_hour;
        if ( n_sec < 10) {
         str_sec = "0" + n_sec;
        }
        if ( n_min < 10 ) {
         str_min = "0" + n_min;
        }

        if ( n_hour < 10 ) {
         str_hour = "0" + n_hour;
        }

        this.count_time = str_hour + ":" + str_min + ":" + str_sec;
        this.show_count_time = true;
        n_sec++;
        if (n_sec > 59){
         n_sec = 0;
         n_min++;
        }
        if (n_min > 59) {
         n_sec = 0;
         n_hour++;
        }
      }, 1000)


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
    console.log("record mounted执行");
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
    .count_time {
      font-size: 0.26rem;
      position: absolute;
      bottom: 0.2rem;
      left: 8.6rem;
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
