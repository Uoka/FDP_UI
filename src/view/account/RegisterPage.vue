<template>
  <div class="register-page">
    <div class="register-plan">

      <div v-if="!registerType" class="select-from">
        <div class="select-from-top">
          <div style="font-size: 2em">注册账号</div>
          <div style="font-size: 0.8em;color: #8c939d">请选择您在日常教学中的实际身份</div>
        </div>
        <div class="select-btn-plan">
          <p>
            <el-button class="register-btn" @click="changeRegisterType('老师/助教')">我是老师/助教</el-button>
          </p>
          <p>
            <el-button class="register-btn" @click="changeRegisterType('学生')">我是学生</el-button>
          </p>
        </div>
      </div>

      <div v-else class="register-from">
        <div class="register-from-top">
          <i class="el-icon-back" style="cursor: pointer;font-weight: 600"
             @click="changeRegisterType('')"/>
          <span> {{registerType}}注册</span>
        </div>
        <div class="register-from-center">
          <el-form :model="registerForm" ref="loginFrom" label-position="right"
                   :rules="registerRules">
            <el-form-item prop="account">
              <el-input v-model="registerForm.account"
                        placeholder="邮箱/手机号"
                        @keyup.enter.native="register"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password"
                        placeholder="密码"
                        @keyup.enter.native="register"/>
            </el-form-item>
<!--            <el-form-item prop="password2">-->
<!--              <el-input type="password"-->
<!--                        placeholder="确认密码"-->
<!--                        @keyup.enter.native="register"/>-->
<!--            </el-form-item>-->
            <el-form-item prop="name">
              <el-input v-model="registerForm.name"
                        placeholder="姓名"
                        @keyup.enter.native="register"/>
            </el-form-item>
            <el-form-item v-if="registerType === '学生'" prop="number">
              <el-input v-model="registerForm.number"
                        placeholder="学号"
                        @keyup.enter.native="register"/>
            </el-form-item>
            <el-form-item prop="school">
              <el-input v-model="registerForm.school"
                        placeholder="学校"
                        @keyup.enter.native="register"/>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-col :span="24">
                <div style="display: flex">
                  <div style="flex-grow: 1">
                    <el-input type="text"
                              placeholder="验证码"
                              v-model="registerForm.captcha"/>
                  </div>
                  <div>
                    <el-tooltip class="item" effect="dark" content="点击更换" placement="bottom">
                      <img :src="captchaSrc" alt="点击更换" style="cursor: pointer;margin: 0 0 0 10px" @click="getCaptcha"/>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="register-from-bottom">
          <el-button class="register-btn" @click="register">注册为{{registerType}}</el-button>
        </div>
      </div>


      <div class="plan-bottom">
        <span>已有账号？</span>
        <router-link class="link-text" tag="span" :to="{name: 'login'}">去登录</router-link>
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
        registerType: ``,
        registerForm: {},
        captchaSrc:'',
        registerRules: {
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
      changeRegisterType: function (type) {
        this.registerType = type
        if (type) {
          this.getCaptcha()
        }
      },
      // 更新验证码
      getCaptcha: function () {
        this.captchaSrc = process.env.BASE_API + '/verifyController/getCaptcha?' + new Date()
      },
      // 注册
      register: function () {

        let password = this.registerForm.password
        const md5 = crypto.createHash('md5')
        md5.update(password)
        let parameter = {
          msg: {
            account: this.registerForm.account,
            password: md5.digest('hex'),
            name: this.registerForm.name,
            number: this.registerForm.number,
            school: this.registerForm.school,
            captcha: this.registerForm.captcha
          }
        }

        if (this.registerType === '学生') {
          AccountServer.studentRegister(parameter).then(res => {
            let data = res.data.msg;
            if (data.result) {
              this.$message({
                message: '注册成功',
                type: 'info'
              })
              this.$router.push({name: 'login'})
            } else {
              this.$message({
                message: data.error,
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
        } else if (this.registerType === '老师/助教') {
          AccountServer.teacherRegister(parameter).then(res => {
            let data = res.data.msg;
            if (data.result) {
              this.$message({
                message: '注册成功',
                type: 'info'
              })
              this.$router.push({name: 'login'})
            } else {
              this.$message({
                message: data.error,
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
        }
      }
    }
  }
</script>

<style scoped>

  .register-page {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login/login-bkgd.jpg");
    background-size: cover;
    position: relative;
  }

  .register-plan {
    width: 27%;
    min-width: 250px;
    min-height: 200px;
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

  .plan-bottom {
    width: 80%;
    margin: 15px 0;
    color: #8c939d;
    font-size: 0.8em;
    display: flex;
    justify-content: flex-end;
  }

  .link-text {
    color: #409EFF;
    cursor: pointer;
  }

  .select-from {
    width: 80%;
  }

  .select-from-top {
    width: 100%;
    margin: 15px 0 5px 0;
  }

  .select-from-top div {
    margin-top: 15px;
  }

  .select-btn-plan {
    width: 100%;
  }

  .register-btn {
    width: 100%;
    padding: 15px 0;
    margin: 5px;
    background-color: #32BAF0;
    color: white;
    font-size: 1.2em;
  }

  .register-from {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register-from-top {
    width: 80%;
    margin: 15px 0;
    font-size: 2.2em;
  }

  .register-from-bottom {
    width: 80%;
  }


</style>
