<template>
  <view>
    <main-container>
      <scroll-view :scroll-y="true" style="height: 100%">
        <view class="radius-white-box">
          <view class="style-box-all">
            <view class="message-box">
              <view class="message-box-content">
                超标类型：{{ personDetail.alarmTypeName }}
              </view>
            </view>
            <view class="message-box">
              <view class="message-box-content">
                超标数值：
                <text v-if="personDetail.alarmType != 1">
                  {{ personDetail.alarmValue }} {{ personDetail.alarmType === 2?'次/分钟':'mmhg' }}
                </text>
                <text v-else>
                  无
                </text>
              </view>
            </view>
            <view class="message-box">
              <view class="message-box-content">
                检测时间：{{ personDetail.testTime }}
              </view>
            </view>
            <view class="message-box no-border">
              <view class="message-box-content">
                处理状态：
                <text :class="className[personDetail.handleStatus]">
                  {{ personDetail.handleStatusName }}
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="doctor-box">
          <view class="message-box no-border">
            <view class="message-box-content">
              医生处理记录
            </view>
          </view>
          <view class="doctor-content">
            <view v-for="(item, index) in handleList" :key="index" class="doctor-content-box">
              <view class="dian" />
              <view class="content">
                <view class="title">
                  {{ item.handleTypeName }}
                </view>
                <view class="dec">
                  {{ item.handleContent }}
                </view>
                <view class="time">
                  {{ item.createTime }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
// import { jump } from '@/common/utils/index.js'
import { messageDetail } from '@/common/api/message.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainContainer
  },
  provide() {
    return {
      titleName: '记录详情'
    }
  },
  data() {
    return {
      personDetail: {},
      handleList: [],
      id: '',
      className: ['undisposed', 'disposing', 'disposed'],

      dataList: [
        {
          title: '设备检测到患者数据超标',
          dec: '李大爷，鉴于与您电话沟通过的，小李子我将于明天早上十点半为您上门诊断。',
          time: '2019-12-18  15:34:03'
        },
        {
          title: '设备检测到患者数据超标',
          dec: '李大爷，鉴于与您电话沟通过的，小李子我将于明天早上十点半为您上门诊断。',
          time: '2019-12-18  15:34:03'
        },
        {
          title: '设备检测到患者数据超标',
          dec: '李大爷，鉴于与您电话沟通过的，小李子我将于明天早上十点半为您上门诊断。',
          time: '2019-12-18  15:34:03'
        },
        {
          title: '设备检测到患者数据超标',
          dec: '李大爷，鉴于与您电话沟通过的，小李子我将于明天早上十点半为您上门诊断。',
          time: '2019-12-18  15:34:03'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.id = this.$route.query.id
    this.getWarningDetail()
  },
  methods: {
    getWarningDetail() {
      const params = {
        warnId: this.id
      }
      messageDetail(params).then(({ data }) => {
        console.log(data, 'xianqging')
        this.personDetail = data.communityWarnMsgVO
        this.handleList = data.communityWarnHandleVOList
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .radius-white-box {
    .style-box-all {
      padding: 0rpx 30rpx;
    }
  }
  .message-box{
    &-content{
      color: #1A1A1A;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      padding: 30rpx 0rpx;
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
    border-bottom: 1px solid #E6E6E6;
  }
  .no-border {
    border: 0;
  }
  .doctor-box {
    margin-top: 20rpx;
    background: #fff;
    border-radius: 30rpx;
    padding: 0rpx 30rpx 30rpx 30rpx;
  }
  .doctor-content {
    margin-top: 40rpx;
    font-size: 14px;
    &-box {
      padding-left: 20rpx;
      position: relative;
      padding-bottom: 20rpx;
      &:not(:last-of-type){
        border-left: 1px solid #E6E6E6;
      }
      .dian {
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
        background: #F74432;
        position: absolute;
        top: 0;
        left: -8rpx;
      }
      .content{
        width: 100%;
        position: relative;
        top: -8rpx;
      }
      .title {
        color: #000;
      }
      .dec {
        margin-left: 30rpx;
        color: #4D4D4D;
        font-size: 12px;
        margin-top: 10rpx;
      }
      .time {
        margin-top: 10rpx;
        color: #BDBDBD;
        font-size: 12px;
      }
    }
  }
</style>
