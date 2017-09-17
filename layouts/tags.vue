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
  import SideFriendlinks from '~/components/SideFriendlinks.vue'

  export default {
    components: {
      Navbar, Copyright, SideFriendlinks
    }
  }
</script>

