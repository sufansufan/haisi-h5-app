<template>
  <view class="list">
    <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
      <view class="one-box radius-white-box">
        <view class="title">
          预警处理
        </view>
        <view v-for="item in warningList[0].list" :key="item.id" class="content-box" @click="toMessageDetail(item.id,item.sendName)">
          <view>
            <image :src="selectImg(item)" />
            <view>
              <uni-badge :text="item.num" type="error" size="small" />
            </view>
          </view>
          <view class="content">
            <view class="left">
              <view class="info">
                <text class="name">
                  {{ item.sendName }}
                </text>
                <!-- <text class="right-word">
                  {{ item.handleStatus }}
                </text> -->
              </view>
              <view class="time">
                {{ item.testTime }}
              </view>
            </view>
            <view class="right">
              <view class="dis-result" :class="className[item.handleStatus]">
                {{ item.handleStatusName }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="!dataList.length" class="no-data">
        暂无数据
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollUni from 'mescroll-uni'
import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue'
import { jump } from '@/common/utils/index.js'
import { messageList, unreadMsgList } from '@/common/api/message'
import { mapGetters } from 'vuex'
export default {
  components: {
    MescrollUni,
    UniBadge
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
      },
      className: ['undisposed', 'disposing', 'disposed', 'disposing'],
      warningList: [
        {
          type: 1,
          title: '预警处理',
          list: []
        },
        {
          type: 2,
          title: '联系医生',
          list: []
        },
        {
          type: 3,
          title: '社区推送',
          list: []
        },
        {
          type: 4,
          title: '系统通知',
          list: []
        }
      ],
      dataList: [{
        sendName: '111',
        createTime: '222',
        content: '22222',
        status: 1
      },
      {
        sendName: '111',
        createTime: '222',
        content: '22222',
        status: 2
      }],
      imgSrc: {
        defaultImg: '/static/message/defaultImg.png',
        pushImg: '/static/message/pushImg.png',
        systemImg: '/static/message/systemImg.png'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])

  },
  created() {
    this.getData()
  },
  methods: {
    downCallback(mescroll) {
      // const params = {
      //   communityId: this.userInfo.communityId
      // }
      // messageList(params).then(({ code, data }) => {
      //   console.log(data)
      //   if (code === 200) {
      //     // this.dataList = data
      mescroll.endSuccess()

      //   }
      // })
    },
    // 查看预警详情
    toMessageDetail(id, name) {
      jump('/pages/message/personPush/index?id=' + id + '&name=' + name)
    },
    getData() {
      const params = {
        communityId: this.userInfo.communityId,
        handleStatus: '3'
      }
      // 预警消息
      messageList(params).then(({ data }) => {
        const list = data.records
        console.log(this.warningList[0])
        this.warningList[0].list = list
      })
      console.log(this.userInfo, 'wowoowow')
      // 联系医生
      const unReadParam = {
        userId: this.userInfo.userId
      }
      unreadMsgList(unReadParam).then(({ data }) => {
        console.log(data, '未读消息列表')
        this.warningList[1].list = data
      })
    },
    selectImg(item) {
      const { defaultImg, pushImg, systemImg } = this.imgSrc
      switch (item.type) {
        case 3:
          return pushImg
        case 4:
          return systemImg
        default:
          return item.image ? item.image : defaultImg
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .one-box{
    .title {
      width: 630rpx;
      height: 90rpx;
      line-height: 90rpx;
      color: #1A1A1A;
      background: #F2F2F2;
      font-size: 14px;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
      padding: 0rpx 30rpx;
    }
    .content-box {
      width: 630rpx;
      height: 92rpx;
      // border-radius: 20rpx;
      background: #fff;
      // margin-bottom: 20rpx;
      padding: 20rpx 30rpx;
      display: flex;
      font-size: 24rpx;
      color: #929292;
      line-height: 44rpx;
      &:not(:last-of-type){
        border-bottom: 1px solid #E6E6E6;
      }
        &>view:first-child {
          width: 92rpx;
          height: 92rpx;
          border-radius: 10rpx;
          background: #f2f2f2;
          margin-right: 20rpx;
          position: relative;
          & > view {
            position:absolute;
            top: -20rpx;
            right: -20rpx;
          }
        }
        .content {
          width: calc(100% - 112rpx);
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left{
            width: calc(100% - 125rpx);
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            line-height: 38rpx;
            .info{
              color: #010101;
              font-size: 30rpx;
            }
            .time{
              font-size: 24rpx;
              line-height: 24rpx;
              color: #B7B7B7;
              margin-top: 18rpx;
            }
          }
          .right{
            width: 125rpx;
            .dis-result{
              text-align: right;
              font-size: 30rpx;
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
        }
      }
  }
  .no-data {
    text-align: center;
    color: #ccc;
  }
}

</style>
