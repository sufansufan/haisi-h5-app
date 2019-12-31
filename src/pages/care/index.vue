<template>
  <view class="care">
    <view class="care-top">
      <image src="/static/care/background.png" />
    </view>
    <view class="content">
      <scroll-view :scroll-y="true" style="padding-bottom:140rpx;box-sizing:border-box;">
        <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
          <choose-user :id="userInfo.userId" @changeChart="changeChart" />
          <view class="radius-white-box box-frame">
            <view class="box-frame-title padding-all--30">
              <view class="title-left">
                <img src="/static/user/rate-heart.png">
                <text>
                  心率
                </text>
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
            <view @click="jumpInfo('heart')">
              <box-frame :box-data="heartRate" />
            </view>
          </view>

          <view class="radius-white-box box-frame">
            <view class="box-frame-title padding-all--30">
              <view class="title-left">
                <img src="/static/user/rate-blood.png">
                <text>
                  血压
                </text>
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
            <view @click="jumpInfo('blood')">
              <box-frame :box-data="bloodRate" />
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
    </view>
  </view>
</template>

<script>
import MescrollUni from 'mescroll-uni' // npm安装的引入方式
import BoxFrame from '@/pages/user/healthStatus/components/BoxFrame.vue'
import ChooseUser from './components/chooseUser.vue'
import { heartRate, bloodRate, sleepRate, runRate } from '@/common/api/user'
import { jump } from '@/common/utils/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    MescrollUni,
    BoxFrame,
    ChooseUser
  },
  data() {
    return {
      id: '',
      navName: '健康状态',
      heartTime: '1',
      bloodTime: '1',
      sleepTime: '2',
      runTime: '2',
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
        seriesData: [
          {
            name: '心率',
            data: []
          }
        ],
        categories: [],
        type: 'area',
        id: 'heart'
      },
      bloodRate: {
        seriesData: [
          {
            name: '高压',
            data: [],
            color: '#FE5250'
          },
          {
            name: '低压',
            data: [],
            color: '#63A9EE'
          }
        ],
        categories: [],
        type: 'area',
        id: 'blood'
      },
      sleepRate: {
        seriesData: [
          {
            name: '睡眠',
            data: []
          }
        ],
        categories: [],
        type: 'column',
        id: 'sleep'
      },
      runRate: {
        seriesData: [
          {
            name: '运动',
            data: []
          }
        ],
        categories: [],
        type: 'column',
        id: 'run'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.id = this.userInfo.userId + ''
    // this.getHeart()
    // this.getBlood()
    // this.getSleep()
    // this.getRun()
  },
  methods: {
    downCallback(mescroll) {
      setTimeout(() => {
        mescroll.endSuccess()
      }, 1000)
    },
    switchTime(type, time) {
      switch (type) {
        case 'heart':
          this.heartTime = time
          this.getHeart(time)
          break
        case 'blood':
          this.bloodTime = time
          this.getBlood(time)
          break
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
      jump('/pages/user/heartInfo/index?id=' + this.userId + '&type=' + type)
    },
    // 获取心率
    getHeart() {
      const params = {
        type: this.heartTime,
        userId: this.userId
      }
      heartRate(params).then(res => {
        const data = res.data
        this.heartRate.categories = []
        const heart = []
        const heartHigh = []
        const heartLow = []
        const categories = []
        data.map(item => {
          if (Number(params.type) === 1) {
            categories.push(item.hourOfDay)
          } else if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
          heart.push(item.heartRateAvg)
          heartHigh.push(item.heartRateMax)
          heartLow.push(item.heartRateMin)
        })
        this.heartRate.categories = categories
        if (params.type == 1) {
          this.heartRate.seriesData = [
            {
              name: '心率',
              data: heart,
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
    getBlood() {
      const params = {
        type: this.bloodTime,
        userId: this.userId
      }
      bloodRate(params).then(res => {
        const data = res.data
        const bloodPressureHigh = []
        const bloodPressureLow = []
        const categories = []
        data.map(item => {
          bloodPressureHigh.push(item.diastolicPressureAvg)
          bloodPressureLow.push(item.systolicPressureAvg)
          if (Number(params.type) === 1) {
            categories.push(item.hourOfDay)
          } else if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
        })
        this.bloodRate.categories = categories
        this.bloodRate.seriesData = [
          {
            name: '高压',
            data: bloodPressureHigh,
            color: '#FE5250',
            type: 'area'
          }, {
            name: '低压',
            data: bloodPressureLow,
            color: '#63A9EE',
            type: 'area'
          }
        ]
      })
    },
    // 获取睡眠
    getSleep() {
      const params = {
        type: this.sleepTime,
        userId: this.userId
      }
      sleepRate(params).then(res => {
        const data = res.data
        const sleep = []
        const deepSleep = []
        const lightSleepTimeSum = []
        const categories = []
        const sleepTurnCountSum = []
        data.map(item => {
          if (Number(params.type) === 2) {
            categories.push(item.dayOfWeek)
          } else {
            categories.push(item.startTime.slice(5, 10))
          }
          sleep.push(item.sleepTimeSum)
          deepSleep.push(item.deepSleepTimeSum)
          lightSleepTimeSum.push(item.lightSleepTimeSum)
          sleepTurnCountSum.push(item.sleepTurnCountSum)
        })
        this.sleepRate.categories = categories
        this.sleepRate.seriesData = [
          {
            name: '睡眠时长',
            data: sleep,
            color: '#63A9EE',
            type: 'column'
          },
          {
            name: '翻身',
            data: sleepTurnCountSum,
            color: '#2fc25b',
            type: 'column'
          },
          {
            name: '浅睡眠',
            data: lightSleepTimeSum,
            color: '#efe5c2',
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
    getRun() {
      const params = {
        type: this.runTime,
        userId: this.userId
      }
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
    changeChart(id) {
      this.userId = id
      this.getHeart(this.heartTime)
      this.getBlood(this.bloodTime)
      this.getSleep(this.sleepTime)
      this.getRun(this.runTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  .care {
    position: relative;
    background: #f8f8f8;
    height: 100vh;
    &-top {
      width: 100vw;
      height: 418rpx;
    }
    .content{
      height: calc(100% - 324rpx);
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      top: 293rpx;
      border-radius: 20rpx;
      // padding-bottom: 140rpx;
      scroll-view {
        height: 100%;
      }
    }
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
    }
</style>
