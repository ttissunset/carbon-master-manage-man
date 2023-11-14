<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-form :model="form" ref="form" :rules="rules" class="login_container" :inline="true" label-width="70px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名:" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop='password'>
      <el-input v-model='form.password' type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { loginAdmin } from '../api'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      username: '',
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    submit() {
      var user = {
        "password": this.form.password,
        "username": this.form.username
      }
      loginAdmin(user).then(res => {
        if (res.code === "00000") {
          //  存储 token
          localStorage.setItem('token', 'Bearer xxxx')
          localStorage.setItem('username', this.form.username)
          this.$router.push('/home')
        } else {
          localStorage.removeItem('token')
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .el-input {
    width: 198px;
  }

  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el-button {
    margin-left: 105px;
    margin-top: 10px;
  }

}
</style>