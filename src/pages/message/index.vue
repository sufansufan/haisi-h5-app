<template>
  <view class="message">
    <view class="mesaage-top" />
    <view class="message-nav">
      <top-nav :top-nav-list="topNavList" />
    </view>
    <view class="message-box">
      <scroll-view :scroll-y="true">
        <List />
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopNav from '@/components/TopNav'
import List from './list'
export default {
  components: {
    TopNav,
    List
  },
  data() {
    return {
      topNavList: [
        {
          path: '/pages/message/callRecord/index',
          imgUrl: '/static/message/call.png',
          title: '联系医生'
        },
        {
          path: '/pages/message/healthOver/index',
          imgUrl: '/static/message/target.png',
          title: '预警处理'
        },
        {
          path: '/pages/message/communityPush/index?type=3',
          imgUrl: '/static/message/Community.png',
          title: '社区推送'
        },
        {
          path: '/pages/message/communityPush/index?type=4',
          imgUrl: '/static/message/system.png',
          title: '系统通知'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  .mesaage-top {
    width: 100vw;
    height: 418rpx;
    background: url('/static/message/messageTop.png') no-repeat;
    background-size: 100% 100%;
  }
  .message-nav {
    position: absolute;
    top: 294rpx;
    left: 30rpx;
  }
  .message-box {
    margin-top: 50rpx;
    // width: calc(100vw - 60rpx);
    height: calc(100vh - 600rpx);
    padding: 0 30rpx 20rpx;
    box-sizing: border-box;
    & > scroll-view {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
