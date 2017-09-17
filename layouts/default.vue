<template>
  <div class="m-wrap">
    <Navbar></Navbar>
    <Banner></Banner>
    <div class="g-box">
      <nuxt/>
      <div class="warp-right">
        <Login></Login>
        <SideFriendlinks></SideFriendlinks>
      </div>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import Banner from '~/components/Banner.vue'
  import Login from '~/components/SideLogin.vue'
  import SideFriendlinks from '~/components/SideFriendlinks.vue'

  export default {
    components: {
      Navbar, Copyright, Banner, Login, SideFriendlinks
    }
  }
</script>
