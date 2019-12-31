<template>
  <scroll-view :scroll-y="true">
    <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
      <block v-for="item in list" :key="item.id">
        <view class="push-info radius-white-box">
          <view class="push-info-title">
            <view class="push-info-title-name">
              {{ item.sendName }}
            </view>
            <view class="push-info-title-time">
              {{ item.createTime }}
            </view>
          </view>
          <view class="push-info-content">
            {{ item.content }}
          </view>
        </view>
      </block>
    </mescroll-uni>
  </scroll-view>
</template>

<script>
import MescrollUni from 'mescroll-uni' // npm安装的引入方式

export default {
  components: {
    MescrollUni
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    getList: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // 下拉刷新的常用配置
      downOption: {
        use: true,
        auto: true,
        textLoading: '更新中...'
      },
      // 上拉加载的常用配置
      upOption: {
        use: false
      }
    }
  },
  methods: {
    downCallback(mescroll) {
      this.getList(mescroll)
    }
  }
}
</script>

<style lang='scss' scoped>
  scroll-view {
    height: 100%;
  }
  .push-info{
      width:100%;
      height:auto;
      padding: 30rpx 30rpx 60rpx;
      &:not(:last-of-type){
        margin-bottom: 20rpx;
      }
      &-title{
          display: flex;
          justify-content: space-between;
          padding-bottom: 24rpx;
          border-bottom:1rpx solid rgba(230,230,230,1);
          &-name{
              font-size: 28rpx;
              font-weight:400;
              color:rgba(75,96,142,1);
              line-height: 28rpx;
          }
          &-time{
              font-size: 22rpx;
              color: #BDBDBD;
          }
      }
      &-content{
          font-size:24rpx;
          font-weight:400;
          color:rgba(92,92,92,1);
          line-height:38rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-top: 24rpx;
      }
  }
</style>
