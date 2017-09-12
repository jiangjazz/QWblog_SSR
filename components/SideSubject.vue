<template>
  <div class="m-sidebar f-cb">
    <div class="m-sb-title">专题</div>
    <div class="m-sb-list">
      <ul>
        <li>
          <a href="#">大前端技术</a>
        </li>
        <li>
          <a href="#">单页应用集合</a>
        </li>
        <li>
          <a href="#">大前端技术</a>
        </li>
        <li>
          <a href="#">单页应用集合</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar'
  }
</script>

<style scoped lang="scss">
  .m-sidebar{
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: #fff;
    padding:10px 20px;
    border-radius: 5px;
    .m-sb-title{
      position: relative;
      font-weight: 400;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      &:before{
        content: '';
        width:58px;
        height:1px;
        background-color: #549ae2;
        position: absolute;
        bottom:-1px;
        left:0;
      }
    }
    .m-sb-list{
      li{
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
      }
    }
  }

  .m-side-userinfo{
    .iconfont{
      vertical-align: middle;
      font-size: 18px;
    }
    .m-sb-list{
      font-size: 14px;
    }
  }
</style>
