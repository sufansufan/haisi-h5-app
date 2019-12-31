<template>
  <view class="top-bar-page">
    <top-bar :show="true" />
    <uniNavBar :left-text="titleName" left-icon="back" :right-icon="rightIcon" :fixed="true" color="#fff" @click-left="goBack" @click-right="rightClick" />
  </view>
</template>

<script>
import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar'
import TopBar from './TopBar'
import { goBack } from '@/common/utils/index'
export default {
  components: {
    uniNavBar,
    TopBar
  },
  inject: {
    titleName: {
      default: ''
    },
    rightIcon: {
      default: ''
    },
    rightClick: {
      default: () => {}
    }
  },
  methods: {
    goBack() {
      goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
