<template>
  <div class="wrap-left">
    <div class="content">
      <div class="post-content markdown-body" v-html="postData">
      </div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'

  export default {
    name: 'ApiDocument',
    layout: 'details',
    async asyncData ({ isServer, params, app }) {
      let postData = await app.$axios.$get('/api/users/readapi')
      postData.content = marked(postData.content, { sanitize: true })
      return {
        postData: postData.content
      }
    }
  }
</script>

<style scope lang="scss">
  .m-details{
    .wrap-left{
      width:940px;
      float: left;
    }

    .warp-right{
      width:240px;
      float: right;
    }
    .title-pic{
      margin-top: 20px;
      img{
        width:80%;
      }
    }
    .content{
      padding:20px 30px;
      background-color: #fff;
      border-radius: 5px;
      border:1px solid #f2f2f2;
      margin-top: 20px;
    }
    .post-title{
      font-size: 30px;
      color:#666
    }
    .post-author{
      font-size: 12px;
    }
    .post-content{
      margin-top: 36px;
    }
    .post-tags{
      margin-top: 20px;
      font-size: 14px;
      li{
        display: inline-block;
      }
    }
    .post-comment{
      margin-top: 20px;
    }
  }
</style>
