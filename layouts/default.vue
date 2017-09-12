<template>
  <div class="m-wrap">
    <Navbar></Navbar>
    <Banner></Banner>
    <nuxt/>
    <Copyright></Copyright>
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import Banner from '~/components/Banner.vue'

  export default {
    components: {
      Navbar, Copyright, Banner
    }
  }
</script>

<style lang="scss">
  .wrap-left{
    width:960px;
    float: left;
  }

  .warp-right{
    width:240px;
    float: right;
  }
</style>
