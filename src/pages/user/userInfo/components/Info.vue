<template>
  <view class="radius-white-box">
    <view class="info-box">
      <view class="info-box-img">
        <img :src="info.image?info.image:'/static/user/defaultUser.png'" alt="">
      </view>
      <view class="info-box-right">
        <view class="right-name-img">
          <view>{{ info.nickName&&info.nickName!=' '?info.name+'('+info.nickName+')':info.name }}</view>
          <img :src="info.set==1?man:woman" alt="">
        </view>
        <text class="info-two">
          电话：{{ info.phone }}
        </text>
        <text class="info-two">
          身份证号：{{ info.idCard }}
        </text>
        <text class="info-two">
          住址：{{ info.address }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      woman: '/static/user/user-woman.png',
      man: '/static/user/user-man.png'
    }
  }
}
</script>
