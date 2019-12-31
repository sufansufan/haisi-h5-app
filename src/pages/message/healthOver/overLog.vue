<template>
  <view class="log-box">
    <top-bar />
    <view class="top-background">
      <uni-nav-bar left-text="超标记录" left-icon="back" :fixed="true" color="#fff" @click-left="back" />
    </view>
    <view class="content">
      <view class="phone-address">
        <view class="phone">
          <view class="left">
            <view>姓名：</view>
            <template v-if="listData.length>0">
              <view>{{ listData[0].sendName }}</view>
            </template>
          </view>
          <view class="right" @click="call">
            <image src="/static/message/phone.png" />
          </view>
        </view>
        <!-- <view class="phone">
          <view class="left">
            <view>电话：</view>
            <template v-if="listData.length>0">
              <view>{{ listData[0].phone }}</view>
            </template>
          </view>
          <view class="right" @click="call">
            <image src="/static/message/phone.png" />
          </view>
        </view> -->
        <view class="adress">
          <view class="left">
            <view>住址：</view>
            <template v-if="listData.length>0">
              <view>{{ listData[0].sendAddress }}</view>
            </template>
          </view>
        </view>
      </view>
      <view class="log-list">
        <scroll-view :scroll-y="true">
          <view class="title">
            超标记录
          </view>

          <view class="list-all">
            <view v-for="val in listData" :key="val.id" class="list-box" @click="disposeDetail(val.id)">
              <view class="records left">
                <view class="info">
                  <view>{{ val.alarmTypeName }}</view>
                  <view v-if="val.alarmType != 1" class="red-font">
                    {{ val.alarmValue }} {{ val.alarmType===2?'次/分钟':'mmhg' }}
                  </view>
                  <view class="result" :class="className[val.handleStatus]">
                    {{ val.handleStatusName }}
                  </view>
                </view>
                <view class="time">
                  检测时间：
                  <view>{{ val.testTime }}</view>
                </view>
              </view>
              <view class="detail right">
                <image src="/static/message/rightArrow.png" />
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/TopBar'
import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar'
import { goBack } from '@/common/utils/index.js'
import { messageList } from '@/common/api/message.js'
import { jump } from '@/common/utils/index.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    TopBar,
    uniNavBar
  },
  data() {
    return {
      className: ['undisposed', 'disposing', 'disposed'],
      listData: [],
      sendId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.sendId = this.$route.query.id
    // this.getDetailInfo()
    this.overRecord()
  },
  methods: {
    back() {
      goBack()
    },
    overRecord() {
      const params = {
        sendId: this.sendId
      }
      messageList(params).then(({ data }) => {
        console.log(data, 'chaxiangqing ')
        this.listData = data.records
      })
    },
    call() {
      let phone = ''
      if (this.listData.length > 0) {
        phone = this.listData[0].phone
      }
      /* global uni */
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    disposeDetail(id) {
      jump(`/pages/message/recordDetails?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .log-box {
    width: 100vw;
    height: 100vh;
    background: #f2f2f2;
    .content {
      box-sizing: border-box;
      height: calc(100vh - 154rpx);
      margin: -134rpx 30rpx 10rpx 30rpx;
      &>view {
        background: #fff;
        border-radius: 20rpx;
      }
      .phone-address {
        &>view {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 114rpx;
          margin: 0 30rpx;
          &:first-child{
            border-bottom: 1px solid #E6E6E6;
          }
          .left>view:first-child {
            font-size: 24rpx;
            line-height: 38rpx;
            color: #5C5C5C;
          }
          .left>view:last-child {
            font-size: 28rpx;
            line-height: 38rpx;
            color: #000;
          }
          .right {
            width: 42rpx;
            height: 42rpx;
          }
        }

      }
      .log-list {
        box-sizing: border-box;
        margin-top: 20rpx;
        height: calc(100vh - 174rpx - 229rpx);
        padding-top: 26rpx;
        &>scroll-view{
          width: 100%;
          height: 100%;
        }
        .title {
          font-size: 24rpx;
          line-height: 38rpx;
          color: #5C5C5C;
          margin: 0 30rpx;
        }
        .list {
          height: calc(100% - 50rpx);
          overflow: auto;
          &>view {
            margin: 0 30rpx;
            &>view {
              height: 72rpx;
              border-bottom: 1px solid #E6E6E6;
              display: flex;
              justify-content: space-between;
              align-items: center;
              &>view {
                font-size: 28rpx;
                line-height: 38rpx;
              }
              .right {
                color: #BDBDBD;
              }
            }
          }
        }
        .list-box{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 114rpx;
          margin: 0 30rpx;
          border-bottom: 1px solid #E6E6E6;
          .left {
            width: calc(100% - 42rpx);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            box-sizing: border-box;
            padding-right: 20rpx;
            .info {
              font-size: 28rpx;
              line-height: 38rpx;
              color: #010101;
              &>view{
                display: inline-block;
              }
              .red-font{
                margin-left: 40rpx;
              }
              .result{
                float: right;
              }
              .undisposed{
                color: #FF2A2A;
              }
              .disposed{
                color: #0BC418;
              }
              .disposing{
                color: #FFA001;
              }
            }
            .time{
              font-size: 24rpx;
              line-height: 38rpx;
              color: #B7B7B7;
              &>view{
                display: inline-block;
              }
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
</style>
