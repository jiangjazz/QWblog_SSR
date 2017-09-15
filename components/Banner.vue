<template>
  <div class='m-banner f-cb'>
    <div class='m-banner-bg' id='particles'>
      <a href='/apidoc' class='banner-btn'>
        与世界分享你的知识，经验与见解
      </a>
    </div>
  </div>
</template>

<script>
  if (process.BROWSER_BUILD) {
    require('particles.js')
  }

  export default {
    name: 'Banner',
    mounted () {
      particlesJS.load('particles', 'particles.json')
    }
  }
</script>

<style scoped lang='scss'>
  .m-banner{
    width:100%;
    height:230px;
    position: relative;
    overflow: hidden;
    background-color: #549ae2;
    .banner-btn{
      background-color: transparent;
      border:1px solid #d2d2d2;
      color:#fff;
      padding:6px 20px;
      font-size: 14px;
      text-align: center;
      position:absolute;
      top:50%;
      left:50%;
      margin:0 auto;
      transform:translate(-50%,-50%);
      transform-origin:50% 50%;
      border-radius: 4px;
      font-weight: 400;
      &:hover{
        background-color: #eee;
        color:#999;
      }
    }
  }
</style>
