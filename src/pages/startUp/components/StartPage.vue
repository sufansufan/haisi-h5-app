<template>
  <view class="start-up-box">
    <view>
      <view>
        <image :src="dataList.url" />
      </view>
      <view>
        <text>
          {{ dataList.title }}
        </text>
      </view>
      <view>
        <text>
          {{ dataList.dec }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: () => { }
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.start-up-box {
  position: relative;
  & > view {
    & > view {
      &:first-child {
        width: 100%;
        height: 903rpx;
      }
      &:nth-of-type(2) {
        width: 207rpx;
        height: 49rpx;
        font-size: 50rpx;
        margin: 30rpx auto;
        font-weight: 600;
      }
      &:last-child {
        width: 408rpx;
        height: 34rpx;
        font-size: 34rpx;
        color: #989898;
        margin: 30rpx auto;
      }
    }
  }
}
</style>
