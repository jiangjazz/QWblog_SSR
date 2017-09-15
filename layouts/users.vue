<template>
  <div class="m-users">
    <Navbar></Navbar>
    <div class="g-box">
      <nuxt/>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Copyright from '~/components/Copyright.vue'
  import Login from '~/components/SideLogin.vue'
  import SubjectSide from '~/components/SideSubject.vue'

  export default {
    components: {
      Navbar, Copyright, Login, SubjectSide
    }
  }
</script>

<style lang="scss">

</style>
