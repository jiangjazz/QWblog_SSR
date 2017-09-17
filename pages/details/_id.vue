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
        <img src="~/assets/images/tags.png" alt="" class="post-tags-img">
        <span class="post-tags-link">
          <a :href="`/tags/${item.id}`" v-for="item in postData.tags">{{item.name}}</a>
        </span>
      </div>
    </div>

    <div class="post-comment">
      <!--PC和WAP自适应版-->
      <no-ssr>
        <div id="SOHUCS" :sid="postData.id"></div>
      </no-ssr>
      <no-ssr>
        <script type="text/javascript">
          (function () {
            var appid = 'cytdFHCGc'
            var conf = 'prod_c65cae4b3df96cca4f92a17032ae9fa9'
            var width = window.innerWidth || document.documentElement.clientWidth
            if (width < 960) {
              window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>')
            } else {
              var loadJs = function (d, a) {
                var c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
                var b = document.createElement('script')
                b.setAttribute('type', 'text/javascript')
                b.setAttribute('charset', 'UTF-8')
                b.setAttribute('src', d)
                if (typeof a === 'function') {
                  if (window.attachEvent) {
                    b.onreadystatechange = function () {
                      var e = b.readyState
                      if (e === 'loaded' || e === 'complete') {
                        b.onreadystatechange = null
                        a()
                      }
                    }
                  } else {b.onload = a}
                }
                c.appendChild(b)
              }
              loadJs('http://changyan.sohu.com/upload/changyan.js', function () {
                window.changyan.api.config({
                  appid: appid,
                  conf: conf
                })
              })
            }
          })() </script>
      </no-ssr>
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
