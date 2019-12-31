<template>
  <view>
    <setting-item :id="id" :data-list="dataList" :name="name" @getNewInfo="getNewInfo" />
  </view>
</template>

<script>
import SettingItem from './SettingItem'
export default {
  components: {
    SettingItem
  },
  props: {
    id: {
      type: Number,
      default() {
        return 0
      }
    },
    name: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dataList: [
        {
          name: '设置备注'
        },
        {
          name: '设置健康值',
          path: '/pages/user/setHealthNumber/index'
        },
        {
          name: '健康状态',
          img: [
            '/static/user/status-heart.png',
            '/static/user/status-doctor.png',
            '/static/user/status-sleep.png',
            '/static/user/status-foot.png'
          ],
          path: '/pages/user/healthStatus/index'
        },
        {
          name: '服务包绑定',
          path: '/pages/user/userInfo/servicePack'
        },
        {
          name: '预警记录',
          path: '/pages/message/healthOver/overLog'
        },
        {
          name: '联系记录',
          path: '/pages/message/callRecordInfo/index'
        }
      ]
    }
  },
  methods: {
    getNewInfo() {
      this.$emit('getNewInfo')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
