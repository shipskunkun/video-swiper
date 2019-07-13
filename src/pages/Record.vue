<template>
    <div class="container">
        <div class="background-pic"></div>
    </div>
</template>

<script>
import HomeSwiper from './Swiper'
import axios from 'axios'

export default {
  name: 'Record',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    // this.getHomeInfo()
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



</style>
