<template>
  <div id="certify">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.thumb">
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>

      <!-- todo
        <div class="time">0.48</div> -->
    </swiper>
    <!-- <div class="time">0.48</div> -->
    <div class="operation">
      <img class="left" @click="click_preview" src="../assets/left_btn_2.png"><img class="right" @click="click_record" src="../assets/right_btn_2.png">
      <!-- <img class="left" @click="click_preview">
      <button class="left" @click="click_preview">预览</button><button class="right" @click="click_record">录制</button> -->
    </div>
  </div>
</template>

<script>
var  realIndex = 0;
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  filters: {
    filter_time(result) {
      var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
      var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
      var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
      return result = h + ":" + m + ":" + s;
    }
  },
  data () {
    return {
      realIndex: 0,
      swiperOption: {
        // slidesPerView: 3,
        // spaceBetween: 30,
        // slidesPerGroup: 3,
        // loop: true,
        // loopFillGroupWithBlank: true,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        // autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: function(){
            realIndex = this.realIndex;
          },
          progress: function(progress) {
            for (let i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              var slideProgress = this.slides[i].progress;
              var modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              var translate = slideProgress * modify * 2.60 + 'rem';
              var scale = 1 - Math.abs(slideProgress) / 5;
              var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform('translateX(' + translate + ') scale(' + scale + ')');
              slide.css('zIndex', zIndex);
              slide.css('opacity', 1);
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0);
              }
            }
          },
          setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              slide.transition(transition);
            }
          }
        }
      }
    }
  },
  mounted () {
    console.log(this.list)
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  },
  methods: {
    click_preview() {
      this.$emit('click_preview', realIndex)
    },
    click_record() {
      this.$emit('click_record')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background-color: red
  #certify {
    position: fixed;
    top: 3.15rem;
    width: 16.37rem;
    display: flex;
    justify-content: center;
    position: relative;
    .time {
      display: block;
      position: absolute;
      margin-top: 1.9rem;
      width: 1.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      z-index: 999;
      opacity: 0.8;
      border-radius: 1.3rem;
      background-color: #fff;
      color: #17D7C5;
      font-size: 0.3rem;
    }
    .operation {
      width: 4.8rem;
      position: absolute;
      bottom: 0.6rem;
      height: 0.7rem;
      z-index: 999;
      img {
        display: inline-block;
        width: 2.4rem;
        height: 0.7rem;
      }
    }
  }

  #certify .swiper-container {
    padding-bottom: 0.6rem;

  }
  #certify  .swiper-slide {
    width: 9.25rem;
    height: 5.2rem;
    background: #fff;
    box-shadow: 0 8px 30px #ddd;
  }

  #certify  .swiper-slide img{
    display:block;
    width: 100%;
    height: 100%;
  }
  #certify  .swiper-slide p {
    line-height: 98px;
    padding-top: 0;
    text-align: center;
    color: #636363;
    font-size: 1.1em;
    margin: 0;
  }

  #certify .swiper-pagination {
    width: 100%;
    bottom: 0.1rem;
  }

  #certify .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
    border: 3px solid #fff;
    background-color: #d5d5d5;
    width: 10px;
    height: 10px;
    opacity: 1;
  }

  #certify .swiper-pagination-bullets .swiper-pagination-bullet-active {
    border: 3px solid #00aadc;
    background-color: #fff;
  }

  #certify .swiper-button-prev {
    left: -30px;
    width: 45px;
    height: 45px;
    background: url('../assets/wm_button_icon.png') no-repeat;
    background-position: 0 0;
    background-size: 100%;
  }

  #certify .swiper-button-prev:hover {
    background-position: 0 -46px;
    background-size: 100%
  }

  #certify .swiper-button-next {
    right: -30px;
    width: 45px;
    height: 45px;
    background: url('../assets/wm_button_icon.png') no-repeat;
    background-position: 0 -93px;
    background-size: 100%;
  }

  #certify .swiper-button-next:hover {
    background-position: 0 -139px;
    background-size: 100%
  }
</style>
