<template>
  <div class="g-box">
    <div class="wrap-left">
      <Category :cateData="cateData.data" :activeId="cateData.activeid" :loadingStatus="false"></Category>
      <Lists :listData="postData"></Lists>
    </div>
    <div class="warp-right">
      <Login></Login>
      <SubjectSide></SubjectSide>
    </div>
  </div>
</template>

<script>
import Category from '~/components/Category.vue'
import Lists from '~/components/List.vue'
import Login from '~/components/SideLogin.vue'
import SubjectSide from '~/components/SideSubject.vue'
export default {
  components: {
    Category, Lists, Login, SubjectSide
  },
  async asyncData ({app}) {
    let cateData = await app.$axios.$get('/api/categories')
    let postData = await app.$axios.$get('/api/categories/' + cateData.data[0].id + '/posts')
    cateData.activeid = cateData.data[0].id
    return {
      cateData: cateData,
      postData: postData.data
    }
  }
}
</script>
