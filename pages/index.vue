<template>
  <div class="g-box">
    <div class="wrap-left">
      <Category :cateData="cateData" :activeId="cateData.activeid" :loadingStatus="false"></Category>
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
import axios from 'axios'
export default {
  components: {
    Category, Lists, Login, SubjectSide
  },
  async asyncData (content) {
    if (content.isServer) {
      axios.defaults.baseURL = 'http://admin.qteam.cc'
    }
    let cateData = await axios.get('/api/categories')
    let postData = await axios.get('/api/categories/' + cateData.data.data[0].id + '/posts')
    cateData.data.activeid = cateData.data.data[0].id
    return {
      cateData: cateData.data,
      postData: postData.data
    }
  }
}
</script>
