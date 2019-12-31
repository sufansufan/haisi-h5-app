<template>
  <view class="box">
    <main-container>
      <view class="choosed-service">
        <view class="left">
          <view class="img">
            <image src="/static/my/11.png" />
          </view>
        </view>
        <view class="right">
          {{ isBeingUseTip }}
        </view>
      </view>
      <scroll-view v-if="beingUse.length>0" :scroll-y="true">
        <!-- <view v-for="(val, index) in beingUse" :key="val.id" class="pack" :class="[val.choose ? 'using' : 'un-used']"> -->
        <view class="pack using">
          <view class="top">
            <view class="left">
              {{ beingUse[0].name }}
            </view>
            <!-- <view class="right">
              <view class="solid" />
            </view> -->
          </view>
          <view class="bottom">
            <template>
              <view class="time">
                有效时间：{{ transformTime( beingUse[0].createTime) }} ~ {{ transformTime( beingUse[0].expiredTime) }}
              </view>
            </template>
            <view>
              {{ beingUse[0].description }}
            </view>
          </view>
          <view class="serviceDetail" @click="serviceDetail( beingUse[0].id)">
            查看详情
          </view>
        </view>
      </scroll-view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import { goBack, ToolTips, jump } from '@/common/utils/index'
import { mapGetters } from 'vuex'
import { getDoctorServiceList, beingUseServicepack, bindServicepack } from '@/common/api/user'

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
      navName: '服务包绑定',
      serviceId: '',
      packList: [], // 查出来的所有的服务包
      beingUse: [], // 正在使用的服务包
      isBeingUseTip: '暂无使用中的服务包'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    packListData() {
      // const arr1 = this.packList.filter(item => item.id !== this.beingUse.id)
      // const arr2 = this.packList.filter(item => item.id === this.beingUse.id)
      // const result = [...arr2, ...arr1]
      // const arr1 = this.packList.filter(item => !this.beingUse.some(choose => {
      //   if (choose.id === item.id) {
      //     choose.choose = true
      //     return true
      //   }
      // }))
      const result = [...this.beingUse]
      return result
    }
  },
  created() {
    this.getBeingUseService()
    // this.getServiceList()
  },
  methods: {
    back() {
      goBack()
    },
    // 获取医生服务包列表
    getServiceList() {
      getDoctorServiceList({
        doctor_id: this.userInfo.userId
      }).then(({ data }) => {
        this.packList = data
      })
    },
    // 获取正在使用的服务包
    getBeingUseService() {
      beingUseServicepack({
        userId: this.$route.query.id
      }).then(({ data }) => {
        if (data.length === 0) {
          this.isBeingUseTip = '暂无使用中的服务包'
        } else {
          this.beingUse = data
          this.isBeingUseTip = `正在使用${this.beingUse.length}个服务包`
        }
      })
    },
    // 绑定服务包
    bindService(index) {
      const chooseId = this.packListData[index].id
      const idIndex = this.beingUse.findIndex(v => v.id === chooseId)
      console.log(chooseId, idIndex)
      if (idIndex !== -1) {
        ToolTips('该服务包正在使用，无需重复绑定')
        return
      }
      const params = {
        userId: this.$route.query.id,
        serviceId: chooseId
      }
      bindServicepack(params).then(res => {
        ToolTips(res.msg)
        this.getBeingUseService()
      })
    },
    // 查看详情
    serviceDetail(id) {
      jump(`/pages/user/userInfo/servicePackDetail?id=${id}`)
      // pages/user/userInfo/servicePackDetail
    },
    transformTime(val) {
      return val.split(' ')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  $packBgRedStart: #FF8080;
  $packBgRedEnd: #F15956;
  $packBgBlueStart: #51A6EE;
  $packBgBlueEnd: #4084CD;
  $packBgYellowStart: #F1C237;
  $packBgYellowEnd: #F8984B;
  .red-bg {
    background: -webkit-linear-gradient(left, $packBgRedStart, $packBgRedEnd);
    background: -o-linear-gradient(right,$packBgRedStart, $packBgRedEnd);
    background: -moz-linear-gradient(right,$packBgRedStart, $packBgRedEnd);
    background: linear-gradient(to right,$packBgRedStart, $packBgRedEnd);
  }
  .blue-bg {
    background: -webkit-linear-gradient(left, $packBgBlueStart, $packBgBlueEnd);
    background: -o-linear-gradient(right,$packBgBlueStart, $packBgBlueEnd);
    background: -moz-linear-gradient(right,$packBgBlueStart, $packBgBlueEnd);
    background: linear-gradient(to right,$packBgBlueStart, $packBgBlueEnd);
  }
  .yellow-bg {
    background: -webkit-linear-gradient(left, $packBgYellowStart, $packBgYellowEnd);
    background: -o-linear-gradient(right,$packBgYellowStart, $packBgYellowEnd);
    background: -moz-linear-gradient(right,$packBgYellowStart, $packBgYellowEnd);
    background: linear-gradient(to right,$packBgYellowStart, $packBgYellowEnd);
  }
  .box {
    .choosed-service {
      height: 134rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      background: #fff;
      border-radius: 20rpx;
      box-sizing: border-box;
      padding: 40rpx 30rpx 46rpx;
      .left {
        display: flex;
        align-items: flex-end;
        .img {
          width: 46rpx;
          height: 46rpx;
        }
        &>view:last-child {
          margin-left: 20rpx;
          font-size: 30rpx;
          color: #101010;
        }
      }
      .right {
        font-size:30rpx;
        color: #52CBE6;
      }
    }
    .pack {
      box-sizing: border-box;
      padding: 0 40rpx 16rpx;
      border-radius: 15rpx;
      color: #FEFEFE;
      &:not(:last-of-type){
        margin-bottom: 20rpx;
      }
      .top {
        height: 113rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255,255,255,.2);
        .left {
          font-size: 32rpx;
          // color: #FEFEFE;
          line-height: 112rpx;
        }
        .right {
          width: 34rpx;
          height: 34rpx;
          border-radius: 50%;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .bottom {
        margin: 30rpx 0 40rpx;
        font-size: 24rpx;
        line-height: 38rpx;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        .time {
          margin-bottom: 20rpx;
        }
      }
      .serviceDetail{
        font-size: 24rpx;
        text-align: right;
      }
    }
    .using {
      background: -webkit-linear-gradient(left, $packBgRedStart, $packBgRedEnd);
      background: -o-linear-gradient(right,$packBgRedStart, $packBgRedEnd);
      background: -moz-linear-gradient(right,$packBgRedStart, $packBgRedEnd);
      background: linear-gradient(to right,$packBgRedStart, $packBgRedEnd);
      .solid {
        width: 18rpx;
        height: 18rpx;
        border-radius: 50%;
        background: #52CBE6;
      }
    }
    .un-used {
      background: #ccc;
    }
  }

  .main-container{
    .content{
      border-radius: none;
      scroll-view{
        height: calc(100% - 154rpx);
        margin-top: 20rpx;
      }
    }
  }
</style>
