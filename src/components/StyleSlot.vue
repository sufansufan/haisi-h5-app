<template>
  <view class="style-slot">
    <top-bar />
    <view class="top-background">
      <slot name="style-header" />
    </view>
    <view class="style-slot-box">
      <slot name="style-box" />
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  components: {
    TopBar
  }
}
</script>

<style lang="scss" scoped>
    .style-slot{
        min-height: 100vh;
        width: 100vw;
        background: #f8f8f8;
        position: relative;
        &-box{
            position: absolute;
            top: 144rpx;
            left: 30rpx;
            right: 30rpx;
            height: calc(100vh - 174rpx);
        }
    }
</style>
