<!--轮播页面1，预览2，全屏录制3，上传进度条4，预览合成6-->
<template>
    <div class="container">
        <div class="background-pic"></div>
        <div v-if="error_massage" class="error_massage mask">{{ error_massage }}</div>
        <!--点击预览、录制前-->
        <template v-if="current_step == 1">
            <home-swiper :list="swiperList" @click_preview="clickPreview" @click_record="clickRecord"></home-swiper>
        </template>

        <!--预览或完成录制 2 -->
        <template v-if="current_step == 2">
          <div class="mask"></div>
          <div class="vedio">
            <video :src="swiperList[current_index].url" controls="controls" autoplay>
            </video>
            <img class="record_btn" @click="clickRecord" src="../assets/record.png">
            <div class="time">{{ swiperList[current_index].duration  | timefilter }}</div>
          </div>
        </template>

        <template v-if="current_step == 6">
          <div class="mask"></div>
          <div class="vedio">
            <video :src="preview_add" controls="controls" ref="preview_video">
            </video>
            <div class="two_button">
              <img @click="button_left" src="../assets/left_btn_1.png"><img @click="button_right" src="../assets/right_btn_1.png">
              <!-- <button class="left" @click="button_left">预览合成</button><button class="right" @click="button_right">完成录制</button> -->
            </div>
          </div>
        </template>

        <!--上传进度-->
        <div class="step_upload" v-if="current_step == 4">
          <img src="../assets/loading.gif"></img>
        </div>

         <!--上传成功，显示二维码-->
        <div class="step_code" v-show="current_step == 5">
            <div class="code_image" id="qrcode">
              <img :src="this.link"></img>
            </div>
            <div>
                <p>扫描上方二维码可直接下载合成的视频</p>
                <p>还请尽快下载，视频只能保存7日下载源</p>
            </div>
        </div>

        <div class="back_bottom">
          <img v-if="current_step == 1 || current_step == 6 ||current_step == 5" src="../assets/back_home.png"  @click="backToCover">
          <img v-if="current_step ==2" src="../assets/exit_preview.png"  @click="backToHome">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import HomeSwiper from './Swiper'
import { getlist, upload } from '@/testServer.js'
import { mapState } from 'vuex'
import QRCode from 'qrcodejs2'  // 引入qrcode


export default {
    name: 'Home',
    components: {
        HomeSwiper
    },
    data() {
        return {
            buttonText: '返回首页',
            swiperList: []
        }
    },
    filters: {
      timefilter(val) {
        var t = Math.floor(val/1000);
        var h = Math.floor(t / 3600);
        if(h == 0) { h = ""; }
        else if(0<h<10) {
          h = '0'+Math.floor(t / 3600) + ":"
        }
        else {
          h = Math.floor(t / 3600) + ":"
        }
        var m = Math.floor((t / 60 % 60)) < 10 ? '0' + Math.floor((t / 60 % 60)) : Math.floor((t / 60 % 60));
        var s = Math.floor((t % 60)) < 10 ? '0' + Math.floor((t % 60)) : Math.floor((t % 60));
        return `${h}${m}:${s}`;
      }
    },
    computed: {
      img_src() {
        var img_src = "";
        if(this.current_step == 1 ||this.current_step == 5 || this.current_step == 6) {
          img_src = '../assets/back_home.png'
        }
        if( this.current_step == 2) {
          img_src = '../assets/exit_preview.png'
        }
        console.log(img_src);
        return img_src;
      },
      current_step() {
        return this.$store.state.current_step
      },
      link(){
        return this.$store.state.link
      },
      preview_add() {
        return this.$store.state.preview_add
      },
      upload_add() {
        return this.$store.state.upload_add
      },
      current_index () {
        console.log('current_index变化', this.$store.state.current_index);
        return this.$store.state.current_index;
      },
      error_massage() {
        return this.$store.state.error_massage
      }
    },
    methods: {
        backToCover() {
          this.$router.push({path: '/'});
        },
        backToHome () {
          this.$store.commit('set_step', 1)
        },
        getSrc() {
          return '@/assets/back_home.png';
        },
        qrcode(url) {
          let qrcode = new QRCode('qrcode', {
            width: 518+'px',
            height: 518+'px',
            text: url,
            colorDark : "#000",
            colorLight : "#fff",
          })
        },
        button_left() {
            var video = this.$refs.preview_video;
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
            console.log('点预览合成')
        },
        button_right() {
          console.log('上传地址', this.upload_add);
          console.log('上传地址2', this.link);

          upload( this.upload_add).then(res=>{
            console.log('上传预览素材', res);
            console.log("global_link", this.link);
            //上传成功
            if(res.status == 0){
              if(!this.link){
                this.$store.commit('set_step', 4);
              }
            }
          }).catch(err => {
              //提示错误
          })
        },
        clickPreview() {
            this.$store.commit('set_step', 2)
            // this.current_index = val;
        },
        clickRecord() {
            this.$store.commit('set_video', this.swiperList[this.current_index]);
            this.$router.push({path: '/record'});
        },
        getSwiperList() {
            getlist().then(res => {
                this.swiperList = res.data || [];
            }).catch(err => {
                //提示错误
            })
        }
    },
    watch: {
        current_step(val) {
            // 生成二维码
            if(val == 4 && this.link) {
              console.log(3);
              this.$store.commit('set_step', 5);
            }
        },
        preview_add(val) {
          console.log('preview_add', val);
        },
        link(val) {
          if(val && this.current_step == 4) {
            console.log("监听link变化", 1);
            this.$store.commit('set_step', 5)
          }
          if( this.link && this.current_step == 4) {
            console.log("监听link变化", 2);
            this.$store.commit('set_step', 5)
          }
        },
        current_index (val) {
            console.log('监听current_index', val);
        }
    },
    mounted() {
        this.getSwiperList();
    }
}
</script>

<style lang="stylus" >
  .container {
    position: relative;
    display: flex;
    justify-content: center;

    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.6;
    }
    .vedio {
      position: fixed;
      background-color: #fff;
      margin-top: 3.15rem;
      width: 9.22rem;
      height: 5.2rem;
      border-radius: .25rem;
      display: flex;
      justify-content: center;
      .time {
        position: absolute;
        top: 5.6rem;
        font-size: 0.48rem;
        color: #17D7C5;
      }
      .record_btn {
        bottom: 0;
        position: absolute;
        left: 50%;
        margin-left: -1.54rem;
        width: 3.08rem;
        height: 0.74rem;
      }
      video {
       width: 100%;
       height: 100%;
       object-fit: fill;
      }
      .two_button {
        width: 4.8rem;
        position: absolute;
        height: 0.7rem;
        bottom: 0;
        z-index:999;
        img {
          display: inline-block;
          width: 2.4rem;
          height: 0.7rem;
        }
      }
    }
    .out_time {
      position: fixed;
      font-size: 0.48rem;
      color: #17D7C5;
      bottom: 1.71rem;
    }
    .back_bottom {
      position: fixed;
      bottom: 0.67rem;
      img {
        width: 2rem;
        height: 0.5rem;
      }
    }
  }
  .step_code {
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.65rem;
      .code_image {
        margin-top: 2.87rem;
        width: 5.18rem;
        height: 5.18rem;
        padding: 0.36rem;
        background-color: #fff;
        z-index: 88;
        border-radius: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2){
        margin-top: 0.3rem;
        color: rgba(0,42,38,1);
        font-size: 0.24rem;
      }
  }
  .step_upload {
    position: fixed;
    top: 4.15rem;
    width: 5.18rem;
    border-radius: 0.2rem;
    height: 5.18rem;
    background-color: #fff;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        z-index: 3;
      }
  }
  .error_massage {
    color: #fff;
    font-size:1 rem;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
    z-index:-999;
}
</style>
