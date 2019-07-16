<!--首页1，预览2，全屏录制3，上传进度条4，二维码5，预览合成6-->
<template>
    <div class="container">
        <div class="background-pic"></div>
        <!--点击预览、录制前-->
        <template v-if="current_step == 1">
            <home-swiper :list="swiperList" @click_preview="clickPreview" @click_record="clickRecord"></home-swiper>
        </template>

        <!--预览或完成录制 2 -->
        <template v-if="current_step == 2">
          <div class="vedio">
            <video :src="swiperList[current_index].url" controls="controls" autoplay>
            </video>
            <button>录制</button>
          </div>
          <!--todo-->
          <!-- <div class="out_time">04:58</div> -->
        </template>

        <template v-if="current_step == 6">
          <div class="vedio">
            <video :src="preview_add" controls="controls" autoplay>
            </video>
            <div class="two_button">
              <button class="left" @click="button_left">预览合成</button><button class="right" @click="button_right">完成录制</button>
            </div>
          </div>
        </template>

        <!--上传进度-->
        <div class="step_upload" v-if="current_step == 4">
            <div class="progress">
                <img src="../assets/progress.png"></img>
            </div>
            <div>Loding中</div>
        </div>

         <!--上传成功，显示二维码-->
        <div class="step_code" v-if="current_step == 5">
            <div class="code_image">
              {{ link }}
            </div>
            <div>
                <p>扫描上方二维码可直接下载合成的视频</p>
                <p>还请尽快下载，视频只能保存7日下载源</p>
            </div>
        </div>

        <button v-if="current_step == 2 ||current_step == 5 || current_step == 6" class="button" @click="buttonClick">{{ buttonText }}</button>
    </div>
</template>

<script>
import axios from 'axios'
import HomeSwiper from './Swiper'
import { getlist, upload } from '@/testServer.js'
import { mapState } from 'vuex'


export default {
    name: 'Home',
    components: {
        HomeSwiper
    },
    data() {
        return {
            current_index: 0,
            buttonText: '返回首页',
            swiperList: []
        }
    },
    computed: {
      current_step() {
        return this.$store.state.current_step
      },
      link() {
        return this.$store.state.link
      },
      preview_add() {
        console.log('预览视频', this.$store.preview_add);
        return this.$store.state.preview_add
      },
      upload_add() {
        return this.$store.state.upload_add
      }
    },
    methods: {
        button_left() {
            console.log('点预览合成')
        },
        button_right() {
          console.log('上传地址', this.upload_add);

          upload( this.upload_add).then(res=>{
            console.log('点击上传', res);
            console.log("global_link", this.link);
            //上传成功
            if(res.status == 0) {
              this.$store.commit('set_step', 4);
            }
          }).catch(err => {
              //提示错误
          })
        },
        buttonClick() {
            this.$store.commit('set_step', 1);
        },
        clickPreview(val) {
            this.$store.commit('set_step', 2)
            // 当前是第几张
            this.current_index = val;
        },
        clickRecord() {
            var vedio_message = JSON.stringify(this.swiperList[this.current_index]);
            this.$router.push({name: 'record',params: {message: vedio_message}})
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
          console.log('current_step val', val)
            if (val == 2) {
                this.buttonText = '退出预览'
            } else {
                this.buttonText = '返回首页'
            }
            // 预览合成、完成录制
            if(val == 6) {
            }
        },
        preview_add(val) {
          console.log('preview_add', val);
        }
    },
    mounted() {
        this.getSwiperList();
    },
    actived() {
      console.log('actived');
    }
}
</script>

<style lang="stylus" >
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    .vedio {
      position: fixed;
      background-color: #fff;
      margin-top: 3.15rem;
      width: 9.22rem;
      height: 5.2rem;
      border-radius: .25rem;
      video {
       width: 100%;
       height: 100%;
       object-fit: fill;
      }
      .two_button {
        width: 4.8rem;
        position: absolute;
        left: 50%;
        margin-left: -2.4rem;
        bottom: 0;
        font-size: 0.26rem;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        opacity: 0.4;
        button {
          display: inline-block;
          text-align: center;
          line-height: 0.7rem;
          width: 2.4rem;
          height: 0.7rem;
          background-color: rgba(255,209,67,50);
          box-sizing: border-box;
        }
        .left {
          border-top-left-radius: 0.25rem;
          border-right: 1px solid rgba(255,209,67,1);
        }
        .right {
          border-top-right-radius: 0.25rem;
        }
      }
      & > button {
        opacity: 0.65;
        position: absolute;
        bottom: 0;
        margin: 0 auto;
        width: 3rem;
        left: 50%;
        margin-left: -1.5rem;
        height: 0.7rem;
        background-color: #fff;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        background-color: #00A293;
      }
    }
    .out_time {
      position: fixed;
      font-size: 0.48rem;
      color: #17D7C5;
      bottom: 1.71rem;
    }
    .button {
      position: fixed;
      width: 2rem;
      background-color: #fff;
      color: #17D7C5;
      font-size: 0.22rem;
      border-radius: 0.25rem;
      bottom: 0.67rem;
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #00A293;
    }
  }
  .step_code {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .code_image {
      margin-top: 2.87rem;
      width: 5.18rem;
      height: 5.18rem;
      background-color: #fff;
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
    width: 9.2rem;
    border-radius: 0.2rem;
    height: 3rem;
    background-color: #fff;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .progress {
      margin-top: 0.9rem;
      margin-bottom: 0.4rem;
      width: 6rem;
      height: 1rem;
      img {
        width: 100%;
        height: 100%;
        z-index: 3;
      }
    }
    div:nth-child(2){
      color: rgba(0,42,38,1);
      font-size: 0.35rem;
    }
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
