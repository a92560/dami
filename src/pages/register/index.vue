<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 23:18:19
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 09:06:35
 -->
<template>
  <div class="reg-wrapper">
    <HeaderSimple title="账户注册" />
    <!-- <div class="header-wrapper">
      <div class="img-box">
        <img src="./img/logo.png" alt="">
      </div>
      <div class="text">
        账户注册
      </div>
    </div> -->
    <div class="form-wrapper">
      <el-form
        :model="regForm"
        ref="regForm"
        :label-position="labelPosition"
        :label-width="labelWidth"
      >
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入邮箱"
            type="email"
            v-model="regForm.email"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="regForm.password"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            type="password"
            placeholder="请输入确认密码"
            v-model="regForm.repassword"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="emailCode">
          <el-input
            class="phone-code"
            placeholder="请输入验证码"
            v-model="regForm.emailCode"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
          <el-button
            style="margin-left: 15px"
            @click="handleGetEmailCode"
            :disabled="intervalNumber > 1"
            >{{
              intervalNumber ? `${intervalNumber}后再获取验证码` : '获取验证码'
            }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" @click="handleToRegister"
            >立即注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import HeaderSimple from '@/components/header-simple'
export default {
  name: 'Register',
  components: {
    HeaderSimple,
  },
  data() {
    return {
      regForm: {
        email: '714019351@qq.com',
        password: '',
        repassword: '',
        emailCode: '',
      },
      labelPosition: 'left',
      labelWidth: '60px',
      intervalNumber: 0,
    }
  },
  methods: {
    async handleGetEmailCode() {
      const email = this.regForm.email

      if (!email) {
        return this.$message.error('请先输入邮箱')
      }
      const ret = await this.$http.getEmail({ data: { email } })
      console.log('ret::::', ret)
      if (ret) {
        this.$message.success(ret.message)
        if (!this.intervalId) {
          this.handleCountDown()
        }
      }
    },

    async handleToRegister() {
      const email = this.regForm.email
      const password = this.regForm.password
      const emailCode = this.regForm.emailCode
      if (!email || !password || !emailCode) {
        this.$message.error('请先填写必填项')
        return
      }
      const loginRet = await this.$http.postRegister({
        email,
        password,
        emailCode,
      })
      if (loginRet) {
        this.$message.success('注册成功')
        setTimeout(() => {
          this.$router.replace('/login')
        }, 1000)
      }
    },

    handleCountDown() {
      this.intervalNumber = 30
      this.intervalId = setInterval(() => {
        if (this.intervalNumber <= 0) {
          this.intervalNumber = 0
          clearInterval(this.intervalId)
        } else {
          this.intervalNumber--
        }
      }, 1000)
    },
  },
}
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 15px;
}
.el-input.phone-code {
  width: 60%;
}
.reg-wrapper {
  height: 100px;
  /* .header-wrapper{
    display: flex;
    height: 60px;
    background: white;
    justify-content: center;
    .img-box{
      width: 167px;
      position: relative;
      margin-right: 20px;
      &:after{
        content: "";
        display: inline-block;
        width: 2px;
        height: 40px;
        background: red;
        position: absolute;
        top: 10px;
        right: 0;
      }
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .text{
      height: 100%;
      line-height: 60px;
      color: #495060;
      font-size: 14px;
      font-weight: 500;
    }
  } */
  .form-wrapper {
    margin: 0 auto;
    margin-top: 50px;
    width: 40%;
  }
}
</style>
