<template>
  <div class="m-tag-posts">
    <Navbar></Navbar>
    <div class="g-box">
      <nuxt/>
      <div class="warp-right">
        <SideFriendlinks></SideFriendlinks>
      </div>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import SideFriendlinks from '~/components/SideSubject.vue'

  export default {
    components: {
      Navbar, Copyright, SideFriendlinks
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

