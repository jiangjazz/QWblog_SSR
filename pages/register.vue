<template>
  <div>
    <div class="login-modal" v-show="!registerSuccess">
      <div class="login-hd">
        <div class="login-logo">
          <img src="../assets/images/logo.png" alt="">
        </div>
      </div>
      <div class="login-bd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @keyup.enter.native="validateBeforeSubmit('ruleForm')">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password_confirmation">
            <el-input v-model="ruleForm.password_confirmation" placeholder="请确认密码" type="password"></el-input>
          </el-form-item>

          <div class="form-group">
            <a class="login-btn" href="javascript:void(0)" @click="validateBeforeSubmit('ruleForm')">{{btnTxt}}</a>
          </div>
        </el-form>
        <div class="form-info">
          <p>已有账号？<nuxt-link to="/login">去登录</nuxt-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    layout: 'login',
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.password_confirmation !== '') {
            this.$refs.ruleForm.validateField('password_confirmation')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        email: '',
        password: '',
        formSubmitted: false,
        labelPosition: 'right',
        ruleForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, message: '长度至少6个字符', trigger: 'blur'}
          ],
          password_confirmation: [
            {validator: validatePassCheck, trigger: 'blur'},
            {min: 6, message: '长度至少6个字符', trigger: 'blur'}
          ]
        },
        registerSuccess: '',
        axoisMessage: '',
        btnTxt: '注册'
      }
    },
    methods: {
      validateBeforeSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              name: this.ruleForm.name,
              email: this.ruleForm.email,
              password: this.ruleForm.password,
              password_confirmation: this.ruleForm.password_confirmation
            }
            this.registerAc(data)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      registerAc (data) {
        this.btnTxt = '注册中'
        this.$http.post('/api/register', data)
          .then(response => {
            if (response.data.status_code === '200') {
              this.btnTxt = '注册中'
              this.registerSuccess = true
              this.$message({
                message: response.data.message,
                type: 'success',
                duration: '1000'
              })
              setTimeout(() => {
                this.$router.push({ path: '/login' })
              }, 1000)
            } else {
              this.btnTxt = '注册'
              this.registerSuccess = false
              this.$message({
                message: response.data.message,
                type: 'error',
                duration: '1000'
              })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-loginForm{
    .login-modal{
      position: fixed;
      z-index: 19930918;
      width:318px;
      padding:24px;
      background-color: #fff;
      top:50%;
      left:50%;
      margin:0 auto;
      transform:translate(-50%,-50%);
      transform-origin:50% 50%;
      border-radius: 4px;
      box-shadow: 1px 1px 10px #f5f5f5;
    }
    .login-hd{
      .login-logo{
        margin:0 auto;
        text-align: center;
        vertical-align: middle;
      }
    }
    .icon-cha{
      font-weight: 300;
      font-size: 12px;
      float: right;
      margin-top: 3px;
      color: #000;
      opacity: .4;
      cursor: pointer;
      &:hover{
        opacity: 1;
      }
    }
    .login-bd{
      margin-top: 14px;
      .text-style{
        font-size: 12px;
        color:#f00;
      }
      input{
        width: 100%;
        border:1px solid #ddd;
        border-radius: 4px;
        padding:8px 12px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #333333;
        &::placeholder{
          color:#666
        }
        &.is-danger{
          border:1px solid #f00;
          &::placeholder{
            color:#f00
          }
        }
      }
      .login-btn{
        width:100%;
        background-color: #549ae2;
        color:#fff;
        padding:8px 20px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        font-weight: 400;
        margin-top: 6px;
        transition: all 0.2s ease;
        box-shadow: none;
        border:1px solid #549ae2;
        &:hover{
          background-color: darken(#549ae2,5%);
        }
        &:active{
          transform: scale(1.05);
        }
        &.disabled{
          background-color: #f5f5f5;
          border:#f5f5f5;
          color:#bbb;
          cursor: not-allowed;
        }
      }

      .form-info{
        font-size: 13px;
        margin-top: 6px;
        a{
          color:#06c;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .m-loginForm{
    /deep/ .el-form-item {
      margin-bottom: 14px;
      /deep/ .el-form-item__error {
        position: relative;
        top: 0;
      }
    }
  }
</style>

