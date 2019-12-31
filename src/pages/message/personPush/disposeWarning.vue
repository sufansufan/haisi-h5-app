<template>
  <view>
    <main-container>
      <view class="radius-white-box">
        <scroll-view :scroll-y="true">
          <view class="style-box-all">
            <view>
              <view class="uni-title">
                请填写处理措施
              </view>
              <view class="uni-textarea input-box">
                <textarea v-model="info.handleContent" placeholder-style="color:#ccc" placeholder="请填写处理措施" />
              </view>
            </view>
            <view v-if="params.type === '2'">
              <view>
                <view class="uni-title">
                  您是否与患者约定了查诊时间？
                </view>
                <view class="check-box">
                  <radio-group name="checkbox" @change="radioChange">
                    <label>
                      <radio ref="yesord" value="1" :checked="info.isTrue==='1'" /><text>是</text>
                    </label>
                    <label>
                      <radio ref="noord" value="2" :checked="info.isTrue==='2'" /><text>否</text>
                    </label>
                  </radio-group>
                </view>
              </view>
              <view>
                <view class="uni-title">
                  查诊日期为
                </view>
                <view class="check-time" :class="{'not-handle':info.isTrue ==='2'}">
                  <view class="uni-list-cell-db">
                    <picker mode="date" :value="info.date" :start="startDate" :disabled="info.isTrue ==='2'" @change="bindDateChange">
                      <view class="uni-input">
                        {{ info.date }}
                      </view>
                    </picker>
                  </view>
                </view>
              </view>
              <view>
                <view class="uni-title">
                  查诊时间为
                </view>
                <view class="check-time" :class="{'not-handle':info.isTrue ==='2'}">
                  <view class="uni-list-cell-db">
                    <picker mode="time" :value="info.time" :start="info.time" end="21:01" :disabled="info.isTrue ==='2'" @change="bindTimeChange">
                      <view class="uni-input">
                        {{ info.time }}
                      </view>
                    </picker>
                  </view>
                </view>
              </view>
            </view>
            <view class="save-btn" @click="confimWarning">
              确认并提交
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
// import MescrollUni from 'mescroll-uni' // npm安装的引入方式
import { jump } from '@/common/utils/index'
import { mapGetters } from 'vuex'
import { warningHandle } from '@/common/api/message.js'

export default {
  components: {
    // MescrollUni,
    MainContainer
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    const currentDate = this.getDate({
      format: true
    })
    const currentTime = this.getNowTime()
    return {
      params: '',
      navName: '预警处理措施',
      info: {
        handleContent: '',
        isTrue: '1',
        date: currentDate,
        time: currentTime
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    startDate() {
      return this.getDate('start')
    }
    // endDate() {
    //   return this.getDate('end')
    // }
  },
  created() {
    this.params = this.$route.query
  },
  methods: {
    getDate(type) {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      // if (type === 'end') {
      //   year = year + 2
      // }
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
    getNowTime() {
      const date = new Date()
      const hours = date.getHours()
      let min = date.getMinutes()
      min = min > 9 ? min : '0' + min
      return `${hours}:${min}`
    },
    bindDateChange: function(e) {
      this.info.date = e.target.value
    },
    bindTimeChange: function(e) {
      this.info.time = e.target.value
    },
    confimWarning() {
      // jump(`/pages/message/submitResult/index`)
      console.log(this.params.type, this.params.type === '2')
      const params = {
        doctorId: this.params.doctorId,
        handleType: this.params.type === '2' ? '3' : this.params.type,
        warnId: this.params.id,
        handleContent: this.info.handleContent
      }
      if (this.info.isTrue === '1' && this.params.type === '2') {
        params.orderTime = this.info.date + ' ' + this.info.time + ':00'
      }
      console.log(params)
      warningHandle(params).then(res => {
        console.log(res)
        if (res.success) {
          jump(`/pages/message/submitResult/index?type=success`)
        }
      })
    },
    radioChange(evt) {
      console.log(evt.target.value)
      this.info.isTrue = evt.target.value
    }
  }
}
</script>

<style lang='scss' scoped>
  .radius-white-box {
    height: 100%;
    scroll-view{
      height: 100%;
      .style-box-all{
        padding: 0 30rpx;
        box-sizing: border-box;
        .uni-title{
          color: #191919;
          font-size: 30rpx;
          margin: 40rpx 0 20rpx;
        }
        .input-box{
          background: #F7F7F7;
          padding: 10rpx;
          textarea{
            font-size: 28rpx;
          }
        }
        .check-box{
          uni-label{
            margin-right: 20rpx;
          }
        }
        .check-time{
          font-size: 26rpx;
          width: 100%;
          height: 72rpx;
          background: #F7F7F7;
          text-align: center;
          line-height: 72rpx;
          border-radius: 8rpx;
        }
        .not-handle{
          color: #ccc;
        }
      }
    }
  }
</style>
