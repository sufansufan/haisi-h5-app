<template>
  <view class="start-up">
    <swiper class="swiper" :indicator-dots="true" indicator-color="#DFE0E4" indicator-active-color="#42BAE9" @change="swiperChange">
      <swiper-item>
        <start-Page :data-list="dataList[0]" />
      </swiper-item>
      <swiper-item>
        <start-Page :data-list="dataList[1]" />
      </swiper-item>
      <swiper-item>
        <start-Page :data-list="dataList[2]" />
      </swiper-item>
    </swiper>
    <view>
      <text @click="goLogin">
        {{ goToLogin }} >
      </text>
    </view>
  </view>
</template>

<script>
import { closeCurrentJump } from '../../common/utils/index'
import StartPage from './components/StartPage'
import { mapGetters } from 'vuex'
export default {
  components: {
    StartPage
  },
  data() {
    return {
      dataList: [
        {
          url: '/static/startUp/one.png',
          title: '数据统计',
          dec: '直观掌握用户的健康实况'
        },
        {
          url: '/static/startUp/two.png',
          title: '消息提醒',
          dec: '及时接收用户的查诊请求'
        },
        {
          url: '/static/startUp/three.png',
          title: '套餐服务',
          dec: '致力于给用户最贴心的保障'
        }
      ],
      goToLogin: '跳过'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'signOut'])
  },
  created() {
    if (this.userInfo.accessToken && !this.signOut) {
      const { isdecoter } = this.userInfo
      if (isdecoter) {
        closeCurrentJump('/pages/index/index')
      } else {
        closeCurrentJump('/pages/userSide/index')
      }
    } else if (this.userInfo.accessToken && this.signOut) {
      if (process.env.TYPE === 'user') {
        closeCurrentJump('/pages/login/userIndex')
      } else {
        closeCurrentJump('/pages/login/index')
      }
    } else if (!this.userInfo.accessToken && !this.signOut) {
      return
    }
  },
  methods: {
    swiperChange(e) {
      e.target.current === 2 ? this.goToLogin = '立即体验' : this.goToLogin = '跳过'
    },
    goLogin() {
      // closeCurrentJump('/pages/login/userIndex')
      closeCurrentJump('/pages/login/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.start-up {
  width: 100vw;
  height: 100vh;
  position: relative;
  .swiper {
    width: 611rpx;
    height: 85vh;
    position: absolute;
    top: 148rpx;
    left: 70rpx;
  }
  & > view {
    width: 200rpx;
    text-align: right;
    font-size: 26rpx;
    color: #42BAE9;
    position: absolute;
    bottom: calc(15vh - 135rpx);
    right: 70rpx;
  }
}
</style>
