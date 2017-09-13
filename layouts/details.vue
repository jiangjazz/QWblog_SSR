<template>
  <div class="m-wrap">
    <Navbar></Navbar>
    <div class="m-details">
      <div class="g-box">
        <nuxt/>
        <div class="warp-right">
          <Login></Login>
          <SubjectSide></SubjectSide>
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
  import SubjectSide from '~/components/SideSubject.vue'

  export default {
    components: {
      Navbar, Copyright, Login, SubjectSide
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
