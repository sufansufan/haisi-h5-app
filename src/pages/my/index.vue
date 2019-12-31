<template>
  <view class="my">
    <view class="my-top">
      <image :src="bgImgUrl" />
    </view>
    <view class="content">
      <view class="my-info-box" @click="personInfoSet">
        <view class="my-img-box">
          <image :src="userImg" />
        </view>
        <view class="info">
          <view class="name">
            {{ userInfo.userName }}
          </view>
          <view class="number">
            <view>账号：{{ userInfo.account }}</view>
            <view class="arrow-box">
              <image src="/static/my/rightArrow.png" />
            </view>
          </view>
        </view>
      </view>
      <template v-if="isUser">
        <view class="item" @click="toDoctor">
          <view>我的医生</view>
          <view class="arrow-box">
            <image src="/static/my/rightArrow.png" />
          </view>
        </view>
      </template>
      <view class="item" @click="toServicePack">
        <view>我的服务包</view>
        <view class="arrow-box">
          <image src="/static/my/rightArrow.png" />
        </view>
      </view>
      <view class="item" @click="toCareOrCommunity">
        <view>{{ isUser ? '我的关心' : '我的社区' }}</view>
        <view class="arrow-box">
          <image src="/static/my/rightArrow.png" />
        </view>
      </view>
      <template v-if="isUser">
        <view class="call" @click="call">
          <image src="/static/userMy/call.png" />
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import { jump, ToolTips } from '@/common/utils/index'
import { mapGetters } from 'vuex'
import { getCode } from '@/common/api/login'
export default {
  props: {
    isUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    bgImgUrl() {
      return this.isUser ? '/static/userMy/topBg.png' : '/static/my/myTop.png'
    },
    ...mapGetters(['userInfo']),
    userImg() {
      return this.userInfo.image ? this.userInfo.image : '/static/my/defaultUser.png'
    }
  },
  methods: {
    toServicePack() {
      this.isUser ? jump('/pages/userMy/userMyServicePack') : jump('/pages/my/myServicePack')
    },
    toCareOrCommunity() {
      this.isUser ? jump('/pages/userMy/myCare/index') : jump('/pages/my/myCommunity')
    },
    toDoctor() {
      jump('/pages/userMy/myDoctor')
    },
    // 个人信息设置
    personInfoSet() {
      jump(`/pages/userMy/personInfo/index?isUser=${this.isUser}`)
    },
    call(phone) {
      const { userId, doctorId } = this.userInfo
      const params = {
        userId,
        doctorId,
        type: 5
      }
      getCode(params).then(({ data }) => {
        ToolTips('呼叫成功', 'success')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .my {
    height: calc(100vh - 30rpx);
    position: relative;
    background: #f2f2f2;
    &-top {
      width: 100vw;
      height: 418rpx;
    }
    .content {
      position: absolute;
      top: 294rpx;
      left: 30rpx;
      width: calc(100vw - 60rpx);
      view {
        box-sizing: border-box;
      }
      &>view:not(.call) {
        background: #fff;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
      }
      .arrow-box {
        width: 14rpx;
        height: 26rpx;
      }
      .my-info-box {
        display: flex;
        height: 185rpx;
        padding: 30rpx 30rpx 34rpx;
        .my-img-box {
          width: 122rpx;
          height: 122rpx;
          background: #F2F2F2;
          // padding: 26rpx 24rpx;
          margin-right: 30rpx;
          border-radius: 10rpx;
        }
        .info {
          .name {
            font-size: 38rpx;
            line-height: 38rpx;
            margin-top: 22rpx;
          }
          .number {
            display: flex;
            justify-content: space-between;
            width: calc(100vw - 272rpx);
            font-size: 26rpx;
            line-height: 26rpx;
            color: #595959;
            margin-top: 24rpx;
          }
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        padding: 36rpx 30rpx;
        &>view:first-child {
          font-size: 30rpx;
          line-height: 38rpx;
        }
      }
      .call {
        width: 212rpx;
        height: 212rpx;
        margin: 0 auto;
        margin-top: 64rpx;
      }
    }
  }
</style>
