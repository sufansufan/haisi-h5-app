<template>
  <view class="health-number">
    <main-container>
      <view class="radius-white-box">
        <view class="health-number-title">
          <img src="/static/user/status-heart.png" alt="">
          <view>心率设置</view>
        </view>
        <view class="health-number-info">
          <view class="number-info">
            当前心率值：
            <view class="number-info-info">
              {{lastHL}} ~ {{lastHH}}
            </view>次/分
          </view>
          <view class="input-info">
            <view class="input-info-title">
              预警线：
            </view>
            <view class="input-info-number">
              <input v-model="heartHigh" class="high" type="number" placeholder="输入最高值">
              <input v-model="heartLow" class="low" type="number" placeholder="输入最低值">
            </view>
          </view>
        </view>
      </view>
      <view class="radius-white-box">
      <view class="health-number-title">
          <img src="/static/user/status-doctor.png" alt="">
          <view>血压设置</view>
        </view>
        <view class="health-number-info">
          <view class="number-info">
            当前血压值：
            <view class="number-info-info">
              {{lastBL}} ~ {{lastBH}}
            </view>mmHg
          </view>
          <view class="input-info">
            <view class="input-info-title">
              预警线：
            </view>
            <view class="input-info-number">
              <input v-model="bloodHigh" class="high" type="number" placeholder="输入最高值">
              <input v-model="bloodLow" class="low" type="number" placeholder="输入最低值">
            </view>
          </view>
        </view>
      </view>
      <view class="btn">
        <button @click="submit">保存</button>
      </view>
    </main-container>
  </view>
</template>

<script>

import MainContainer from '@/components/MainContainer';
import {setHealth, healthDetail} from '@/common/api/user';
import {ToolTips} from'@/common/utils/index'
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
      navName: '设置健康值',
      heartHigh:'',
      heartLow:'',
      bloodHigh:'',
      bloodLow:'',
      lastHH:'',
      lastHL:'',
      lastBH:'',
      lastBL:'',
      dataId:''
    }
  },
  mounted(){
    this.id = this.$route.query.id
    this.healthDetail()
  },
  methods: {
    submit(){
      let params={
        userId: this.id,
        heartHigh: parseInt(this.heartHigh),
        heartLow: parseInt(this.heartLow),
        bloodPressureHigh: parseInt(this.bloodHigh),
        bloodPressureLow: parseInt(this.bloodLow)
      }
      if(this.dataId){
        params.id=this.dataId
      }
      if(params.heartHigh && params.heartLow && params.bloodPressureHigh && params.bloodPressureLow){
        if((params.heartHigh > params.heartLow) && (params.bloodPressureHigh > params.bloodPressureLow)){
          setHealth(params).then(res => {
            ToolTips(res.msg)
            this.healthDetail()
          })  
        }else{
          ToolTips('最高值应大于最低值')
        }
      }else{
          ToolTips('请全部输入数据')
      }
    },
    healthDetail(){
      let params={
        userId:this.id
      }
      healthDetail(params).then(res => {
        const data = res.data
        this.dataId = data.id
        this.lastHL = data.heartLow
        this.lastHH = data.heartHigh
        this.lastBL = data.bloodPressureLow
        this.lastBH = data.bloodPressureHigh
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .radius-white-box{
        display: flex;
        padding: 20rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        font-weight: 400;
        margin-bottom: 20rpx;
        .health-number-title{
            height: 200rpx;
            width: 200rpx;
            border-radius: 20rpx;
            background: rgba(254,239,234,1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
              height: 80rpx;
              width: 80rpx;
              margin-bottom: 10rpx;
            }
            view{
              color:#84828e;
              font-size: 28rpx;
            }
        }
        .health-number-info{
            margin-left: 32rpx;
            width: calc(100% - 200rpx);
            .number-info{
                margin-bottom: 20rpx;
                &-info{
                    display: inline;
                    font-size: 32rpx;
                    font-weight: bolder;
                    color: #4B608E;
                    margin-right:6rpx;
                }
            }
            .input-info{
                display: flex;
                &-title{
                    width: 120rpx;
                }
                &-number{
                    width: calc(100% - 120rpx);
                    input{
                        border-radius: 10rpx;
                        height: 55rpx;
                        margin-bottom: 15rpx;
                        padding-left: 15rpx;
                        padding-top: 6rpx;
                        box-sizing: border-box;

                    }
                    .high{
                        color: #F56C6C;
                        background:rgba(254,240,240,1);
                        &::-webkit-input-placeholder{
                            color:#F56C6C;
                        }
                    }
                    .low{
                        color: #67C23A;
                        background:rgba(240,249,235,1);
                        &::-webkit-input-placeholder{
                            color:#67C23A;
                        }
                    }
                }
            }
        }
    }
    .btn{
        margin-top: 82rpx;
        padding: 0 27rpx;
        button{
            color: #fff;
            background: #42BAE9;
            opacity: .8;
            height: 88rpx;
            border-radius: 50rpx;
        }
        uni-button:after{
            border: 0;
        }
    }
</style>
