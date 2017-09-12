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
import Banner from '~/components/Banner.vue'
import Category from '~/components/Category.vue'
import Lists from '~/components/List.vue'
import Login from '~/components/SideLogin.vue'
import SubjectSide from '~/components/SideSubject.vue'
import axios from 'axios'
export default {
  components: {
    Banner, Category, Lists, Login, SubjectSide
  },
  async asyncData () {
    let cateData = await axios.get('http://admin.qteam.cc/api/categories')
    let postData = await axios.get('http://admin.qteam.cc/api/categories/' + cateData.data.data[0].id + '/posts')
    cateData.data.activeid = cateData.data.data[0].id
    return {
      cateData: cateData.data,
      postData: postData.data
    }
  }
}
</script>
