<template>
  <view class="total-call">
    <main-container>
      <view class="total-call-title radius-white-box">
        <img :src="title=='呼叫'?callImg:warnImg">
        <view class="total-call-title-title">
          当前已{{ title=='呼叫'?'处理查诊呼叫':title }}次数：
          <view class="total-count">
            {{ data.grandDealNum }}
          </view>
          次
        </view>
      </view>
      <view class="heart">
        <view class="heart-title">
          <img src="/static/user/total-call-has.png">
          本月累计{{ title }}
        </view>
        <view class="heart-content">
          <table>
            <thead>
              <tr>
                <td>姓名</td>
                <td>{{ title }}次数</td>
                <td>同比上月</td>
              </tr>
            </thead>
          </table>
          <view class="tbody">
            <table>
              <tbody>
                <tr v-for="(item, index) in data.sufferInfo" :key="index">
                  <td class="call-name">
                    {{ item.userName }}
                  </td>
                  <td class="call-count">
                    {{ item.thisMonthNumber }}
                  </td>
                  <td>
                    <view v-if="item.isAdd==0">
                      -
                    </view>
                    <view v-if="item.isAdd==1" class="call-high">
                      ↑
                    </view>
                    <view v-if="item.isAdd==-1" class="call-low">
                      ↓
                    </view>
                  </td>
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
import { getGrand } from '@/common/api/user'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainContainer
  },
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
      type: Number,
      default() {
        return 1
      }
    }
  },
  provide() {
    return {
      titleName: this.title === '呼叫' ? '累计呼叫' : '累计超标'
    }
  },
  data() {
    return {
      navName: '累计呼叫',
      callImg: '/static/user/total-call.png',
      warnImg: '/static/user/total-warn.png',
      data: {},
      dataList: [
        {
          name: '田大妈',
          callCount: '6',
          gains: 'high',
          lastMonth: '↑'
        },
        {
          name: '李大爷',
          callCount: '6',
          gains: 'low',
          lastMonth: '↓'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.getGrand()
  },
  methods: {
    getGrand() {
      const params = {
        doctor_id: this.userInfo.userId,
        type: this.type
      }
      getGrand(params).then(res => {
        console.log(res)
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .total-call-title{
        margin-bottom: 20rpx;
        height: 166rpx;
        padding: 65rpx 0 61rpx 53rpx;
        display: flex;
        align-items: center;
        img{
            height: 40rpx;
            width: 47rpx;
        }
        &-title{
            padding-left: 20rpx;
            font-size: 30rpx;
            .total-count{
                display: inline;
                font-size: 38rpx;
                font-weight: 400;
                color: #52CBE6;
                padding-right: 11rpx;
            }
        }
    }
    .heart {
        width: 100%;
        height: calc(100% - 166rpx);
        background: #fff;
        padding: 30rpx 18rpx;
        box-sizing: border-box;
        border-radius: 20rpx;
        &-title{
            font-size: 28rpx;
            font-weight:400;
            color:rgba(34,34,34,1);
            img{
                height: 35rpx;
                width: 35rpx;
                margin: -8rpx 20rpx -8rpx 10rpx;
            }
        }
        &-content{
            table{
                width: 100%;
                text-align: center;
                border-collapse: collapse;
                td{
                    width: 33%;
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
                    .call-name{
                        color: #101010;
                    }
                    .call-count{
                        color: #F74432;
                    }
                    .call-low{
                        font-weight: 500;
                        color: #2BC59F;
                    }
                    .call-high{
                        font-weight: 500;
                        color: #F74432;
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
                height: calc(100vh - 524rpx);
                overflow: hidden;
                overflow-y: auto;
            }
        }
    }
</style>
