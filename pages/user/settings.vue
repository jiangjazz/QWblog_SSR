<template>
  <div class="wrap-left">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="ruleForm.avatar" type="hidden" class="pichidden"></el-input>
        <el-upload
          name="avatar"
          class="avatar-uploader"
          action="/api/users/fileupload"
          :show-file-list="false"
          :headers="token"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatar" :src="avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1m</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="github" prop="github">
        <el-input v-model="ruleForm.github"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="ruleForm.qq"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="validateBeforeSubmit('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios'

  export default {
    name: 'Settings',
    layout: 'user',
    async asyncData ({ isServer, params, app, store }) {
      let token = store.state.authUser
      app.$axios.setToken(token, 'Bearer')
      let {user} = await app.$axios.$get('/me')
      return {
        ruleForm: user
      }
    },
    data () {
      return {
        labelPosition: 'right',
        ruleForm: {
          name: '',
          avatar: '',
          github: '',
          qq: ''
        },
        token: {'Authorization': 'Bearer ' + this.$store.state.authUser},
        users: {},
        avatar: '',
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          avatar: [
            {required: true, message: '请上传图片', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.avatar = file.response.url
        this.ruleForm.avatar = file.response.url
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      storeData () {
        let postData = {
          name: this.ruleForm.name,
          avatar: this.ruleForm.avatar,
          github: this.ruleForm.github,
          qq: this.ruleForm.qq
        }
        this.$http({
          method: 'post',
          url: '/api/users/' + this.ruleForm.id + '/settingStores',
          data: postData
        })
          .then(response => {
            if (response.data.status_code === '200') {
              this.$message({
                duration: 500,
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message(response.data.message)
            }
          })
      },
      validateBeforeSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.storeData()
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
      border: 1px dashed #d9d9d9;
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
      width: 128px;
      height: 128px;
      line-height: 128px;
      text-align: center;
    }

    .avatar {
      width: 128px;
      height: 128px;
      display: block;
    }

    .pichidden {
      font-size: 0;
      width: 0px;
      display: block;
    }

  }


</style>
