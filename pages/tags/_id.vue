<template>
  <div class="wrap-left">
    <div class="tags-hd">
      <p class="tit">Javascript</p>
    </div>
    <div class="tags-bd">
      <Lists :listData="posts" :userid="userinfo.id"></Lists>
    </div>
  </div>
</template>

<script>
  import Lists from '~/components/List.vue'

  export default {
    name: 'TagPosts',
    layout: 'tags',
    async asyncData ({ isServer, params, app, store }) {
      let post = await app.$axios.$get('/api/tags/' + params.id + '/posts')
      return {
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

<style lang="scss" scoped>
  .tags-hd{
    .tit{
      font-size: 18px;
      color: #666666;
      display: inline-block;
      vertical-align: 10px;
      margin-top: 30px;
    }
  }
  .tags-bd{
    margin-top: 10px;
  }
</style>
