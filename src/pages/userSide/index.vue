<template>
  <view class="main">
    <top-bar />
    <bottom-nav-page type="user" :data-list="dataList" />
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
      dataList: [
        {
          pagePath: '/pages/case/index',
          text: '关心',
          icon: 'home',
          src: '/static/care/care.png',
          srcSelect: '/static/care/careAct.png'
        },
        {
          pagePath: '/pages/userMy/index',
          text: '我的',
          icon: 'home',
          src: '/static/userMy/my.png',
          srcSelect: '/static/userMy/myAct.png'
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
