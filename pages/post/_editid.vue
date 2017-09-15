<template>
  <div class="m-post">
    <div class="wrap-left">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="文章名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="cateid">
          <el-select v-model="ruleForm.cateid" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :selected="categories[0].id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题图片" prop="imageUrl">
          <el-input v-model="ruleForm.imageUrl" type="hidden" class="pichidden"></el-input>
          <el-upload
            name="postPic"
            class="avatar-uploader"
            action="http://jianshu.dev/api/posts/fileupload"
            :show-file-list="false"
            :headers="token"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议上传280*180尺寸图片，只能上传jpg文件，且不超过1m</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <no-ssr>
            <markdown-editor :custom-theme="true" preview-class="markdown-body" v-model="ruleForm.content"
                             ref="markdownEditor" :configs="configs"></markdown-editor>
          </no-ssr>
        </el-form-item>
        <el-form-item label="标签">
          <el-checkbox-group v-model="ruleForm.taglist">
            <el-checkbox v-for="item in tags" :label="item.id" :key="item.id" :value="item.id">{{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="validateBeforeSubmit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreatePosts',
    layout: 'details',
    async asyncData ({ isServer, params, app, store }) {
      let token = store.state.authUser
      app.$axios.setToken(token, 'Bearer')
      let data = await app.$axios.$get('/api/posts/postCreate')
      let postData = await app.$axios.$get(`/api/posts/${params.editid}`)
      let ruleForm = {
        title: postData.data.title,
        postPic: '',
        textarea: '',
        cateid: postData.data.category.id,
        content: postData.data.content,
        imageUrl: postData.data.imageUrl
      }
      let arr = []
      postData.data.tags.forEach(item => {
        arr.push(item.id)
      })
      ruleForm.taglist = arr
      return {
        tags: data.data.tags,
        categories: data.data.categories,
        ruleForm: ruleForm
      }
    },
    data () {
      return {
        labelPosition: 'right',
        ruleForm: {
          name: '',
          postPic: '',
          textarea: '',
          taglist: [],
          cateid: '',
          content: '',
          imageUrl: ''
        },
        categoires: '',
        tags: '',
        token: {'Authorization': 'Bearer ' + this.$store.state.authUser},
        imageUrl: '',
        content: '',
        configs: {
          spellChecker: false,
          status: false
        },
        rules: {
          title: [
            {type: 'string', required: true, min: 5, message: '请至少填写 5 个字符。', trigger: 'blur'}
          ],
          cateid: [
            {type: 'number', required: true, message: '请选择分类', trigger: 'blur'}
          ],
          content: [
            {type: 'string', required: true, min: 10, message: '请至少填写 10 个字符。', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传图片', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = file.response.url
        this.ruleForm.imageUrl = file.response.url
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
      },
      updateData () {
        let token = localStorage.getItem('access_token')
        let postData = {
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          imageUrl: this.ruleForm.imageUrl,
          cate_id: this.ruleForm.cateid,
          tags: this.ruleForm.taglist
        }
        this.$http({
          method: 'put',
          url: '/api/posts/' + this.$route.params.editid,
          headers: {'Authorization': 'Bearer ' + token},
          data: postData
        })
          .then(response => {
            if (response.data.status_code === '200') {
              this.$message({
                duration: 500,
                type: 'success',
                message: response.data.message
              })

              this.$nextTick(() => {
                this.$router.push({
                  path: '/user/' + this.$store.state.userInfo.id
                })
              })
            } else {
              this.$message({
                duration: 500,
                type: 'success',
                message: response.data.message
              })
            }
          })
      },
      validateBeforeSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateData()
            console.log('success submit!!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scope lang="scss">

  .m-post {

    .markdown-editor{
      width: 800px;
    }

    .wrap-left {
      width: 660px;
      float: left;
      margin-top: 60px;
    }

    .warp-right {
      width: 140px;
      float: right;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #bbb;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 280px;
      height: 180px;
      line-height: 180px;
      text-align: center;
    }

    .avatar {
      width: 280px;
      height: 180px;
      display: block;
    }

    .pichidden {
      font-size: 0;
      width: 0px;
      display: block;
    }

  }


</style>
