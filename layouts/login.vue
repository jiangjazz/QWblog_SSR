<template>
  <transition name="fade" mode="out-in">
    <div class="m-loginForm f-cb">
      <div class="m-user-mask" id='particles'>
      </div>
      <nuxt/>
    </div>
  </transition>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import Banner from '~/components/Banner.vue'

  export default {
    components: {
      Navbar, Copyright, Banner
    },
    mounted () {
      particlesJS.load('particles', 'particles.json')
    }
  }
</script>

<style lang="scss" scoped>
  .m-user-mask{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: hidden;
    z-index: 99;
    background-color: #549ae2;
  }

</style>
