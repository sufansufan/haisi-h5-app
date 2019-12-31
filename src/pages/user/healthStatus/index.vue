<template>
  <main-container>
    <scroll-view :scroll-y="true">
      <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
        <view class="radius-white-box box-frame">
          <view class="box-frame-title padding-all--30">
            <view class="title-left">
              <img src="/static/user/rate-heart.png">
              <view>
                心率
                <view v-if="heartLow" class="set-warn">
                  {{ heartLow }}~{{ heartHigh }}
                </view>
                <view v-else class="set-warn">
                  暂未设置
                </view>
              </view>
            </view>
            <view class="title-right">
              <button class="mini-btn" :type="heartTime==1?'primary':'default'" size="mini" @click="switchTime('heart',1)">
                今天
              </button>
              <button class="mini-btn" :type="heartTime==2?'primary':'default'" size="mini" @click="switchTime('heart',2)">
                本周
              </button>
              <button class="mini-btn" :type="heartTime==3?'primary':'default'" size="mini" @click="switchTime('heart',3)">
                本月
              </button>
            </view>
          </view>
          <view>
            <view @click="jumpInfo('heart')">
              <box-frame :box-data="heartRate" />
            </view>
            <view v-if="hasDevice">
              <view class="now-time-show" @click="realtimeStatus">
                <view>
                  <span>实时状态详情</span>
                  <uni-icon type="arrowright" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="radius-white-box box-frame">
          <view class="box-frame-title padding-all--30">
            <view class="title-left">
              <img src="/static/user/rate-blood.png">
              <view>
                血压
                <view v-if="bloodLow" class="set-warn">
                  {{ bloodLow }}~{{ bloodHigh }}
                </view>
                <view v-else class="set-warn">
                  暂未设置
                </view>
              </view>
            </view>
            <view class="title-right">
              <button class="mini-btn" :type="bloodTime==1?'primary':'default'" size="mini" @click="switchTime('blood',1)">
                今天
              </button>
              <button class="mini-btn" :type="bloodTime==2?'primary':'default'" size="mini" @click="switchTime('blood',2)">
                本周
              </button>
              <button class="mini-btn" :type="bloodTime==3?'primary':'default'" size="mini" @click="switchTime('blood',3)">
                本月
              </button>
            </view>
          </view>
          <view>
            <view @click="jumpInfo('blood')">
              <box-frame :box-data="bloodRate" />
            </view>
            <view v-if="hasDevice">
              <view class="now-time-show" @click="realtimeStatus">
                <view>
                  <span>实时状态详情</span>
                  <uni-icon type="arrowright" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="radius-white-box box-frame">
          <view class="box-frame-title padding-all--30">
            <view class="title-left">
              <img src="/static/user/rate-sleep.png">
              <text>
                睡眠
              </text>
            </view>
            <view class="title-right">
              <button class="mini-btn" :type="sleepTime==2?'primary':'default'" size="mini" @click="switchTime('sleep',2)">
                本周
              </button>
              <button class="mini-btn" :type="sleepTime==3?'primary':'default'" size="mini" @click="switchTime('sleep',3)">
                本月
              </button>
            </view>
          </view>
          <box-frame :box-data="sleepRate" />
        </view>

        <view class="radius-white-box box-frame">
          <view class="box-frame-title padding-all--30">
            <view class="title-left">
              <img src="/static/user/rate-run.png">
              <text>
                运动
              </text>
            </view>
            <view class="title-right">
              <button class="mini-btn" :type="runTime==2?'primary':'default'" size="mini" @click="switchTime('run',2)">
                本周
              </button>
              <button class="mini-btn" :type="runTime==3?'primary':'default'" size="mini" @click="switchTime('run',3)">
                本月
              </button>
            </view>
          </view>
          <box-frame :box-data="runRate" />
        </view>
      </mescroll-uni>
    </scroll-view>
  </main-container>
</template>

<script>
import uniIcon from '@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue'
import MainContainer from '@/components/MainContainer'
import BoxFrame from './components/BoxFrame'
import MescrollUni from 'mescroll-uni' // npm安装的引入方式
import { heartRate, bloodRate, sleepRate, runRate, healthDetail } from '@/common/api/user'
import { jump } from '@/common/utils/index'
export default {
  components: {
    MainContainer,
    MescrollUni,
    BoxFrame,
    uniIcon
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      id: '',
      hasDevice: false,
      navName: '健康状态',
      heartTime: '1',
      bloodTime: '1',
      sleepTime: '2',
      runTime: '2',
      heartHigh: '',
      heartLow: '',
      bloodHigh: '',
      bloodLow: '',
      // 下拉刷新的常用配置
      downOption: {
        use: true,
        auto: true,
        textLoading: '更新中...'
      },
      // 上拉加载的常用配置
      upOption: {
        use: false
      },
      heartRate: {
        seriesData: [],
        categories: [],
        type: 'area',
        id: 'heart'
      },
      bloodRate: {
        seriesData: [],
        categories: [],
        type: 'area',
        id: 'blood'
      },
      sleepRate: {
        seriesData: [],
        categories: [],
        type: 'column',
        id: 'sleep',
        extra: 'stack'
      },
      runRate: {
        seriesData: [],
        categories: [],
        type: 'column',
        id: 'run'
      },
      heartTimeInter: null,
      bloodTimeInter: null,
      heart: [],
      bloodPressureHigh: [],
      bloodPressureLow: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getWarn()
    this.getHeart('', 'first')
    this.getBlood('', 'first')
    this.getSleep()
    this.getRun()
    if (this.heartTime === '1') {
      this.heartTimeInter = setInterval(() => {
        this.getHeart(this.heartTime)
      }, 5000)
    }
    if (this.bloodTime === '1') {
      this.bloodTimeInter = setInterval(() => {
        this.getBlood(this.bloodTime)
      }, 5000)
    }
  },
  beforeDestroy() {
    clearInterval(this.heartTimeInter)
    clearInterval(this.bloodTimeInter)
  },
  methods: {
    downCallback(mescroll) {
      setTimeout(() => {
        mescroll.endSuccess()
      }, 1000)
    },
    switchTime(type, time) {
      if (type === 'heart') {
        this.heartTime = time
        if (Number(time) === 1) {
          this.heartTimeInter = setInterval(() => {
            this.getHeart(time)
          }, 5000)
        } else {
          clearInterval(this.heartTimeInter)
        }
        this.heartRate.categories = []
        this.getHeart(time)
      }
      if (type === 'blood') {
        this.bloodTime = time
        if (Number(time) === 1) {
          this.bloodTimeInter = setInterval(() => {
            this.getBlood(time)
          }, 5000)
        } else {
          clearInterval(this.bloodTimeInter)
        }
        this.bloodRate.categories = []
        this.getBlood(time)
      }
      switch (type) {
        case 'sleep':
          this.sleepTime = time
          this.getSleep(time)
          break
        case 'run':
          this.runTime = time
          this.getRun(time)
          break
      }
    },
    jumpInfo(type) {
      jump('/pages/user/heartInfo/index?id=' + this.id + '&type=' + type)
    },
    // 获取心率
    getHeart(time, type) {
      const params = {
        type: 1,
        userId: this.id
      }
      time ? params.type = time : ''
      if (Number(this.heartTime) === 1 && type !== 'first') {
        params.startTime = this.heartRate.categories[this.heartRate.categories.length - 1] || ''
      } else {
        this.heartRate.categories = []
      }
      heartRate(params).then(res => {
        const data = res.data
        if (JSON.stringify(data) === '{}') {
          this.hasDevice = false
          return
        }
        this.hasDevice = true
        if (Number(this.heartTime) !== 1) {
          this.heart = []
        }
        const heartHigh = []
        const heartLow = []
        const categories = []
        data.map(item => {
          if (Number(params.type) === 1) {
            categories.push(item.timeOfDay)
          } else if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
          this.heart.push(item.heartRateAvg)
          heartHigh.push(item.heartRateMax)
          heartLow.push(item.heartRateMin)
        })
        if (Number(params.type) === 1) {
          this.heartRate.categories = [...this.heartRate.categories, ...categories]
        } else {
          this.heartRate.categories = categories
        }
        if (Number(params.type) === 1) {
          this.heartRate.seriesData = [
            {
              name: '心率',
              data: this.heart,
              color: '#1890ff',
              type: 'area'
            }
          ]
        } else {
          this.heartRate.seriesData = [
            {
              name: '最低心率',
              data: heartLow,
              color: '#63A9EE',
              type: 'area'
            },
            {
              name: '最高心率',
              data: heartHigh,
              color: '#FE5250',
              type: 'area'
            }
          ]
        }
      })
    },
    // 获取血压
    getBlood(time, type) {
      const params = {
        type: 1,
        userId: this.id
      }
      time ? params.type = time : ''
      if (Number(this.bloodTime) === 1 && type !== 'first') {
        params.startTime = this.bloodRate.categories[this.bloodRate.categories.length - 1] || ''
      } else {
        this.bloodRate.categories = []
        this.bloodPressureHigh = []
        this.bloodPressureLow = []
      }
      bloodRate(params).then(res => {
        const data = res.data
        const categories = []
        data.map(item => {
          this.bloodPressureHigh.push(item.diastolicPressureAvg)
          this.bloodPressureLow.push(item.systolicPressureAvg)
          if (Number(params.type) === 1) {
            categories.push(item.timeOfDay)
          } else if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
        })
        if (Number(params.type) === 1) {
          this.bloodRate.categories = [...this.bloodRate.categories, ...categories]
        } else {
          this.bloodRate.categories = categories
        }
        this.bloodRate.seriesData = [
          {
            name: '高压',
            data: this.bloodPressureHigh,
            color: '#FE5250',
            type: 'area'
          }, {
            name: '低压',
            data: this.bloodPressureLow,
            color: '#63A9EE',
            type: 'area'
          }
        ]
      })
    },
    // 获取睡眠
    getSleep(time) {
      const params = {
        type: 2,
        userId: this.id
      }
      time ? params.type = time : ''
      sleepRate(params).then(res => {
        const data = res.data
        const deepSleep = []
        const lightSleepTimeSum = []
        const categories = []
        data.map(item => {
          if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
          deepSleep.push(item.deepSleepTimeSum)
          lightSleepTimeSum.push(item.lightSleepTimeSum)
        })
        this.sleepRate.categories = categories
        this.sleepRate.seriesData = [
          {
            name: '浅睡眠',
            data: lightSleepTimeSum,
            color: '#63A9EE',
            type: 'column'
          },
          {
            name: '深睡眠',
            data: deepSleep,
            color: '#ffc809',
            type: 'column'
          }
        ]
      })
    },
    // 获取运动
    getRun(time) {
      const params = {
        type: 2,
        userId: this.id
      }
      time ? params.type = time : ''
      runRate(params).then(res => {
        const data = res.data
        const sport = []
        const categories = []
        data.map(item => {
          if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
          sport.push(item.stepCountSum)
        })
        this.runRate.categories = categories
        this.runRate.seriesData = [
          {
            name: '运动',
            data: sport,
            color: '#63A9EE',
            type: 'column'
          }
        ]
      })
    },
    // 获取警戒值
    getWarn() {
      const params = {
        userId: this.id
      }
      healthDetail(params).then(res => {
        const data = res.data
        this.heartLow = data.heartLow
        this.heartHigh = data.heartHigh
        this.bloodLow = data.bloodPressureLow
        this.bloodHigh = data.bloodPressureHigh
      })
    },
    // 实时状态详情查看
    realtimeStatus() {
      jump(`/pages/user/healthStatus/realtimeStatus?id=${this.id}`)
    }
  }
}
</script>

<style lang='scss' scoped>
  scroll-view {
    height: 100%;
  }
  .box-frame{
        margin-bottom: 20rpx;
        &-title{
            display: flex;
            justify-content: space-between;
            .title-left{
                font-size: 28rpx;
                color: #222;
                display: flex;
                align-items: center;
                img{
                    width: 35rpx;
                    height: 35rpx;
                    margin-right: 13rpx;
                }
                .set-warn{
                  display:inline-block;
                  margin-left: 10rpx;
                  color: #f56c6c;
                }
            }
            .title-right{
                button{
                    width: 103rpx;
                    height: 35rpx;
                    margin-left: 10rpx;
                    font-size: 28rpx;
                    line-height: 35rpx;
                    padding: 0;
                    border-radius: 5rpx;
                }
            }
        }
        &-content{
            width: 100%;
            // height: 435rpx;
        }
        .now-time-show{
          margin: 10rpx 30rpx 20rpx;
          border-top: 4rpx solid #eee;
          text-align: right;
          span{
            font-size: 22rpx;
            color: #657180;
          }
          .uni-icon{
            margin-left: 20rpx;
            margin-right: 30rpx;
          }
        }
    }
</style>
