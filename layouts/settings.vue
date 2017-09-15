<template>
  <div class="m-wrap m-post">
    <Navbar></Navbar>
    <div class="m-details">
      <div class="g-box g-box-960">
        <nuxt/>
      </div>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import Login from '~/components/SideLogin.vue'
  import SideFriendlinks from '~/components/SideFriendlinks.vue'

  export default {
    components: {
      Navbar, Copyright, Login, SideFriendlinks
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
