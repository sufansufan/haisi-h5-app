<template>
  <view class="radius-white-box box-frame">
    <view class="box-frame-title padding-all--30">
      {{ infos.title }}
    </view>
    <view class="box-frame-content">
      <view class="value-box" :class="infos.type">
        <view class="values">
          {{ infos.value }}
        </view>
        <view class="unit">
          {{ infos.unit }}
        </view>
      </view>
      <view class="time">
        最近检测时间：
        <span>{{ infos.time }}</span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    infos: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-frame{
    box-shadow:0px 3px 14px rgba(0,0,0,0.1);
    height: 512rpx;
    &:not(:last-of-type){
      margin-bottom: 40rpx;
    }
    &-title{
      font-size: 30rpx;
      color: #fff;
      background: #2DA8D5;
    }
    &-content{
      .value-box{
        text-align: center;
        font-weight:bold;
        height: 325rpx;
        line-height: 325rpx;
        &.heart{
          color: #FF8080;
        }
        &.blood{
          color: #00C4FF;
          .values{
          font-size: 100rpx;
          }
        }
        .values{
          font-size: 180rpx;
          display: inline-block;
        }
        .unit{
          font-size:26rpx;
          // line-height:35rpx;
          display: inline-block;
          margin-left: 20rpx;
        }
      }
      .time{
        color: #657180;
        text-align: right;
        font-size:22rpx;
        line-height:29rpx;
        padding: 30rpx 40rpx;
      }
    }
  }
</style>
