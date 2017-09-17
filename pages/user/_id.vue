<template>
  <div class="user-info">
    <div class="user-hd f-cb">
      <div class="user-hd-pic">
        <img :src="userinfo.avatar" alt="">
      </div>
      <div class="user-hd-name">
        <h2>{{userinfo.name}}</h2>
        <ul>
          <li>
            <i class="iconfont icon-github"></i>: <a href="#">{{userinfo.github}}</a>
          </li>
          <li>
            <i class="iconfont icon-Qq"></i>: <a href="#">{{userinfo.qq}}</a>
          </li>
          <li>
            {{userinfo.created_at}} 加入
          </li>
        </ul>
      </div>
    </div>
    <div class="user-bd">
      <div class="user-bd-hd">
        <h3>发表的文章</h3>
      </div>
      <Lists :listData="posts" :userid="userinfo.id"></Lists>
    </div>
  </div>
</template>

<script>
  import Lists from '~/components/List.vue'

  export default {
    name: 'Settings',
    layout: 'users',
    async asyncData ({ isServer, params, app, store }) {
      let token = store.state.authUser
      app.$axios.setToken(token, 'Bearer')
      let user = await app.$axios.$get('/api/users/' + params.id)
      let post = await app.$axios.$get('/api/users/' + params.id + '/posts')
      return {
        userinfo: user.data,
        posts: post.data
      }
    },
    components: {
      Lists
    },
    data () {
      return {
        userinfo: {}
      }
    }
  }
</script>

<style scope lang="scss">
  .m-users{
    .iconfont{
      font-size: 18px;
    }
    .user-info{
      padding:40px 20px 30px 20px;
    }
    .user-hd-pic{
      float: left;
      width: 100px;
      height:100px;
      border-radius: 50%;
      border:1px solid #eee;
      margin-right: 20px;
      img{
        width:100%;
        border-radius: 50%;
      }
    }
    .user-bd{
      .user-bd-hd{
        margin-top: 20px;
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
    }
    .user-bd-list{
      margin-top: 10px;

      .user{
        font-size: 12px;
        margin-bottom: 8px;
        img{
          width: 30px;
          height:30px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
        }
      }
      .tit{
        font-weight: 400;
        color:#666;
        a{
          color:#666;
        }
      }
    }
  }
</style>
