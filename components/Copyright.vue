<template>
  <div class="m-footer f-cb">
    <div class="g-box">
      <p>Copyright 2017 {{author}} – created by 优雅的laravel && 美妙的Vue.js    备案号：皖ICP备14022073号-4</p>
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
    height:48px;
    clear: both;
    width: 100%;
    float: left;
    p{
      line-height: 48px;
    }
  }
</style>
