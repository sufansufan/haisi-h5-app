<template>
  <main-container class="my-care">
    <view>
      <view v-for="item in careList" :key="item.id" class="radius-white-box info-box">
        <view class="info-box-img">
          <img :src="imgUrl(item.image)" alt="">
        </view>
        <view class="info-box-right">
          <view class="right-name">
            {{ item.name }}
          </view>
          <view class="my-care-info">
            <text @click="toDoctor(item.doctorId)">
              医生:{{ item.doctorName }}
            </text>
          </view>
          <view class="my-care-info">
            <text @click="toService(item.id)">
              服务包:{{ item.serviceName }}
            </text>
          </view>
          <view class="cancel-care" @click="cancelCareBtn(item.id)">
            <uni-icon type="closeempty" size="26" />
          </view>
        </view>
      </view>
    </view>
    <xy-dialog
      :show="showDialog"
      :title="careText"
      @cancelButton="clickCancel()"
      @confirmButton="clickConfirm()"
      @close="showDialog=false"
    >
      <view class="dialog">
        <view v-if="addCare">
          <view class="name-box">
            <input v-model.trim="currentVal" class="uni-input" type="text" confirm-type="search" placeholder="请输入账号" @confirm="accountSearch" @blur="accountSearch">
          </view>
          <view v-if="bindUser.length>0" class="account-box">
            <view>
              {{ bindUser[0].name }}
            </view>
            <view>
              账号：{{ bindUser[0].account }}
            </view>
          </view>
        </view>
        <view v-if="!addCare">
          是否取消关心？
        </view>
      </view>
    </xy-dialog>
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import uniIcon from '@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue'
import { getMyCareList, nameByaccount, bindCareUser, unbindCareUser } from '@/common/api/userSide.js'
import { mapGetters } from 'vuex'
import xyDialog from '@/components/xy-dialog.vue'
import { ToolTips, jump, handlerUrl } from '@/common/utils/index'

export default {
  components: {
    MainContainer,
    xyDialog,
    uniIcon
  },
  provide() {
    return {
      titleName: this.navName,
      rightIcon: 'plus',
      rightClick: this.addCareBtn
    }
  },
  data() {
    return {
      showDialog: false,
      currentVal: '',
      bindUser: [], // 绑定关心的某个用户
      navName: '我的关心',
      careList: [], // 所有关心列表
      addCare: true,
      cancelCareId: '', // 取消关心的id
      careText: '新增关心'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const userId = this.userInfo.userId
      getMyCareList({ userId }).then(res => {
        res.data.shift()
        const data = res.data
        this.careList = data
      })
    },
    imgUrl(imgurl) {
      let url = '/static/user/defaultUser.png'
      if (imgurl) {
        url = imgurl
      }
      return url
    },
    // 模态框点击取消
    clickCancel() {
      this.showDialog = false
      if (this.addCare) {
        this.bindUser = []
        this.currentVal = ''
      } else {
        this.cancelCareId = ''
      }
    },
    // 模态框点击确定
    clickConfirm() {
      // console.log('确定')
      if (this.addCare) {
        this.addCareAjax()
      } else {
        this.cancelCareAjax()
      }
    },
    addCareBtn() {
      this.careText = '新增关心'
      this.showDialog = true
      this.addCare = true
    },
    // 通过账号搜索 用户名称
    accountSearch({ detail }) {
      if (!this.currentVal) {
        ToolTips('请输入账号！')
        return
      }
      nameByaccount({ account: detail.value }).then(({ data }) => {
        if (JSON.stringify(data) === '{}') {
          ToolTips('暂无数据！')
          return
        }
        this.bindUser = [data]
      })
    },
    // 绑定关心
    addCareAjax() {
      if (!this.currentVal) {
        ToolTips('请输入账号！')
        return
      }
      bindCareUser({
        friendId: this.bindUser[0].id,
        userId: this.userInfo.userId
      }).then(res => {
        this.clickCancel()
        ToolTips(res.msg)
        this.getList()
      })
    },
    // 取消 关心 按钮
    cancelCareBtn(id) {
      this.careText = '取消关心'
      this.cancelCareId = id
      this.addCare = false
      this.showDialog = true
    },
    // 取消 关心
    cancelCareAjax() {
      unbindCareUser({
        friendId: this.cancelCareId,
        userId: this.userInfo.userId
      }).then(res => {
        this.clickCancel()
        ToolTips(res.msg)
        this.getList()
      })
    },
    toDoctor(id) {
      jump('/pages/userMy/myDoctor' + handlerUrl({ id: id }))
    },
    toService(id) {
      jump('/pages/userMy/userMyServicePack' + handlerUrl({ id: id }))
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-care{
    .info-box{
      padding: 26rpx 30rpx;
      &:not(:last-of-type){
        margin-bottom: 20rpx;
      }
    }
    .dialog {
      input {
        font-size: 30rpx;
        line-height: 40rpx;
        padding: 14rpx 0 14rpx 20rpx;
        border-radius: 4rpx;
        border: 1px solid #E6E6E6;
        text-align: left;
        width: 80%;
        margin: 0 auto;
      }
      .account-box{
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        line-height: 48rpx;
        width: 80%;
        margin: 0 auto;
        margin-top: 18rpx;
        color: #999;
      }
    }
    .my-care-info {
      & > text {
        line-height: 32rpx !important;
      }
    }
  }

</style>
