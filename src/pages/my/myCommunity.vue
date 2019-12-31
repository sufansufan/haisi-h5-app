<template>
  <view class="my-service-pack">
    <main-container>
      <view class="content-box">
        <view class="top-title">
          {{ communityContent.name }}
        </view>
        <view class="bottom-content">
          <view>
            <view class="left">
              <text>地</text>
              <text>址：</text>
            </view>
            <view class="right">
              {{ transformVal(communityContent.address) }}
            </view>
          </view>
          <!-- <view>
            <view class="left">
              <text>简</text>
              <text>介：</text>
            </view>
            <view class="right">
              {{ transformVal(communityContent.brief) }}
            </view>
          </view> -->
          <view>
            <view class="left">
              <text>联</text>
              <text>系</text>
              <text>人：</text>
            </view>
            <view class="right">
              {{ transformVal(communityContent.contacts) }}
            </view>
          </view>
          <view>
            <view class="left">
              <text>联</text>
              <text>系</text>
              <text>电</text>
              <text>话：</text>
            </view>
            <view class="right">
              {{ transformVal(communityContent.phone) }}
            </view>
          </view>
        </view>
      </view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import { detail } from '@/common/api/community.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainContainer
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '我的社区',
      communityContent: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      detail({ communityId: this.userInfo.communityId }).then(({ data }) => {
        this.communityContent = data
      })
    },
    transformVal(val) {
      return val || '无'
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-service-pack {
    .content-box {
      height: calc(100vh - 160rpx);
      border-radius: 20rpx;
      &>view {
        box-sizing: border-box;
        padding: 0 30rpx;
        font-size: 30rpx;
        background: #fff;
      }
      .top-title {
        height: 85rpx;
        line-height: 85rpx;
        background: #2DA8D5;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .bottom-content {
        height: calc(100vh - 245rpx);
        &>view {
          display: flex;
          padding: 18rpx 0;
          border-bottom: 1px solid #E6E6E6;
          line-height: 48rpx;
          .left {
            display: flex;
            justify-content: space-between;
            width: 150rpx;
            margin-right: 12rpx;
            font-size: 30rpx;
            color: #1596C5;
          }
          .right {
            width: calc(100vw - 282rpx);
            font-size: 26rpx;
            color: #222222;
          }
        }
      }
    }
  }
</style>
