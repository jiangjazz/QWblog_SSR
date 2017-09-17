<template>
  <div class="m-postlist f-cb">
    <ul class="m-pllist" v-if="!loading">
      <li v-if="posts.length <= 0">暂无数据</li>
      <li class="item" v-for="(item, index) in posts" v-bind:key="item.id" v-else>
        <div class="post-item">
          <div class="pi-thumbils">
            <a :href="'/details/'+item.id" target="_blank"><img :src="item.imageUrl" :alt="item.title"></a>
          </div>
          <div class="pi-title">
            {{item.title}}
          </div>
          <div class="pi-info">
            <div class="pi-info-user">
              <div class="avatar-img ">
                <a href="#" target="_blank"><img width="20" height="20" :src="item.user.avatar"></a>
              </div>
              <div class="description">
                <h4 class="author-title">
                  <a :href="'/user/' + item.user.id">{{item.user.name}}</a>
                </h4>
              </div>
            </div>
          </div>
          <div class="pi-op" v-if="users && users === $store.state.userInfo.id">
            <a :href="'/post/'+item.id">
              <el-button type="info" size="small">编辑</el-button>
            </a>
            <a href="javascript:void(0)" @click="delPost(item.id)">
              <el-button type="danger" size="small">删除</el-button>
            </a>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li>loading</li>
    </ul>
  </div>
</template>

<script>
  import bus from '~/store/bus'
  export default {
    name: 'List',
    props: ['listData', 'loadingStatus', 'userid'],
    data () {
      return {
        posts: this.listData,
        loading: this.loadingStatus,
        users: this.userid
      }
    },
    created () {
      bus.$on('cate-selected', id => {
        this.getPostData(id)
      })
    },
    methods: {
      getPostData (id) {
        this.loading = true
        this.$http.get('/api/categories/' + id + '/posts')
          .then(response => {
            this.posts = response.data.data
            setTimeout(() => {
              this.loading = false
            }, 500)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      delPost (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelPost(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      doDelPost (id) {
        let token = this.$store.state.authUser
        this.$http({
          method: 'delete',
          url: '/api/posts/' + id,
          headers: {'Authorization': 'Bearer ' + token}
        })
          .then(response => {
            if (response.data.status_code === '200') {
              this.$message({
                type: 'success',
                message: response.data.message,
                duration: 500
              })
              this.$nextTick(() => {
                this.$router.go(0)
              })
            } else {
              this.$message({
                type: 'info',
                message: response.data.message,
                duration: 500
              })
            }
          })
      }
    }
  }
</script>
