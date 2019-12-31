<template>
  <main-container>
    <info :info="data" />
    <setting :id="data.id" :name="data.nickName" @getNewInfo="getNewInfo" />
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import Info from './components/Info'
import Setting from './components/Setting'
import { getUserInfo } from '@/common/api/user'
export default {
  components: {
    MainContainer,
    Info,
    Setting
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '返回',
      name: '',
      info: {},
      data: {}
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const params = {
        id: this.id
      }
      getUserInfo(params).then(res => {
        this.data = res.data
      })
    },
    getNewInfo() {
      this.getUserInfo()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
