<template>
  <div class="m-sidelogin">
    <div class="m-sidebar m-side-userinfo" v-if="isLogin">
      <div class="m-sb-title">用户中心</div>
      <div class="m-sb-list">
        <ul>
          <li>
            <a href="#">你好，{{userinfo.name}}</a>
          </li>
          <li>
            <a href="#/User"><i class="iconfont icon-yonghu1"></i> 个人主页</a>
          </li>
          <li>
            <a href="#"><i class="iconfont icon-xiaoxitongzhi"></i> 消息通知</a>
          </li>
          <li>
            <a href="#/u/settings"><i class="iconfont icon-setting"></i> 设置</a>
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
            <a href="#/login">登录</a>
          </li>
          <li>
            <a href="#/register">注册</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sideuser',
    components: {},
    data () {
      return {
        isLogin: false,
        userinfo: null
      }
    },
    mounted () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        let token = localStorage.getItem('access_token')
        let config = {
          headers: {'Authorization': 'Bearer ' + token}
        }
        if (token && token !== '') {
          this.$http.get('/api/me', config)
            .then(response => {
              if (response.data.status_code === '200') {
                this.userinfo = response.data.user
                this.isLogin = true
              } else {
                this.isLogin = false
              }
            })
        } else {
          this.isLogin = false
        }
      },
      logout () {
        let token = localStorage.getItem('access_token')
        let config = {
          headers: {'Authorization': 'Bearer ' + token}
        }
        this.$http.post('/api/logout', {}, config)
          .then(response => {
            if (response.data.status_code === '200') {
              this.$message(response.data.message)
              localStorage.setItem('access_token', '')
              this.isLogin = false
            } else {
              this.isLogin = true
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
