<template>
  <view>
    <main-container>
      <view class="radius-white-box">
        <scroll-view :scroll-y="true">
          <view class="style-box-all">
            <view v-if="type==='success'" class="result-img">
              <img src="/static/result/correct.png">
            </view>
            <view v-else class="result-img">
              <img src="/static/result/error.png">
            </view>
            <view class="result-msg">
              <span v-if="type==='success'">已完成提交</span>
              <span v-else>
                提交失败
                <br>
                请重新提交
              </span>
            </view>
          </view>
        </scroll-view>
      </view>
    </main-container>
  </view>
</template>

<script>
// 预警处理措施
import MainContainer from '@/components/MainContainer'
export default {
  components: {
    MainContainer
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '预警处理措施',
      type: ''
    }
  },
  computed: {

  },
  created() {
    this.type = this.$route.query.type
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
  .radius-white-box {
    height: 100%;
    scroll-view{
      height: 100%;
      .result-img{
        width: 256rpx;
        height: 256rpx;
        margin: 157rpx auto 90rpx;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .result-msg{
        font-size: 30rpx;
        text-align: center;
        line-height: 73rpx;
      }
    }
  }
</style>
