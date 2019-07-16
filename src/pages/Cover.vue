
<template>
    <div class="container">
      <div class="background-pic"></div>
      <button @click="gotoHome">laaaa</button>
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
          this.$router.push({name: 'Home'});
        }
    }
}
</script>

<style lang="stylus" >
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    button {
      position: absolute;
    }
  }
  .background-pic{
    background: url('~@/assets/cover.jpeg') no-repeat center center;
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
    z-index:999;
  }
</style>
