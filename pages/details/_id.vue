<template>
  <div class="wrap-left">
    <div v-if="postData" class="content">
      <div class="post-title">
        <p>{{ postData.title }}</p>
      </div>
      <div class="post-author">
        by:{{postData.user.name}} on {{postData.created_at}} {{postData.category.name}}
      </div>
      <div class="post-content markdown-body" v-html="postData.content" v-highlight>
      </div>
      <div class="post-tags">
        <img src="~/assets/images/tags.png" alt="" class="post-tags-img">
        <span class="post-tags-link">
          <a :href="`/tags/${item.id}`" v-for="item in postData.tags">{{item.name}}</a>
        </span>
      </div>
    </div>

    <div id="gitalk-container">

    </div>
  </div>
</template>

<script>
  import marked from 'marked'

  export default {
    name: 'Details',
    layout: 'details',
    async asyncData ({isServer, params, app}) {
      let postData = await app.$axios.$get('/api/posts/' + params.id)
      postData.data.content = marked(postData.data.content, {sanitize: true})
      return {
        postData: postData.data
      }
    },
    mounted () {
      let Gitalk = require('gitalk')
      let gitalk = new Gitalk({
        clientID: '3d648c443ab95b7f38c1',
        clientSecret: '592399a6326f84973e20c67904c2ca9f2d0499ab',
        repo: 'QWblog_SSR',
        owner: 'wenyuking',
        admin: ['wenyuking']
      })

      gitalk.render('gitalk-container')
    }
  }
</script>

<style scope lang="scss">
  .m-details {
    .wrap-left {
      width: 940px;
      float: left;
    }

    .warp-right {
      width: 240px;
      float: right;
    }
    .title-pic {
      margin-top: 20px;
      img {
        width: 80%;
      }
    }
    .content {
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      margin-top: 20px;
    }
    .post-title {
      font-size: 30px;
      color: #666
    }
    .post-author {
      font-size: 12px;
    }
    .post-content {
      margin-top: 36px;
      word-break: break-all;
      h1,h2,h3{
        font-weight: 400;
        color:#666;
      }

      pre{
        padding:0;
      }


      .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #2b2b2b;
      }

      .hljs {
        color: #bababa;
      }

      .hljs-strong,
      .hljs-emphasis {
        color: #a8a8a2;
      }

      .hljs-bullet,
      .hljs-quote,
      .hljs-link,
      .hljs-number,
      .hljs-regexp,
      .hljs-literal {
        color: #6896ba;
      }

      .hljs-code,
      .hljs-selector-class {
        color: #a6e22e;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-section,
      .hljs-attribute,
      .hljs-name,
      .hljs-variable {
        color: #cb7832;
      }

      .hljs-params {
        color: #b9b9b9;
      }

      .hljs-string {
        color: #6a8759;
      }

      .hljs-subst,
      .hljs-type,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-symbol,
      .hljs-selector-id,
      .hljs-selector-attr,
      .hljs-selector-pseudo,
      .hljs-template-tag,
      .hljs-template-variable,
      .hljs-addition {
        color: #e0c46c;
      }

      .hljs-comment,
      .hljs-deletion,
      .hljs-meta {
        color: #7f7f7f;
      }

    }
    .post-tags {
      margin-top: 20px;
      font-size: 14px;
      li {
        display: inline-block;
      }
    }
    .post-comment {
      margin-top: 20px;
    }
    .post-tags-img {
      width: 43px;
      height: 19px;
    }
    .post-tags-link {
      display: inline-block;
      vertical-align: 4px;
      margin-left: 5px;
      a {
        color: #3993bf;
        display: inline-block;
        height: 19px;
        line-height: 19px;
        font-size: 14px;
        margin-right: 10px;
      }
    }
    @media (max-width: 1023px) {
      .wrap-left, .warp-right {
        width: 100%;
      }
      .content {
        padding: 10px 16px;
      }
    }
  }
</style>
