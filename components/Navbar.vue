<template>
  <div class="m-navbar f-cb">
    <div class="g-box">
      <div class="m-navbar-logo">
        <a href="/" title="qteam">qteam.cc</a>
      </div>
      <div class="m-navbar-nav">
        <ul>
          <li>
            <a href="/">首页</a>
          </li>
          <li>
            <nuxt-link to="/login">网址导航</nuxt-link>
          </li>
          <li>
            <a href="#">实验室</a>
          </li>
          <li>
            <a href="#">关于</a>
          </li>
          <li>
            <a href="#">
              <i class="iconfont icon-sousuo1"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="m-navbar-user">
        <a href="javascript:void(0)" class="write-btn" v-on:click="writePosts"><i class="iconfont icon-weibiaoti--"></i> 写文章</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      writePosts () {
        this.$store.dispatch('isLogin', {
          url: '/post/create'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-navbar{
    height: 68px;
    width: 100%;
    background: #fff;
    z-index: 100;
    border-bottom: 1px solid #eee;
    .m-navbar-logo{
      height: 100%;
      float: left;
      padding: 16px 0;
      a{
        display: block;
        width: 204px;
        height: 36px;
        overflow: hidden;
        text-indent: -9999px;
        background: url(~/assets/images/logo.png) no-repeat;
        //background-image: -webkit-image-set(url(http://www.aebiz.net/assets/pc/images/logo.png) 1x, url(https://aotu.io/img/o2logo@2x.png) 2x);
      }
    }

    .m-navbar-nav{
      float: left;
      li{
        display: inline-block;
        padding-right: 40px;
        margin: 0;
        &:hover{
          a{
            color:#6190e8;
          }
        }
        a{
          font-size: 14px;
          padding: 20px 0;
          background: transparent !important;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          line-height: 1.5;
        }
      }
      .icon-sousuo{
        display: inline-block;
        font-size: 14px;
      }
    }

    .m-navbar-user{
      float: right;
      .write-btn{
        background-color: #549ae2;
        color:#fff;
        padding:4px 20px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        font-weight: 400;
        margin-top: 16px;
        transition: all 0.2s ease;
        &:hover{
          background-color: darken(#549ae2,5%);
        }
        &:active{
          transform: scale(1.05);
        }
      }
    }
  }

</style>
