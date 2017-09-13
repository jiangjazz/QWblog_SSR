<template>
  <div class="wrap-left">
    <div v-if="postData" class="content">
      <div class="post-title">
        <p>{{ postData.title }}</p>
      </div>
      <div class="post-author">
        by:{{postData.user.name}} on {{postData.created_at}} {{postData.category.name}}
      </div>
      <div class="post-content markdown-body" v-html="postData.content">
      </div>
      <div class="post-tags">
        <ul>
          <li>标签:</li>
          <li v-for="item in postData.tags">#{{item.name}}</li>
        </ul>
      </div>
    </div>

    <!--<div class="post-comment" v-if="post">-->
    <!--<div id="disqus_thread" :disqus_identifier="post.id" :disqus_title="post.title" :disqus_url="'details/'+post.id"></div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios'

  export default {
    name: 'Details',
    layout: 'details',
    async asyncData ({ isServer, params }) {
      if (isServer) {
        axios.defaults.baseURL = 'http://admin.qteam.cc'
      }
      let postData = await axios.get('/api/posts/' + params.id)
      postData.data.data.content = marked(postData.data.data.content, { sanitize: true })
      return {
        postData: postData.data.data
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
