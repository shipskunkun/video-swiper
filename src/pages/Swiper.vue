<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
    <!-- slides -->
    <swiper-slide v-for="item in list" :key="item.id">
      <img class="swiper-img" :src="item.thumb">
    </swiper-slide>
    <!-- <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide> -->
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div> <!--这个是拿来做按钮区的 -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>  左右箭头 这里不需要-->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> 显示滚动条的 这不需要 -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        // autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type : 'fraction'
        },
        on: {
          progress: function(progress) {
              for (i = 0; i < this.slides.length; i++) {
                  var slide = this.slides.eq(i);
                  var slideProgress = this.slides[i].progress;
                  modify = 1;
                  if (Math.abs(slideProgress) > 1) {
                      modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                  }
                  translate = slideProgress * modify * 260 + 'px';
                  scale = 1 - Math.abs(slideProgress) / 5;
                  zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
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
                  var slide = this.slides.eq(i) slide.transition(transition);
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
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background-color: #fff
  .wrapper
    margin-top 2.7rem
    width 9.22rem
    // height 5.77rem
    border 1px solid red
    .swiper-img
      width 100%
      height 5.77rem
</style>
