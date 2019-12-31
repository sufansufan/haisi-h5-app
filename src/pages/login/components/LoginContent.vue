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
        <view v-if="type" class="user-add">
          <uni-tag :text="tagText" type="primary" :circle="true" @click="tagClick" />
        </view>
      </view>
    </view>
    <view class="login-item">
      <view>
        <image src="/static/login/lock.png" />
      </view>
      <view class="code">
        <view v-if="type">
          <input v-model="userInfo.checkCode" placeholder="短信验证码" placeholder-class="placeStyle" type="password">
        </view>
        <view v-else>
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
import uniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag'
import { phoneNumber } from '@/common/utils/validate'
import { getCode } from '@/common/api/login'
import { ToolTips } from '@/common/utils/index'
export default {
  components: {
    uniTag
  },
  props: {
    type: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfo: {
        loginType: '4',
        account: '',
        checkCode: '',
        isPhone: 0,
        password: ''
      },
      tagText: '获取验证码'
    }
  },
  watch: {
    'userInfo.loginType'() {
      const { loginType } = this.userInfo
      if (loginType === '4' && this.type) this.userInfo.isPhone = 1
    }
  },
  methods: {
    tagClick() {
      const { account } = this.userInfo
      if (!phoneNumber(account)) {
        return
      }
      if (Number(this.tagText) > 0) return
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
        type: 1
      }
      getCode(params)
    },
    submit() {
      const { account, loginType } = this.userInfo
      if (loginType === '4') {
        if (!phoneNumber(account)) {
          return
        }
      }
      this.userInfo.password = this.userInfo.checkCode.trim()
      this.userInfo.account = this.userInfo.account.trim()
      if (!this.userInfo.password.trim()) {
        ToolTips('请输入密码')
        return
      }
      this.userInfo.type = this.type
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
