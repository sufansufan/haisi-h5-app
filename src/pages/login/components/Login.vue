<template>
  <view class="login-box">
    <view class="login-type">
      <tab :value.sync="topTypeNum" range-key="name" :tab-list="topTypeList" active-color="#42BAE9" default-color="#1E1E1E" @change="tabChange" />
    </view>
    <template v-if="topTypeNum === 0">
      <login-content :type="true" @isDoctor="isDoctor" />
    </template>
    <template v-if="topTypeNum === 1">
      <login-content />
    </template>
    <view class="login-forget">
      <view />
      <!-- <view @click="modifyPassword('修改密码')">
        修改密码
      </view> -->
      <view @click="modifyPassword('忘记密码')">
        忘记密码?
      </view>
    </view>
  </view>
</template>

<script>
import Tab from '@/components/Tab.vue'
import LoginContent from './LoginContent'
import { jump } from '@/common/utils/index'
export default {
  name: 'Login',
  components: {
    Tab,
    LoginContent
  },
  data() {
    return {
      topTypeNum: 0,
      topTypeList: [
        {
          name: '验证码登录',
          value: 0
        },
        {
          name: '密码登录',
          value: 1
        }
      ]
    }
  },
  methods: {
    tabChange(e) {
      this.topTypeNum = e.tab.value
    },
    modifyPassword(type) {
      jump('/pages/login/forget?type=' + type)
    },
    isDoctor() {
      this.topTypeNum = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  .login-type {
    width: 559rpx;
    margin: 20rpx auto 0rpx;
  }
  .login-forget {
    color: #42BAE9;
    font-size: 28rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    padding: 0rpx 30rpx;
  }
}

</style>
