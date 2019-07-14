<!--首页1，预览2，全屏录制3，上传进度条4，二维码5，预览合成6-->
<template>
    <div class="container">
        <div class="background-pic"></div>
        <!--点击预览、录制前-->
        <template v-if="current_step == 1">
            <home-swiper :list="swiperList" @click_preview="clickPreview" @click_record="clickRecord"></home-swiper>
        </template>

        <!--预览或完成录制 2 或 6-->
        <template v-if="current_step == 2 || current_step == 6">
          <div class="vedio">
            <video></video>
            <button v-if="current_step == 2">录制</button>
            <div class="two_button" v-if="current_step == 6">
              <button class="left" @click="button_left">预览合成</button><button class="right" @click="button_right">完成录制</button>
            </div>
          </div>
          <div class="out_time">04:58</div>
        </template>

        <!--上传进度-->
        <div class="step_upload" v-if="current_step == 4">
            <div class="progress">
                <img src="../assets/progress.png"></img>
            </div>
            <div>Loding 50% completed</div>
        </div>

         <!--上传成功，显示二维码-->
        <div class="step_code" v-if="current_step == 5">
            <div class="code_image">
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
import HomeSwiper from './Swiper'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HomeSwiper
  },
  data () {
    return {
      current_step: 1,
      buttonText: '返回首页',
      swiperList: [{
        "id": "0001",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "https://imgs.qunarzz.com/p/tts6/1804/76/e21a1f848db63302.jpg_r_390x260x90_c4873f7a.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      }, {
        "id": "0002",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "https://imgs.qunarzz.com/vs_ceph_vs_tts/edfa46e6-43e8-4026-9ca9-9bf5b9edee68.jpg_r_390x260x90_dd5071be.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      },{
        "id": "0003",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "http://img1.qunarzz.com/piao/fusion/1810/29/45722c73b5b66902.jpg_750x200_231ae61f.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      }, {
        "id": "0004",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "https://imgs.qunarzz.com/vs_ceph_vs_tts/09d88886-934e-4188-a117-45e190c7b842.jpg_r_390x260x90_11da6675.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      },
      {
        "id": "0005",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "https://imgs.qunarzz.com/p/tts5/1808/81/915df9066af34302.jpg_r_390x260x90_7975908a.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      },
      {
        "id": "0006",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "https://imgs.qunarzz.com/vs_ceph_vs_tts/78774de0-ec03-4ff7-9e39-5a1267f0029c.jpg_r_390x260x90_f349ed35.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      }]
    }
  },
  methods: {
    button_left() {
      console.log('点我了,1')
    },
    button_right() {
       console.log('点我了,2')
    },
    buttonClick() {
        this.current_step = 1;
    },
    clickPreview() {
      this.current_step = 2;
      console.log('点击我了');
    },
    clickRecord() {
      this.$router.push({ path: '/record' })

      // this.current_step =
      console.log('点击右边')
    },
    getHomeInfo () {
      //  用axios请求ajax数据
      // axios.get('/api/index.json?city=' + this.city)
      axios.get('/static/mock/index.json?city=' + this.city)
        .then((result) => {
          this.getHomeInfoSucc(result)
        }).catch((err) => {
          console.log(`请求数据出错: ${err}`)
        })
      // 用fetch请求ajax数据
      // fetch('/api/index.json')
      //   .then(data => data.json())
      //   .then(res => this.getHomeInfoSucc(res))
      //   .catch(err => console.log(`请求数据出错：${err}`))
    }
  },
  watch: {
      current_step(val) {
        if(val == 2) {
          this.buttonText = '退出预览'
        }
        else {
          this.buttonText = '返回首页'
        }
      }
  },
  getList() {
    axios.get('/public/template/get')
      .then((result) => {
        console.log(result);
        // this.getHomeInfoSucc(result)
      }).catch((err) => {
        console.log(`请求数据出错: ${err}`)
      })
  },
  mounted () {
    this.getList()
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
