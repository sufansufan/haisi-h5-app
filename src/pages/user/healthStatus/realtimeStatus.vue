<template>
  <main-container>
    <scroll-view :scroll-y="true">
      <mescroll-uni :down="downOption" :up="upOption" :fixed="false" @down="downCallback">
        <view>
          <realtime-box :infos="heartRate" />
          <realtime-box :infos="blood" />
        </view>
      </mescroll-uni>
    </scroll-view>
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import MescrollUni from 'mescroll-uni' // npm安装的引入方式
import RealtimeBox from './components/RealtimeBox' // npm安装的引入方式
import { realTimeHeartBlood } from '@/common/api/user'

export default {
  components: {
    MainContainer,
    MescrollUni,
    RealtimeBox
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      id: '',
      num: 0,
      myInterval: '', // 轮询血压心率的计时器 需销毁
      nowHeartBlood: '', // 血压心率实时数据

      navName: '实时状态详情',
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
        title: '实时心率',
        type: 'heart',
        unit: '次/分钟',
        time: '2019-12-18 15:40:03',
        value: '282'
      },
      blood: {
        title: '实时血压',
        type: 'blood',
        unit: 'mmhg',
        time: '2019-12-18 15:40:03',
        value: '116/72'
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    // 页面刚进去先获取一次 当前血压心率
    this.getHeartBlood()
    // 然后执行每5秒一次 查询血压心率
    this.realtimeAjax()
  },
  destroyed() {
    // 组件销毁后 销毁ajax轮询
    clearInterval(this.myInterval)
  },
  methods: {
    downCallback(mescroll) {
      setTimeout(() => {
        mescroll.endSuccess()
      }, 1000)
    },
    // js轮询  获取实时心率和血压
    async getHeartBlood() {
      const that = this
      that.num++
      if (that.num < 5) {
        const { data } = await realTimeHeartBlood({ userId: that.id })
        if (JSON.stringify(data) === '{}') {
          clearInterval(that.myInterval)
        } else {
          that.heartRate.value = data.heartRate
          that.heartRate.time = data.heartRateMeasureTime
          that.blood.value = `${data.diastolicPressure}/${data.systolicPressure}`
          that.blood.time = data.bloodPressureMeasureTime
        }
      } else {
        clearInterval(that.myInterval)
      }
    },
    // js轮询  获取实时心率和血压
    realtimeAjax() {
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          this.getHeartBlood() // 调用接口的方法
        }, 1)
      }, 1000 * 5)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
