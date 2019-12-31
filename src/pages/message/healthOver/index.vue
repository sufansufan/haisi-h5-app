<template>
  <view class="box">
    <top-bar />
    <view class="top-background">
      <uni-nav-bar left-text="预警处理" left-icon="back" :fixed="true" color="#fff" @click-left="back" />
    </view>
    <view class="content">
      <view v-for="(val, index) in listData" :key="val.id" ref="item" @click="toDetail(index, val.sendId)">
        <view>
          <view class="left">
            <view>{{ val.sendName }}</view>
            <view class="test-time">
              最近检测时间：
              <view class="red-font">
                {{ val.testTime }}
              </view>
            </view>
          </view>
          <view class="right">
            <image src="/static/message/rightArrow.png" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/TopBar'
import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar'
import { jump, goBack } from '@/common/utils/index.js'
import { messageList } from '@/common/api/message'
import { mapGetters } from 'vuex'
export default {
  components: {
    TopBar,
    uniNavBar
  },
  data() {
    return {
      listData: [],
      choosedIndex: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.doGetListData()
  },
  onHide() {
    this.$refs.item[this.choosedIndex].$el.classList.remove('choosed-bg')
  },
  methods: {
    doGetListData() {
      const params = {
        communityId: this.userInfo.communityId
      }
      messageList(params).then(({ data }) => {
        const list = data.records
        this.listData = list
      })
    },
    toDetail(index, id) {
      this.choosedIndex = index
      this.$refs.item[index].$el.classList.add('choosed-bg')
      const interval = setInterval(() => {
        clearInterval(interval)
        jump('/pages/message/healthOver/overLog?id=' + id)
      }, 100)
    },
    back() {
      goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    width: 100vw;
    height: 100vh;
    background: #f2f2f2;
    .content {
      box-sizing: border-box;
      height: calc(100vh - 154rpx);
      margin: -134rpx 30rpx 10rpx 30rpx;
      background: #fff;
      border-radius: 20rpx;
      overflow: auto;
      &>view {
        &>view {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 114rpx;
          border-bottom: 1px solid #E6E6E6;
          margin: 0 30rpx;
          .left {
            width: calc(100% - 42rpx);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            &>view:first-child {
              font-size: 28rpx;
              line-height: 38rpx;
              color: #010101;
            }
            .test-time{
              font-size: 24rpx;
              line-height: 38rpx;
              color: #B7B7B7;
            }
            .red-font {
              color: #F74432;
              display: inline-block;
            }
          }
          .right {
            width: 42rpx;
            height: 42rpx;
          }
        }
      }
    }
  }
  .choosed-bg {
    background: #f7f7f7;
  }
  .unchoose-bg {
    background: #fff;
  }
</style>
