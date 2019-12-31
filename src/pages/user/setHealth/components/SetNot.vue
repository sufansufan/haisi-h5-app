<template>
  <view class="radius-white-box" :class="setClassName">
    <view class="box-title">
      <view class="box-title-name">
        {{ typeName }}
      </view>
      <img :src="img" alt="">
    </view>
    <view class="set-info">
      <view v-if="dataList.length>0">
        <view v-for="(item, index) in dataList" :key="index" class="set-info-item">
          <view class="box" @click="inHealth(item)">
            <view>{{ item.userName }}</view>
            <view class="item-set">
              {{ typeSet }}
            </view>
          </view>
        </view>
      </view>
      <view v-else style="text-align:center">
      暂无数据
      </view>
    </view>
  </view>
</template>

<script>
import {jump} from '@/common/utils/index'
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default() {
        return 'not'
      }
    }
  },
  data() {
    return {
      img: '/static/user/set-no.png',
      typeName: '未设置',
      typeSet: '设置',
      setClassName: ''
    }
  },
  mounted() {
    if (this.type === 'not') {
      this.img = '/static/user/set-no.png'
      this.typeName = '未设置'
      this.typeSet = '设置'
      this.setClassName = 'set-not'
    } else {
      this.img = '/static/user/set-has.png'
      this.typeName = '已设置'
      this.typeSet = '修改'
      this.setClassName = 'set-has'
    }
  },
  methods: {
    inHealth(item){
      jump('/pages/user/setHealthNumber/index?id='+item.userId)
    }
  }
}
</script>

<style lang='scss' scoped>
    .radius-white-box{
        margin-bottom: 21rpx;
        .box-title{
            position: relative;
            height: 50rpx;
            &-name{
                position: absolute;
                left: 29rpx;
                top: 6rpx;
                font-size: 26rpx;
                color:rgba(255,255,255,1);
                font-weight:400;
            }
            img{
                height: 50rpx;
                width: 100%;
                margin-left: -3rpx;
            }
        }
        .set-info{
            padding:0 30rpx 30rpx;
            &-item{
                border-bottom: 2rpx solid rgba(230,230,230,1);
                color:rgba(0,0,0,1);
                font-size: 28rpx;
                height: 70rpx;
                line-height: 70rpx;
                .box{
                  display: flex;
                  justify-content: space-between;
                }
                .item-set{
                    color: #52CBE6;
                    font-size: 24rpx;
                }
            }
        }
    }
    .set-has{
        border: 2rpx solid #05B9C6;
        border-top: none;
    }
    .set-not{
        border: 2rpx solid #F45655;
        border-top: none;
    }
</style>
