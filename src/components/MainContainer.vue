<template>
  <view class="main-container">
    <top-bar-page />
    <view class="bg-image">
      <image src="/static/topBackground/topBackground.png" />
    </view>
    <view class="content">
      <slot />
    </view>
  </view>
</template>

<script>
import TopBarPage from './TopBarPage'
export default {
  components: {
    TopBarPage
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
  position: relative;
  .bg-image {
    width: 100vw;
    height: 135rpx;
  }
  .content {
    width: 690rpx;
    height: calc(100vh - 160rpx);
    position: absolute;
    top: 130rpx;
    left: 30rpx;
    border-radius: 30rpx;
    overflow: hidden;
  }
}
</style>
