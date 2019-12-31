<template>
  <view class="call-record">
    <main-container>
      <view class="radius-white-box">
        <view class="call-record-content">
          <view v-for="(val,index) in listData" :key="index" ref="item" @click="toDetail(index,val.sendId)">
            <view>
              <view class="left">
                <view>{{ val.sendName }}</view>
                <view>{{ val.createTime }} {{ val.content }}</view>
              </view>
              <view class="right">
                <image src="/static/message/rightArrow.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </main-container>
  </view>
</template>

<script>

import MainContainer from '@/components/MainContainer'
import { jump } from '@/common/utils/index.js'
import { mapGetters } from 'vuex'
import { getListData } from '@/common/api/common.js'

export default {
  components: {
    MainContainer
  },
  data() {
    return {
      navName: '查诊呼叫',
      listData: [],
      choosedIndex: 0
    }
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  // onHide() {
  //   this.$refs.item[this.choosedIndex].$el.classList.remove('choosed-bg')
  // },
  created() {
    this.getList()
  },
  methods: {
    toDetail(index, id) {
      this.choosedIndex = index
      this.$refs.item[index].$el.classList.add('choosed-bg')
      const interval = setInterval(() => {
        clearInterval(interval)
        jump(`/pages/message/callRecordInfo/index?id=${id}`)
      }, 100)
    },
    // 获取呼叫列表
    getList() {
      const params = {
        type: 1,
        size: 9999999,
        userId: this.userInfo.userId
      }
      getListData(params).then(res => {
        const data = res.data
        this.listData = data.records
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .call-record{
        .radius-white-box{
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            .call-record-content {
                background: #fff;
                border-radius: 20rpx;
                &>view {
                    &>view {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 114rpx;
                        border-bottom: 1px solid #E6E6E6;
                        margin: 0 30rpx;
                        .left {
                            &>view:first-child {
                                font-size: 28rpx;
                                line-height: 38rpx;
                                color: #010101;
                            }
                            &>view:last-child {
                                font-size: 24rpx;
                                line-height: 38rpx;
                                color: #5C5C5C;
                            }
                        }
                        .right {
                            width: 42rpx;
                            height: 42rpx;
                        }
                    }
                }
            }
        }
        .choosed-bg {
            background: #f7f7f7;
        }
        .unchoose-bg {
            background: #fff;
        }
    }
</style>
