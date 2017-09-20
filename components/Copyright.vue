<template>
  <div class="m-footer f-cb">
    <div class="g-box">
      <p>Copyright 2017 – 备案号：皖ICP备14022073号-4</p>
      <p>Created by 优雅的<a href="https://laravel.com/" target="_blank">Laravel</a> && 美妙的 <a href="https://cn.vuejs.org/v2/guide/" target="_blank">Vue.js</a> && 强悍的 <a
        href="https://zh.nuxtjs.org/" target="_blank">Nuxt.js</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Copyright',
    computed: {
      author () {
        return this.$store.state.author
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-footer{
    background-color: #eee;
    border-top: 1px solid #eee;
    color: #999999;
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
    padding:10px 0;
    clear: both;
    width: 100%;
    float: left;
    text-align: center;
    p{
      line-height: 26px;
    }
    @media (max-width: 1023px){
      padding: 10px 50px;
      height: auto;
      text-align: center;
      p{
        line-height: 1.5;
      }
    }
  }
</style>
