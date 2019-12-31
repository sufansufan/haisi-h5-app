<template>
  <view class="box-frame-content">
    <block v-for="(item, index) in arr" :key="index">
      <u-charts :ref="item.id" :scroll="item.opts.enableScroll" :show="canvas" :canvas-id="item.id" :chart-type="item.chartType" :extra-type="item.extraType" :c-width="cWidth" :c-height="cHeight" :opts="item.opts" />
    </block>
  </view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.vue'
export default {
  components: { uCharts },
  props: {
    boxData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      canvas: true,
      cWidth: '',
      cHeight: '',
      arr: []
    }
  },
  watch: {
    boxData: {
      handler() {
        this.init()
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.cWidth = uni.upx2px(690)
      this.cHeight = uni.upx2px(400)
      this.getServerData()
    },
    getServerData() {
      var Chart = { enableScroll: true, unit: '' }
      Chart.categories = this.boxData.categories
      Chart.series = this.boxData.seriesData
      var serverData = [
        {
          opts: Chart,
          chartType: this.boxData.type,
          extraType: this.boxData.extra,
          id: this.boxData.id
        }
      ]
      this.arr = serverData
      if (this.$refs[this.arr[0].id]) {
        this.change()
      }
      return this.arr
    },
    change() {
      this.$refs[this.arr[0].id][0].changeData(this.arr[0].id, this.arr[0].opts)
    }
  }
}
</script>
