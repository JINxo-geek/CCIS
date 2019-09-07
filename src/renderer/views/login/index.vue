<template>
  <div class="login-container" >

  <div class="login-under" :style="{backgroundImage: 'url(' + login + ')' } " style="height:50%">
     <el-button type="text" style="opacity: 0;display:absolute" @click="outerVisible = true">修改服务器ip</el-button>
    <el-form class="login-form" autoComplete="on" :model="loginForm"  ref="loginForm" label-position="left">

       <img class="pic-loginlogo" style=" margin: -109px;height: 126px;" :src="loginlogo" alt="loginlogo">
      <h3 class="title" style="    font-size: 59px;">化学品管理系统测试版</h3>


   <el-dialog title="修改服务器ip" :modal="false" :visible.sync="outerVisible">
<el-input v-model="ipvalue" placeholder="请输入服务器ip"></el-input>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeip()">确定修改</el-button>
    </div>
  </el-dialog>
      <el-form-item style="    margin-top:200px;" prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;    font-size: 22px;color: #FFFFFF;" :loading="loading" @click.native.prevent="handleLogin">
       登入
        </el-button>
        
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>
        </el-form>
     <!--  <el-button @click="root()">root登录</el-button> -->
    </div>
    
    
  </div>
 
</template>

<script>
/* 先屏蔽过滤 import { isvalidUsername } from '@/utils/validate' */
import login from '@/assets/login.jpg'
import loginlogo from '@/assets/loginlogo.png'
export default {
  mounted() {
    if (localStorage.getItem('ip') != null) {
	  console.log('ip已存在')
    } else {
      this.outerVisible = true
    }
  },
  name: 'login',
  data() {
    /*    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    } */
    return {
      outerVisible: false,
      ipvalue: '',
      login,
      loginlogo,
      loginForm: {
        username: '',
        password: ''
      },
      /*       loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: valgvyidatePass }]
      }, */
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    changeip() {
      console.log('改变服务ip', this.ipvalue)
      localStorage.ip = 'http://' + this.ipvalue
      this.outerVisible = false
      this.$message({
        type: 'success',
        message: '服务器ip修改成功，重启客户端生效'
		  })
    },
    root() { this.$router.push({ path: '/' }) },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      console.log(process.env.BASE_API)
      /*     this.$refs.loginForm.validate(valid => { */
      if (this.loginForm.username) {
        this.loading = true
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.loading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
      } else {
        console.log('账号为空!!')
        return false
      }
      /*       }) */
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(102, 204, 255, 0.0392156862745098);
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 54px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
        margin-left: 37px;
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
