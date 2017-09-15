<template>
  <div class="m-sidelogin">
    <div class="m-sidebar m-side-userinfo" v-if="$store.state.isLogin">
      <div class="m-sb-title">用户中心</div>
      <div class="m-sb-list">
        <ul>
          <li>
            <a href="#">你好，{{$store.state.userInfo.name}}</a>
          </li>
          <li>
            <a :href="'/user/' + $store.state.userInfo.id"><i class="iconfont icon-yonghu1"></i> 个人主页</a>
          </li>
          <li>
            <a href="#"><i class="iconfont icon-xiaoxitongzhi"></i> 消息通知</a>
          </li>
          <li>
            <a href="/user/settings"><i class="iconfont icon-setting"></i> 设置</a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="logout"><i class="iconfont icon-tuichu-copy"></i> 退出</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="m-sidebar m-side-userinfo" v-else>
      <div class="m-sb-title">用户中心</div>
      <div class="m-sb-list">
        <ul>
          <li>
            <a href="/login">登录</a>
          </li>
          <li>
            <a href="/register">注册</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sideuser',
    methods: {
      logout () {
        let token = localStorage.getItem('access_token')
        this.$http.post('/exapi/logout', {
          token: token
        })
          .then(response => {
            if (response.data.status_code === '200') {
              this.$message(response.data.message)
              localStorage.setItem('access_token', '')
              this.$store.commit('SET_USERINFO', '')
              this.$store.commit('SET_LOGIN', false)
            } else {
              this.$store.commit('SET_LOGIN', true)
            }
          })
      }
    }
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
