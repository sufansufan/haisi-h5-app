<template>
  <view class="login-content-box">
    <view class="login-item">
      <view>
        <image src="/static/login/edit.png" />
      </view>
      <view class="code">
        <view>
          <input v-model="userInfo.account" placeholder="请输入账号" placeholder-class="placeStyle">
        </view>
      </view>
    </view>
    <view class="login-item">
      <view>
        <image src="/static/login/lock.png" />
      </view>
      <view class="code">
        <view>
          <input v-model="userInfo.checkCode" placeholder="密码" placeholder-class="placeStyle" type="password">
        </view>
      </view>
    </view>
    <view class="save-btn" @click="submit">
      登录
    </view>
  </view>
</template>

<script>
import { ToolTips } from '@/common/utils/index'
export default {
  props: {
    type: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfo: {
        loginType: '3',
        account: '',
        checkCode: '',
        isPhone: 0,
        password: ''
      },
      tagText: '获取验证码'
    }
  },
  watch: {
    type() {
      this.userInfo = {
        ...this.userInfo,
        account: '',
        checkCode: '',
        isPhone: 0,
        password: ''
      }
      if (this.type) {
        this.userInfo.loginType = ''
      }
    }
  },
  methods: {
    submit() {
      this.userInfo.password = this.userInfo.checkCode.trim()
      this.userInfo.account = this.userInfo.account.trim()
      if (!this.userInfo.password.trim()) {
        ToolTips('请输入密码')
        return
      }
      if (this.userInfo.account === '') {
        ToolTips('请输入账号')
        return
      }
      this.$store.commit('SET_SIGNOUT', false)
      this.$store.dispatch('login', this.userInfo)
    }
  }

}
</script>

<style lang="scss" scoped>
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
      &:first-child {
        width: 30rpx;
        height: 38rpx;
        margin: 0 36rpx;
      }
      &:last-child {
        width: 78%;
        height: 60rpx;
        margin-top: 15rpx;
        & > select {
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          color: #68C8ED;
          outline: none;
          font-size: 28rpx;
          margin-top: -2px;
          & > .option {
            border: none;
          }
          &::focus {
             border: none;
          }
        }
      }
    }
    .code {
      display: flex;
      & > view {
        &:first-child {
          width: 65%;
        }
      }
      input {
        color: #68C8ED;
      }
    }
  }
}
</style>
