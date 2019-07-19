
<template>
    <div class="container">
      <div class="cover-pic"></div>
      <img src="../assets/click.png"  @click="gotoHome" class="click_btn">
    </div>
</template>

<script>

export default {
    name: 'Cover',
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        gotoHome(){
          this.$store.commit('set_step', 1);
          this.$router.push({path: '/home'});
        }
    }
}
</script>

<style lang="stylus" >
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    .click_btn {
      position: fixed;;
      bottom: 0.67rem;
    }
  }
  .cover-pic{
    background: url('~@/assets/cover.jpg') no-repeat center center;
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
