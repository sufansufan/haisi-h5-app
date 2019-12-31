<template>
  <view>
    <main-container>
      <push-box :list="pushList" :get-list="getList" />
    </main-container>

    <view class="call-user" @click="callUser">
      <img src="/static/user/call.png" alt="">
    </view>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import PushBox from './components/PushInfo.vue'
import { getListData } from '@/common/api/common.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    MainContainer,
    PushBox
  },
  provide() {
    return {
      titleName: this.$route.query.type === '3' ? '社区推送' : '系统通知'
    }
  },
  data() {
    return {
      type: '',
      pushList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.type = this.$route.query.type
    // this.getList()
  },
  methods: {
    // 获取社区推送列表
    getList(mescroll) {
      const params = {
        type: this.type,
        size: 9999999,
        userId: this.userInfo.userId
      }
      getListData(params).then(res => {
        const data = res.data
        this.pushList = data.records
        mescroll.endSuccess()
      })
    },
    callUser() {
      let phone = ''
      if (this.pushList.length > 0) {
        phone = this.pushList[0].phone
      }
      uni.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
}
</script>

<style lang="scss" scoped>

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
