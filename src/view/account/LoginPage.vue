<template>
  <div class="login-page">
    <div class="login-from">
      <div class="login-from-top">
        <span :class="loginType==='account'?'account-type-bt-active':'account-type-bt-unActive'"
              @click="changeLoginType('account')">账号登陆</span>
        <el-divider direction="vertical"/>
        <span :class="loginType==='phone'?'account-type-bt-active':'account-type-bt-unActive'"
              @click="changeLoginType('phone')">手机短信登陆</span>
      </div>
      <div class="login-from-text">
        <el-form v-if="loginType === 'account'" :model="loginForm" ref="loginFrom" label-position="right"
                 :rules="loginRules">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account"
                      placeholder="邮箱/账号/手机号"
                      @keyup.enter.native="login"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password"
                      placeholder="密码"
                      @keyup.enter.native="login"/>
          </el-form-item>
        </el-form>
        <el-form v-if="loginType === 'phone'" :model="loginForm" ref="loginFrom" label-position="right"
                 :rules="loginRules">
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone"
                      placeholder="手机号"
                      @keyup.enter.native="login"/>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input v-model="loginForm.verificationCode"
                      placeholder="验证码"
                      @keyup.enter.native="login">
              <el-button slot="append">获取验证码</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button @click="login" class="login-btn" type="primary">登陆</el-button>
      </div>
      <div class="login-from-bottom">
        <span>还没有账号？</span>
        <router-link class="link-text" tag="span" :to="{name: 'register'}">去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {AccountServer} from '@/view/account/AccountServer'
  import crypto from 'crypto'

  export default {
    data: function () {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        loginType: `account`,
        loginForm: {},
        loginRules: {
          account: [
            {required: true, message: '请输入邮箱/账号/手机号', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度在4个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeLoginType: function (type) {
        this.loginType = type
      },
      login() {
        this.$refs['loginFrom'].validate((valid) => {
          if (valid) {
            let password = this.loginForm.password
            const md5 = crypto.createHash('md5')
            md5.update(password)
            let parameter = {
              msg: {
                account: this.loginForm.account,
                password: md5.digest('hex')
              }
            }
            AccountServer.login(parameter).then(res => {
              let token = res.data.msg
              if (token.isLogin) {
                window.sessionStorage.setItem('token', JSON.stringify(token))
                this.$store.commit('token/setToken', token)
                if (token.user.type === 'employee') {
                  this.$router.push({name: 'management'})
                } else if ((token.user.type === 'teacher')) {
                  this.$router.push({name: 'teacher_class'})
                } else if ((token.user.type === 'student')) {
                  this.$router.push({name: 'student_homepage'})
                } else {
                  this.$router.push({name: 'homepage'})
                }
              } else {
                this.$message({
                  message: token.error,
                  type: 'warning'
                })
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '网络繁忙！',
                type: 'warning'
              })
            })
          } else {
            setTimeout(() => {
              let isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 100)
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

  .login-page {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login/login-bkgd.jpg");
    background-size: cover;
    position: relative;
  }

  .login-from {
    width: 27%;
    min-height: 300px;
    border-radius: 4px;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login-from-top {
    width: 80%;
    margin: 15px 0 50px 0;
  }

  .login-type-bt-active {
    cursor: pointer;
    font-size: 1.8em;
    font-weight: 500;
  }

  .login-type-bt-unActive {
    cursor: pointer;
    color: #8c939d;
  }

  .login-from-text {
    width: 80%;
    height: 50%;
  }

  .login-from-bottom {
    width: 80%;
    margin: 15px 0;
    color: #8c939d;
    font-size: 0.8em;
    display: flex;
    justify-content: flex-end;
  }

  .login-btn {
    width: 100%;
    padding: 15px 0;
    margin: 5px;
    background-color: #32BAF0;
    color: white;
    font-size: 1.2em;
  }

  .link-text {
    color: #409EFF;
    cursor: pointer;
  }
</style>
