<template>
  <view>
    <main-container>
      <view class="radius-white-box">
        <scroll-view :scroll-y="true">
          <view class="style-box-all">
            <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
              <view class="message-box">
                <!-- <status-text :status-row="item" /> -->
                <view class="message-box-content">
                  患者实时状态
                </view>
              </view>
              <view class="message-box-item">
                <view class="tilte">
                  患者地址
                </view>
                <view>{{ personDetail.sendAddress }}</view>
              </view>
              <view class="message-box-item">
                <view class="current-status">
                  <view class="tilte">
                    患者实时状态详情
                  </view>
                  <view class="record" @click="healthOverUrl">
                    超标记录
                  </view>
                </view>
                <view v-if="personDetail.alarmType != '1'" class="details">
                  <view v-if="personDetail.alarmType=== 2" class="blood">
                    <view>
                      心率：{{ personDetail.alarmValue }} 次/分钟
                    </view>
                    <view>
                      阈值：{{ personDetail.thresholdValue }} 次/分钟
                    </view>
                  </view>
                  <view v-if="personDetail.alarmType=== 3" class="power">
                    <view>
                      血压：{{ personDetail.alarmValue }} mmhg
                    </view>
                    <view>
                      阈值：{{ personDetail.thresholdValue }} mmhg
                    </view>
                  </view>
                </view>
              </view>
              <view class="message-box-item message-box-border">
                <view>
                  <text class="tilte">
                    最近检测时间：
                  </text>
                  <text>
                    {{ personDetail.testTime }}
                  </text>
                </view>
              </view>
              <view class="message-box-item message-box-border">
                <view>
                  <text class="tilte">
                    超标类型：
                  </text>
                  <text class="type" :class="[personDetail.alarmType===3?'power-msg':'']">
                    {{ personDetail.alarmTypeName }}
                  </text>
                </view>
              </view>
            </mescroll-uni>
          </view>
          <view class="message-btn">
            <view>{{ handleStatusMsg }}</view>
            <view v-if="personDetail.handleStatus === 0">
              <view class="save-btn red-btn" @click="disposeWarning(2)">
                此为有效超标预警
              </view>
              <view class="save-btn" @click="disposeWarning(1)">
                此为无效超标预警
              </view>
            </view>
            <view v-else>
              <view class="save-btn" :class="{'stop-dispose':!isContinueDisposing}" @click="disposeWarning(4)">
                填写处理结果
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </main-container>
    <view class="call-user" @click="callUser">
      <img src="/static/user/call.png" alt="">
    </view>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import MescrollUni from 'mescroll-uni' // npm安装的引入方式
import { jump } from '@/common/utils/index'
// import StatusText from './components/StatusText.vue'
import { messageDetail } from '@/common/api/message.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    MescrollUni,
    MainContainer
    // StatusText
  },
  provide() {
    return {
      titleName: this.$route.query.name
    }
  },
  data() {
    return {
      id: '',
      navName: '呼叫与呼叫记录',
      // 下拉刷新的常用配置
      downOption: {
        use: true,
        auto: true,
        textLoading: '更新中...'
      },
      // 上拉加载的常用配置
      upOption: {
        use: false
      },
      personDetail: {}, // 患者信息
      warnDispoced: {}, // 处理预警信息
      isContinueDisposing: false // 是否继续处理
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    handleStatusMsg() {
      let msg = ''
      if (this.personDetail.handleStatus === 0) {
        msg = '请判断该预警是否有效'
      } else if (this.personDetail.handleStatus === 1) {
        msg = '继续处理：'
      }
      return msg
    }
  },
  created() {
    this.id = this.$route.query.id
    // this.getWarningDeatil()
  },
  methods: {
    downCallback(mescroll) {
      this.getWarningDeatil(mescroll)
    },
    callUser() {
      let phone = ''
      if (this.personDetail.phone) {
        phone = this.personDetail.phone
      }
      /* global uni */
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 判断预警是否有效
    disposeWarning(type) {
      if (this.isContinueDisposing) {
        const url = `id=${this.id}&type=${type}&doctorId=${this.warnDispoced[0].doctorId}`
        jump(`/pages/message/personPush/disposeWarning?${url}`)
      }
    },
    // 预警详情
    getWarningDeatil(mescroll) {
      const params = {
        warnId: this.id
      }
      messageDetail(params).then(({ data }) => {
        console.log(data, '详情')
        if (mescroll) {
          mescroll.endSuccess()
        }
        this.personDetail = data.communityWarnMsgVO
        this.warnDispoced = data.communityWarnHandleVOList
        // 按钮判断 如果预警状态是 处理中 则判断当前时间是否大于预定时间
        if (this.personDetail.handleStatus === 1) {
          const orderTimeConfim = this.isOrderTime(data.communityWarnHandleVOList[1].orderTime)
          this.isContinueDisposing = orderTimeConfim
        } else {
          this.isContinueDisposing = true
        }
      })
    },
    isOrderTime(ord) {
      const ordTime = new Date(ord)
      const nowTime = new Date()
      if (ordTime.getTime() > nowTime.getTime()) {
        return false
      } else {
        return true
      }
    },
    healthOverUrl() {
      jump(`/pages/message/healthOver/overLog?id=${this.personDetail.sendId}`)
    }
  }
}
</script>

<style lang='scss' scoped>
  .radius-white-box {
    height: 100%;
    scroll-view{
      height: 100%;
    }
    .message-box{
      &-content{
        color: #1A1A1A;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 16px;
        padding: 30rpx 30rpx;
      }
      border-bottom: 1px solid #E6E6E6;
    }
    .message-box-border {
      border-bottom: 1px solid #E6E6E6;
    }
    .message-box-item {
      padding: 30rpx 30rpx;
      font-size: 14px;

      .tilte {
        color: #B7B7B7
      }
      .current-status{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .record {
          color: #fff;
          background: #68C8ED;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 12px;
          float: right;
        }
      }
      .details {
        padding-top: 10rpx;
        font-size: 16px;
        .blood {
          color: #FF8080;
          &>view{
            margin-top: 10rpx;
          }
        }
        .power {
          color: #00C4FF;
          &>view{
            margin-top: 10rpx;
          }
        }
      }
      .type {
        color: #FF8080;
        font-size: 28rpx;
        font-weight: bold;
      }
      .power-msg{
        color: #00C4FF;
      }
    }
    .message-btn {
      padding: 0px 30rpx;
      margin-top: 40px;
      font-size: 30rpx;
      color: #657180;
      .stop-dispose{
        background: #ccc;
        color: #fff;
      }
    }
  }

  .call-user{
    position: absolute;
    right: 40rpx;
    top: 40rpx;
    z-index: 1000;
    width:60rpx;
    height:60rpx;
    img{
      height: 100%;
      width:100% ;
      border-radius: 50%;
    }
  }
</style>
