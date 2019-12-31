<template>
  <view class="user">
    <view class="user-top" />
    <view class="user-nav">
      <top-nav :top-nav-list="topNavList" />
    </view>
    <view class="user-content">
      <scroll-view>
        <phone-directory :phones="phones" @paramClick="paramClick" />
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopNav from '@/components/TopNav'
import phoneDirectory from '@/components/phone-directory/phone-directory.vue'
import { jump } from '@/common/utils/index'
import { getUserList } from '@/common/api/user'
import { mapGetters } from 'vuex'
export default {
  components: {
    TopNav,
    phoneDirectory
  },
  data() {
    return {
      topNavList: [
        {
          path: '/pages/user/add',
          imgUrl: '/static/user/add.png',
          title: '添加用户'
        },
        {
          path: '/pages/user/setHealth/index',
          imgUrl: '/static/user/health.png',
          title: '设置健康值'
        },
        {
          path: '/pages/user/totalCall/index',
          imgUrl: '/static/user/call.png',
          title: '累计呼叫'
        },
        {
          path: '/pages/user/totalWarn/index',
          imgUrl: '/static/user/warn.png',
          title: '累计超标'
        }
      ],
      phones: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userList'])
  },
  watch: {
    userList: {
      handler(data) {
        // this.getUserList()
        this.phones = data
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      const params = {
        doctorId: this.userInfo.userId
      }
      getUserList(params).then(res => {
        if (res.data['#']) {
          res.data['#'].map(item => {
            item.spell = '#'
          })
          const ss = res.data['#']
          delete res.data['#']
          res.data['#'] = ss
        }
        this.phones = res.data
      })
    },
    paramClick(e) {
      jump('/pages/user/userInfo/index?id=' + e.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  width: 100%;
  height: 100%;
  &-top {
    width: 100vw;
    height: 418rpx;
    background: url('/static/user/userTop.png') no-repeat;
    background-size: 100% 100%;
  }
  &-nav {
    position: absolute;
    top: 294rpx;
    left: 30rpx;
  }
  &-content{
    height: calc(100vh - 660rpx);
    margin: 60rpx 30rpx 148rpx;
    border-radius: 20rpx;
    overflow: hidden;
    scroll-view{
        height: 100%;
    }
  }
}
</style>
