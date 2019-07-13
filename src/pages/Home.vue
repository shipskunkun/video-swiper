<template>
    <div class="container">
        <div class="background-pic"></div>
        <div v-if="current_step == 1">
            <home-swiper :list="swiperList" @click_preview="clickPreview" @click_record="clickRecord"></home-swiper>
            <div class="out_time">04:58</div>
        </div>
        <div class="step_upload" v-if="current_step == 4">
            <div class="progress">
                <img src="../assets/progress.png"></img>
            </div>
            <div>Loding 50% completed</div>
        </div>
        <div class="step_code" v-if="current_step == 5">
            <div class="code_image">
            </div>
            <div>
                <p>扫描上方二维码可直接下载合成的视频</p>
                <p>还请尽快下载，视频只能保存7日下载源</p>
            </div>
        </div>
        <div class="button" @click="buttonClick">{{ buttonText }}</div>
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
        "thumb": "http://img1.qunarzz.com/piao/fusion/1809/c6/2467595fffc3b302.jpg_750x200_cca13d51.jpg", // 展示缩略图
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
        "thumb": "https://imgs.qunarzz.com/p/tts6/1804/76/e21a1f848db63302.jpg_r_390x260x90_c4873f7a.jpg", // 展示缩略图
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
        "thumb": "http://img1.qunarzz.com/piao/fusion/1809/c6/2467595fffc3b302.jpg_750x200_cca13d51.jpg", // 展示缩略图
        "description": "描述",
        "url": "http://xxx/xxx/xxx/xxx.mp4" // 模板预览地址
      }]
    }
  },
  methods: {
    buttonClick() {
      //退出预览
      if(this.current_step == 2) {
        this.current_step = 1;
      }
    },
    clickPreview() {
      this.current_step = 2;
      console.log('点击我了');
    },
    clickRecord() {
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
  mounted () {
    // this.getHomeInfo()
  }
}
</script>

<style lang="stylus" >
  .container {
    position: relative;
    display: flex;
    justify-content: center;
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
}



</style>
