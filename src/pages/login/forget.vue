<template>
  <view class="forget-box">
    <main-container>
      <view class="forget-box-content">
        <view class="login-content-box">
          <view class="login-item">
            <view class="code">
              <view>
                <input v-model="forgetInfo.account" placeholder="手机号" placeholder-class="placeStyle">
              </view>
              <view class="user-add">
                <uni-tag :text="tagText" type="primary" :circle="true" @click="tagClick" />
              </view>
            </view>
          </view>
          <view class="login-item">
            <view>
              <input v-model="forgetInfo.checkCode" placeholder="验证码" placeholder-class="placeStyle">
            </view>
          </view>
          <view class="login-item">
            <view>
              <input v-model="forgetInfo.password" type="password" placeholder="新密码" placeholder-class="placeStyle">
            </view>
          </view>
          <view class="login-item">
            <view>
              <input v-model="forgetInfo.configPassword" type="password" placeholder="确认密码" placeholder-class="placeStyle">
            </view>
          </view>
          <view class="save-btn" @click="updatePassword">
            保存
          </view>
        </view>
      </view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import uniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag'
import { phoneNumber } from '@/common/utils/validate'
import { ToolTips, goBack } from '@/common/utils/index'
import { getCode, updatePassword } from '@/common/api/login'
export default {
  components: {
    MainContainer,
    uniTag
  },
  provide() {
    return {
      titleName: this.$route.query.type
    }
  },
  data() {
    return {
      tagText: '获取验证码',
      forgetInfo: {
        account: '',
        checkCode: '',
        password: '',
        configPassword: '',
        type: this.$route.query.type === '修改密码' ? 2 : 1
      }
    }
  },
  methods: {
    tagClick() {
      const { account } = this.forgetInfo
      if (!phoneNumber(account)) {
        return
      }
      if (Number(this.tagText) > 0) {
        return
      }
      this.tagText = '60'
      var time = setInterval(() => {
        this.tagText = String(Number(this.tagText) - 1)
        if (this.tagText === '0') {
          clearInterval(time)
          this.tagText = '获取验证码'
        }
      }, 1000)
      const params = {
        phone: account,
        type: this.$route.query.type === '修改密码' ? 3 : 2
      }
      getCode(params)
    },
    updatePassword() {
      const { account, checkCode, password, configPassword } = this.forgetInfo
      if (!phoneNumber(account)) {
        return
      }
      if (!checkCode.trim()) {
        ToolTips('验证码不能为空')
        return
      }
      if (!password || !configPassword || password.length < 6 || configPassword.length < 6) {
        ToolTips('密码不能为空, 且最少6位数')
        return
      }
      if (password !== configPassword) {
        ToolTips('两次密码不一致')
        return
      }
      updatePassword(this.forgetInfo).then(({ code }) => {
        if (code) {
          setTimeout(() => {
            goBack()
            ToolTips('注册成功', 'success')
          }, 500)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.forget-box-content {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .login-content-box{
    .login-item {
      width: 635rpx;
      height: 88rpx;
      background: #ecf8fd;
      margin: 60rpx auto 0rpx;
      border-radius: 88rpx;
      display: flex;
      align-items: center;
      & > view {
        width: 90%;
        height: 60rpx;
        margin: 15rpx auto 0rpx;
      }
      input {
        color: #68C8ED;
      }
      .code {
        display: flex;
         & > view:first-child {
          width: 70%;
          height: 60rpx;
        }
      }
    }
  }
}
</style>
