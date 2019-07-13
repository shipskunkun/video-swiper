<template>
    <div class="bg">
      <home-swiper :list="swiperList"></home-swiper>
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
      swiperList: [{
        "id": "0001",
        "file": "/xxx/xxx/xxx.mp4", // 模板视频文件
        "duration": 30170, // 时长，单位毫秒
        "title": "标题",
        "thumb": "http://img1.qunarzz.com/piao/fusion/1810/5d/b63d846958a4702.jpg_750x200_8129cfc3.jpg", // 展示缩略图
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
  mounted () {
    // this.getHomeInfo()
  }
}
</script>

<style lang="stylus" >
  body {
    width: 19.2rpx;
    height: 100%;
    display: flex;
    border: 1px solid black
    justify-content: center;
    // background: url("~@/assets/bg.png") no-repeat center center;
  }

</style>
