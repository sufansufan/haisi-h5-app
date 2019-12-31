<template>
  <view class="top-nav">
    <view v-for="(item, index) in topNavList" :key="index" @click="clickTopNav(item.path)">
      <view>
        <image :src="item.imgUrl" />
      </view>
      <view>
        <text>
          {{ item.title }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import { jump } from '@/common/utils/index'
export default {
  props: {
    topNavList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickTopNav(path) {
      jump(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-nav {
  width: 690rpx;
  height: 156rpx;
  background: #fff;
  border-radius: 20rpx;
  display: flex;
  & > view {
    width: 170rpx;
    text-align: center;
    font-size: 22rpx;
    color: #191919;
    line-height: 60rpx;
    padding-top: 25rpx;
    & > view:first-child {
      width: 72rpx;
      height: 69rpx;
      margin: 0 auto;
    }
  }
}
</style>
