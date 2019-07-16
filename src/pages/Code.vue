<template>
   <div class="container">
        <div class="background-pic"></div>
        <div class="step_code">
            <div class="code_image" id="qrcode"></div>
            <div>
                <p>扫描上方二维码可直接下载合成的视频</p>
                <p>还请尽快下载，视频只能保存7日下载源</p>
            </div>
        </div>
        <div class="back_bottom">
          <img src="../assets/back_home.png"  @click="buttonClick">
        </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  name : 'Code',
  mounted () {
    this.qrcode();
  },
  computed: {
      code_url() {
        return this.$store.state.link
      }
  },
  data() {
    return {
        rate: 0
    }
  },
  methods: {
    buttonClick() {
      this.$router.push({name: 'Cover'});
    },
    qrcode() {
        var that = this;
        var docEl = document.getElementsByTagName("html")[0];
        var maxWidth = 1920;
        var clientWidth = docEl.clientWidth > maxWidth ? maxWidth : docEl.clientWidth;
        var rate = clientWidth / maxWidth;

        let qrcode = new QRCode('qrcode', {
            width: 518 * rate,
            height: 518 * rate,
            text: this.code_url, // 二维码地址
            colorDark: "#000",
            colorLight: "#fff",
        })
    }
  }
}
</script>


<style lang="stylus">

.container {
    position: relative;
    display: flex;
    justify-content: center;
    .step_code {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .code_image {
          margin-top: 2.87rem;
          width: 5.18rem;
          height: 5.18rem;
          padding: 0.36rem;
          background-color: #fff;
          z-index: 88;
        }
        div:nth-child(2){
          margin-top: 0.3rem;
          color: rgba(0,42,38,1);
          font-size: 0.24rem;
        }
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







