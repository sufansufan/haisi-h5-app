<template>
  <view class="setting-item">
    <view v-for="(item, index) in dataList" :key="index" class="radius-white-box">
      <view class="info-box" @click="jump(item)">
        <view class="info-box-name">
          {{ item.name }}
          <view v-if="item.img" class="info-box-imgs">
            <view v-for="(items, indexs) in item.img" :key="indexs" class="box-imgs-info">
              <img :src="items" alt="">
            </view>
          </view>
        </view>
        <img src="/static/message/rightArrow.png" alt="">
      </view>
    </view>
    <yomol-prompt ref="yomolPrompt" :title="promptTitle" :maxlength="maxlength" :default-value="defaultValue" :theme-color="tColor" @onConfirm="onPromptConfirm" />
  </view>
</template>

<script>
import { nickName } from '@/common/api/user'
import { jump } from '@/common/utils/index'
import yomolPrompt from '@/components/YomolPrompt'
/* global uni */
export default {
  components: {
    yomolPrompt
  },
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      promptTitle: '设置备注',
      defaultValue: '',
      maxlength: '18',
      tColor: '#42BAE9'
    }
  },
  methods: {
    jump(item) {
      if (item.path) {
        jump(item.path + '?id=' + this.id)
        // if (item.name === '呼叫与超标记录') {
        //   jump(item.path + '?sendId=' + this.id + '&name=呼叫与超标记录')
        // } else {
        //   jump(item.path + '?id=' + this.id)
        // }
      } else if (item.name === '设置备注') {
        this.onOpenPromptClick()
      }
    },
    onOpenPromptClick() {
      this.defaultValue = this.name
      this.promptFunc = 'update-prompt' // 将定义好的处理逻辑名传给组件回调
      this.$refs.yomolPrompt.show()
    },
    onPromptConfirm(e) {
      if (e.trim() === '') {
        e = ' '
      }
      const params = {
        id: this.id,
        nickName: e
      }
      nickName(params).then(res => {
        if (res.code === 200) {
          this.$emit('getNewInfo')
        }
      })
    }
  },
  onBackPress() {
    /*
    * 屏蔽返回键
    */
    if (this.$refs.yomolPrompt.visible) {
      this.$refs.yomolPrompt.hide()
      return true
    }
  },
  onLoad(e) {
    // 自定义input处理事件监听
    uni.$on('update-prompt', (data) => {
      // data.value input输入值
      // data.callback 处理后返回方法名
      const val = data.value
      // ...逻辑处理...

      uni.$emit(e.callback, val)
    })
  }
}
</script>

<style lang='scss' scoped>
    .setting-item{
        .radius-white-box{
            margin-top: 20rpx;
            .info-box{
                padding: 35rpx 30rpx;
                font-size: 30rpx;
                color:rgba(0,0,0,1);
                font-weight: 400;
                display: flex;
                justify-content: space-between;
                align-items: center;
                img{
                    height: 40rpx;
                    width: 40rpx;
                }
                &-name{
                    display: flex;
                }
                &-imgs{
                    display: flex;
                    margin-left: 23rpx;
                    position: relative;
                    top: 2rpx;
                    .box-imgs-info{
                        padding: 0 20rpx;
                    }
                }
            }
        }
    }
</style>
