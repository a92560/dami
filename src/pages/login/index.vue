<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 23:21:35
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 10:02:27
 -->
<template>
  <div class="login-wrapper">
    <HeaderSimple title="欢迎登录" />
    <div class="login-content">
      <div class="img-box">
        <img src="./img/loginImg.jpg" alt="" />
      </div>
      <div class="login">
        <MTabs :tabs="tabs" @handleSwitchTab="handleSwitchTab"></MTabs>
        <div class="content-wrapper">
          <p class="tc" v-show="activeIndex === 1">
            验证即登录，未注册将自动创建大觅网账号
          </p>
          <el-form
            :model="loginForm"
            :label-position="labelPosition"
            :inline-message="true"
          >
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="loginForm.email">
                <template slot="prepend">
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-show="activeIndex === 0">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
              >
                <template slot="prepend">
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="phoneCode" v-show="activeIndex === 1">
              <el-input
                class="phone-code"
                placeholder="请输入验证码"
                v-model="loginForm.phoneCode"
              />
              <el-button style="margin-left: 15px">获取验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" @click="handleToLogin"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="tip">
            <div class="left">
              <input
                type="radio"
                :checked="isAutoLogin"
                @click="handleAutoLogin"
                name="autoLogin"
              />&nbsp;&nbsp;下次自动登录
            </div>
            <div class="right" v-show="activeIndex !== 1">
              <span>忘记密码？</span>
              <span class="reg" @click="$router.push('/reg')">立即注册</span>
            </div>
          </div>
          <div class="other">
            其他登录：<i class="iconfont icon-we-chat"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import HeaderSimple from '@/components/header-simple'
import MTabs from '@/components/tabs'
import { loginTabs } from '@/config'
export default {
  name: 'Login',
  components: {
    HeaderSimple,
    MTabs,
  },
  data() {
    return {
      loginForm: {
        email: 'admin@qq.com',
        password: '123',
        phoneCode: '',
      },
      labelPosition: 'left',
      labelWidth: '10px',
      tabs: loginTabs,
      activeIndex: 0, // 0表示密码登录，1表示验证码登录
      isAutoLogin: false,
      loginFormRules: {
        email: [
          {
            required: true,
            message: '邮箱为必填项',
            trigger: 'blur',
          },
        ],
        phoneCode: [
          {
            required: true,
            message: '验证码为必填项',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '密码为必填项',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapActions(['login']),
    handleSwitchTab(i) {
      this.activeIndex = i
    },
    handleAutoLogin(e) {
      this.isAutoLogin = !this.isAutoLogin
    },
    async handleToLogin() {
      const { email, phoneCode, password } = this.loginForm
      if (this.activeIndex === 0) {
        if (!email || !password) {
          this.$message.error('邮箱或者密码为必填项')
          return
        }
        // console.log("login", this.login)
        this.login({ email, password }).then(isSuccess => {
          if (isSuccess) {
            const query = this.$route.query.redirect || '/'
            this.$router.replace(query)
          }
        })
        // const ret = await this.loginConfirm(email, password)
      } else if (this.activeIndex === 1) {
        if (!email || !phoneCode) {
          this.$message.error('邮箱或者密码为必填项')
          return
        }
        const ret = await this.loginConfirm(email, phoneCode)
      }
    },
    async loginConfirm(email, password) {
      const ret = await this.$http.postLogin({ email, password })
      console.log('loginConfirm::::::', ret)
    },
  },
  computed: {},
}
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 15px;
}
.el-input.phone-code {
  width: 60%;
}
.login-content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .img-box {
    width: 520px;
    height: 400px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .login {
    margin-left: 20px;
    .content-wrapper {
      background: white;
      border: 1px solid #ccc;
      width: 460px;
      height: 369px;
      padding: 30px;
      box-sizing: border-box;
      > p {
        font-size: 14px;
        color: @HoverC;
        margin-bottom: 10px;
      }
      .tip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .right {
          .reg {
            color: @HoverC;
          }
        }
      }
      .other {
        margin-top: 35px;
        font-size: 14px;
        > i {
          cursor: pointer;
          color: #84d945;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
