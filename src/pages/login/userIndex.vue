<template>
  <view class="login">
    <view>
      <top-bar :show="true" />
    </view>
    <view class="login-bg">
      <view>
        <!-- 注册登录 -->
      </view>
      <view class="login-bg-left" />
    </view>
    <view class="login-content">
      <view class="top-tab">
        <tab :value.sync="topTabNum" range-key="name" :tab-list="tabList" active-color="#42BAE9" default-color="#1E1E1E" @change="objectChange" />
      </view>
      <template v-if="topTabNum === 0">
        <login />
      </template>
      <template v-else-if="topTabNum === 1">
        <register @changeTab="changeTab" />
      </template>
    </view>
    <view class="login-bottom" />
  </view>
</template>

<script>
import TopBar from '../../components/TopBar'
import Tab from '@/components/Tab.vue'
import Login from './components/Login'
import Register from './components/Register'
export default {
  components: {
    TopBar,
    Tab,
    Login,
    Register
  },
  data() {
    return {
      topTabNum: 0,
      tabList: [
        {
          name: '登录',
          value: 0
        },
        {
          name: '注册',
          value: 1
        }
      ]

    }
  },
  methods: {
    objectChange(e) {
      this.topTabNum = e.tab.value
    },
    changeTab() {
      this.topTabNum = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  .login-bg {
    width: 100vw;
    height: 400rpx;
    background: url('/static/login/userloginBg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    & > view {
      text-align: center;
      color: #fff;
      margin-top: 20rpx;
    }
    .login-bg-left {
      width: 406rpx;
      height: 333rpx;
      background: url('/static/login/loginBgLeft.png') no-repeat;
      background-size: 100% 100%;
      z-index: 2;
      position: absolute;
      top: 30rpx;
      right: 0rpx;
    }
  }
  .login-content {
    width: 690rpx;
    height: calc(100vh - 400rpx);
    background: #fff;
    position: absolute;
    top: 290rpx;
    left: 30rpx;
    border-radius: 30rpx;
    overflow: hidden;
    .top-tab {
      width: 200rpx;
      margin-left: 30rpx;
    }
  }
  .login-bottom {
    width: 100vw;
    height: 147rpx;
    background: url('/static/login/loginBottom.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;
  }
}
</style>
