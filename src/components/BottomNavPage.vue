<template>
  <view class="bottom-nav-page">
    <template v-if="type === 'doctor'">
      <template v-if="current === 0">
        <message />
      </template>
      <template v-if="current === 1">
        <user />
      </template>
      <template v-if="current === 2">
        <my />
      </template>
    </template>
    <template v-if="type === 'user'">
      <template v-if="current === 0">
        <care />
      </template>
      <template v-if="current === 1">
        <user-my />
      </template>
    </template>
    <BottomNav :current="current" :list="dataList" font-color="#101010" active-font-color="#45BDE9" @click="clickBottomNav" />
  </view>
</template>

<script>
import BottomNav from './BottomNav'
import Message from '@/pages/message/index'
import User from '@/pages/user/index'
import My from '@/pages/my/index'
import Care from '@/pages/care/index'
import UserMy from '@/pages/userMy/index'
export default {
  components: {
    BottomNav,
    Message,
    User,
    My,
    Care,
    UserMy
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current: 0
    }
  },
  created() {
    this.current = this.$route.query.current ? Number(this.$route.query.current) : 0
  },
  methods: {
    clickBottomNav(e) {
      this.current = e.select
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
