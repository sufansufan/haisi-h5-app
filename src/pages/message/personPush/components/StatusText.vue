<template>
  <view class="status-text" :class="statusColor">
    <view class="status-text-title">
      {{ statusRow.type===1?'请求呼叫':'健康超标' }}
    </view>
    <view class="status-text-time">
      {{ statusRow.createTime }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    statusRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  computed: {
    statusColor() {
      if (this.statusRow.type === 2) {
        return 'red'
      } else {
        return 'orange'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .status-text{
        font-size: 24rpx;
        line-height: 38rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-title{
            padding: 6rpx 10rpx;
            border-radius: 15rpx;
            color: #fff;
        }
    }
</style>
