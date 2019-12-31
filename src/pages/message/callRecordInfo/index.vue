<template>
  <view class="call-record-info">
    <main-container>
      <view class="radius-white-box">
        <view class="record-info-content">
          <view class="list">
            <view>
              <view v-for="(val, index) in dataList" :key="index">
                <view class="left" :style="val.isRead==1?'color:#BDBDBD':''">
                  {{ val.createTime }}
                </view>
                <view class="right">
                  {{ val.sendName }} 呼入
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </main-container>
    <view v-if="dataList.length>0" class="call-user" @click="callUser">
      <!-- <img src="/static/user/call.png" alt=""> -->
      <view>
        <uni-icon type="phone-filled" size="20" color="#868214" />
      </view>
      <view class="name">
        {{ dataList && dataList[0].sendName }}
      </view>
    </view>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import uniIcon from '@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue'
import { getDetail } from '@/common/api/common.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    MainContainer,
    uniIcon
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '呼叫记录',
      sendId: '',
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.sendId = this.$route.query.id
    this.getList()
  },
  methods: {
    // 获取呼叫列表
    getList() {
      const params = {
        type: 1,
        userId: this.userInfo.userId,
        sendId: this.sendId
      }
      getDetail(params).then(res => {
        const data = res.data
        this.dataList = data
      })
    },
    callUser() {
      let phone = ''
      if (this.dataList.length > 0) {
        phone = this.dataList[0].phone
      }
      uni.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .call-record-info {
    .radius-white-box{
          height: 100%;
          overflow: hidden;
          overflow-y: auto;
          .record-info-content {
              box-sizing: border-box;
              &>view {
                  background: #fff;
                  border-radius: 20rpx;
              }
              .phone-address {
                  height: 229rpx;
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
                      .left{
                        color:#000000;
                      }
                      .right {
                          color: #BDBDBD;
                      }
                  }
              }
          }
      }
    }
    .call-user{
      position: absolute;
      right: 40rpx;
      top: 55rpx;
      z-index: 1000;
      width: 200rpx;
      height:60rpx;
      display: flex;
      justify-content: flex-end;
      & > view:first-child {
        transform: rotate(75deg)
      }
      .name {
        color: #fff;
        margin-top: 2px;
      }
    }
  }
</style>
