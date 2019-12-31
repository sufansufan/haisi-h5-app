<template>
  <view class="radius-white-box choose-user">
    <view class="box-frame-title padding-all--30">
      <view class="title-left">
        <img src="/static/care/user.png">
        <text>
          当前用户
        </text>
      </view>
    </view>
    <view class="box-frame-content user-add">
      <select v-model="selectUser" @change="changeUser">
        <option v-for="item in dataList" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </view>
  </view>
</template>

<script>
import { careUser } from '@/common/api/user'

export default {
  props: {
    id: {
      type: Number,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dataList: [],
      selectUser: ''
    }
  },
  mounted() {
    this.careUser()
  },
  methods: {
    careUser() {
      const params = {
        userId: this.id
      }
      careUser(params).then(res => {
        this.dataList = res.data
        this.selectUser = this.dataList[0].id
        this.$emit('changeChart', this.selectUser)
      })
    },
    changeUser() {
      this.$emit('changeChart', this.selectUser)
    }
  }
}
</script>

<style lang="scss" scoped>
    .choose-user{
        position: relative;
        margin-bottom: 20rpx;
        .box-frame-content{
            padding: 0 50rpx 30rpx;
            box-sizing: border-box;
            width: 600rpx;
            height: 88rpx;
            margin: 0 auto;
            background: #F7F7F7;
            border-radius: 60rpx;
            margin-bottom: 30rpx;
            line-height: 88rpx;
        }
    }
</style>
