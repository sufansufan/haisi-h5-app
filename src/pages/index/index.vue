<template>
  <view class="main">
    <top-bar />
    <bottom-nav-page type="doctor" :data-list="dataList" />
  </view>
</template>

<script>
import BottomNavPage from '@/components/BottomNavPage'
import TopBar from '@/components/TopBar'
export default {
  components: {
    BottomNavPage,
    TopBar
  },
  data() {
    return {
      dataList: [{
        pagePath: '/pages/message/index',
        text: '消息',
        icon: 'home',
        src: '/static/bottomNav/msg.png',
        srcSelect: '/static/bottomNav/msgAct.png'
      },
      {
        pagePath: '/pages/user/index',
        text: '用户',
        icon: 'home',
        src: '/static/bottomNav/use.png',
        srcSelect: '/static/bottomNav/useAct.png'
      },
      {
        pagePath: '/pages/my/index',
        text: '我的',
        icon: 'home',
        src: '/static/bottomNav/my.png',
        srcSelect: '/static/bottomNav/myAct.png'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main {

  min-height: 100vh;
  width: 100vw;
  background: #f8f8f8;
}
</style>
