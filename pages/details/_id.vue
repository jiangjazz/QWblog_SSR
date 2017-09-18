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
      /* Base16 Atelier Savanna Dark - Theme */
      /* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/savanna) */
      /* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

      /* Atelier-Savanna Comment */
      .hljs-comment,
      .hljs-quote {
        color: #78877d;
      }

      /* Atelier-Savanna Red */
      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #b16139;
      }

      /* Atelier-Savanna Orange */
      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #9f713c;
      }

      /* Atelier-Savanna Green */
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #489963;
      }

      /* Atelier-Savanna Blue */
      .hljs-title,
      .hljs-section {
        color: #478c90;
      }

      /* Atelier-Savanna Purple */
      .hljs-keyword,
      .hljs-selector-tag {
        color: #55859b;
      }

      .hljs-deletion,
      .hljs-addition {
        color: #171c19;
        display: inline-block;
        width: 100%;
      }

      .hljs-deletion {
        background-color: #b16139;
      }

      .hljs-addition {
        background-color: #489963;
      }

      .hljs {
        display: block;
        overflow-x: auto;
        background: #171c19;
        color: #87928a;
        padding: 0.5em;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: bold;
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
