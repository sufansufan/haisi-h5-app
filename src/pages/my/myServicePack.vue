<template>
  <view class="my-service-pack">
    <main-container>
      <view class="content-box">
        <block v-for="val in packList" :key="val.id">
          <view v-if="val.type === 0">
            <view class="top-title">
              {{ val.name }}
            </view>
            <view class="price">
              <text class="left-title">
                价格：
              </text>
              <text class="right-content">
                {{ val.isDiscountedPrice === 1 ? val.discountedPrice : val.price }}元/年
              </text>
            </view>
            <view class="device price">
              <text class="left-title">
                描述：
              </text>
              <view class="right-content">
                {{ val.description }}
              </view>
            </view>
          </view>
          <view v-else>
            <view class="top-title">
              {{ val.name }}
            </view>
            <view class="price">
              <text class="left-title">
                价格：
              </text>
              <text class="right-content">
                {{ val.isDiscountedPrice === 1 ? val.discountedPrice : val.price }}元/年
              </text>
            </view>
            <view class="price">
              <text class="left-title">
                服务包状态：
              </text>
              <text class="right-content">
                {{ val.status === 1 ? '已停用' : '正在使用' }}
              </text>
            </view>
            <view class="service-content">
              <view class="title">
                服务内容：
              </view>
              <block v-if="val.itemList.length === 0" class="no-data">
                <text class="no-data">
                  无
                </text>
              </block>
              <block v-else>
                <view v-for="(v, index) in val.itemList" :key="index" class="item">
                  <view class="type">
                    {{ index+1 }}，&nbsp;{{ v.name }}
                  </view>
                  <view class="detail">
                    {{ v.description }}
                  </view>
                </view>
              </block>
            </view>
            <view class="device price">
              <text class="left-title">
                设备：
              </text>
              <view class="right-content">
                {{ deviceName(val.devices) }}
              </view>
            </view>
          </view>
        </block>
      </view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import { servicePackDetail, oneServiceDetail } from '@/common/api/servicePack.js'
import { userServicePackDetail } from '@/common/api/userSide.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainContainer
  },
  props: {
    isUser: {
      type: Boolean,
      default: false
    },
    serviceDetail: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: this.$route.query.id ? '服务包详情' : '我的服务包',
      packList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    deviceName() {
      return (devices) => {
        if (devices.length > 0) {
          const nameArr = []
          devices.map(item => {
            nameArr.push(item.name)
          })
          return nameArr.toString()
        } else {
          return '无'
        }
      }
    }
  },
  created() {
    this.getPackDetail()
  },
  methods: {
    getPackDetail() {
      if (this.isUser === true) {
        if (this.serviceDetail) {
          oneServiceDetail({ servicePackageId: this.$route.query.id }).then(({ data }) => {
            this.packList = [data]
          })
        } else {
          // 用户---我的服务包
          const id = this.$route.query.id
          userServicePackDetail({ userId: id === undefined ? this.userInfo.userId : id }).then(({ data }) => {
            this.packList = data.serviceList
          })
        }
      } else {
        // 医生---我的服务包
        servicePackDetail({ doctor_id: this.userInfo.userId }).then(({ data }) => {
          this.packList = data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-service-pack {
    .content-box {
      height: calc(100vh - 160rpx);
      overflow: auto;
      &>view {
        padding-top: 20rpx;
        &:first-child {
          padding: 0;
        }
        &>view {
          box-sizing: border-box;
          padding: 0 28rpx;
          font-size: 30rpx;
          background: #fff;
          border-bottom: 1px solid #E6E6E6;
        }
        .top-title {
          height: 85rpx;
          line-height: 85rpx;
          background: #2DA8D5;
          color: #fff;
          border-radius: 20rpx 20rpx 0 0;
        }
        .price {
          // height: 88rpx;
          line-height: 48rpx;
          padding-top: 18rpx;
          padding-bottom: 18rpx;
          .left-title {
            color: #1596C5;
          }
          .right-content {
            color: #222;
          }
        }
        .service-content {
          // height: calc(100vh - 333rpx);
          box-sizing: border-box;
          padding-top: 18rpx;
          .title {
            font-size: 30rpx;
            color: #1596C5;
            display: inline-block;
          }
          .no-data{
            color: #222;
            margin-bottom: 18rpx;
            display: inline-block;
          }

          .item {
            border-bottom: 1px solid #E6E6E6;
            &:last-child {
              border: none;
            }
            .type {
              padding-top: 28rpx;
              font-size: 30rpx;
              color: #222222;
            }
            .detail {
              padding: 20rpx 0 20rpx 50rpx;
              font-size: 26rpx;
              color: #ccc;
            }
          }
        }
        .device {
          border: none;
          border-radius: 0 0 20rpx 20rpx;
          display: flex;
          .left-title{
            flex-shrink: 0
          }
        }
      }
    }
  }
</style>
