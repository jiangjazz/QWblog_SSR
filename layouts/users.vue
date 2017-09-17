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

  export default {
    components: {
      Navbar, Copyright
    }
  }
</script>
