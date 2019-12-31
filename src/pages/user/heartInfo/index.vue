<template>
  <view>
    <main-container>
      <view class="heart">
        <view class="heart-title">
          <img :src="img">
          本月{{ name }}详情
        </view>
        <view class="heart-content">
          <table>
            <thead>
              <tr>
                <td>时间</td>
                <template v-if="type === 'heart'">
                  <td>最高值</td>
                  <td>最低值</td>
                </template>
                <template v-else>
                  <td>舒张压最高值</td>
                  <td>舒张压最低值</td>
                  <td>收缩压最低值</td>
                  <td>收缩压最低值</td>
                </template>
              </tr>
            </thead>
          </table>
          <view class="tbody">
            <table>
              <tbody>
                <tr v-for="(item, index) in dataList" :key="index">
                  <td class="time">
                    {{ item.dayOfMonth }}
                  </td>
                  <template v-if="type === 'heart'">
                    <td class="high">
                      {{ item.heartRateMax }}
                    </td>
                    <td class="low">
                      {{ item.heartRateMin }}
                    </td>
                  </template>
                  <template v-else>
                    <td class="high">
                      {{ item.diastolicPressureMax }}
                    </td>
                    <td class="low">
                      {{ item.diastolicPressureMin }}
                    </td>
                    <td class="high">
                      {{ item.systolicPressureMax }}
                    </td>
                    <td class="low">
                      {{ item.systolicPressureMin }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </view>
        </view>
      </view>
    </main-container>
  </view>
</template>

<script>

import MainContainer from '@/components/MainContainer'
import { heartRate, bloodRate } from '@/common/api/user'
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
      navName: '返回',
      name: '心率',
      img: '',
      id: '',
      type: '',
      dataList: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.type == 'heart') {
      this.name = '心率'
      this.img = '/static/user/rate-heart.png'
    } else {
      this.name = '血压'
      this.img = '/static/user/rate-blood.png'
    }
    this.getInfo()
  },
  methods: {
    getInfo() {
      const params = {
        type: 3,
        userId: this.id
      }
      if (this.type === 'heart') {
        this.getHeart(params)
      } else {
        this.getBlood(params)
      }
    },
    getHeart(params) {
      heartRate(params).then(res => {
        this.dataList = res.data
      })
    },
    getBlood(params) {
      bloodRate(params).then(res => {
        this.dataList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .heart {
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 30rpx 18rpx;
        box-sizing: border-box;
        &-title{
              font-size: 28rpx;
              font-weight:400;
              color:rgba(34,34,34,1);
              img{
                  height: 35rpx;
                  width: 35rpx;
                  margin: -8rpx 10rpx;
              }
        }
        &-content{
            table{
                width: 100%;
                text-align: center;
                border-collapse: collapse;
                td{
                    width: 20%;
                }
                thead{
                    font-size: 28rpx;
                    color: #4B608E;
                    tr{
                        height: 90rpx;
                    }
                }
                tbody{
                    font-size: 24rpx;
                    .time{
                        color: #101010;
                    }
                    .high{
                        color: #F74432;
                    }
                    .low{
                        color: #2BC59F;
                    }
                    tr{
                        height: 90rpx;
                        &:nth-child(odd){
                            background:rgba(248,248,248,1);
                        }

                    }
                }
            }
            .tbody{
                height: calc(100vh - 340rpx);
                overflow: hidden;
                overflow-y: auto;
            }
        }
    }
</style>
