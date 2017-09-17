<template>
  <div class="m-wrap">
    <Navbar></Navbar>
    <div class="m-details">
      <div class="g-box">
        <nuxt/>
        <div class="warp-right">
          <SideFriendlinks></SideFriendlinks>
        </div>
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
