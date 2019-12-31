<template>
  <view>
    <main-container>
      <view class="user-add">
        <view class="user-title">
          <text>录入用户信息</text>
        </view>
        <view>
          <form>
            <view class="user-item">
              <text>姓名：</text>
              <view class="user-item-content-other">
                <input v-model="addInfo.name" placeholder="请输入姓名" placeholder-class="placeStyle">
              </view>
            </view>
            <view class="user-item">
              <text>手机号：</text>
              <view class="user-item-content">
                <input v-model="addInfo.account" placeholder="请输入手机号" placeholder-class="placeStyle">
              </view>
              <view>
                <uni-tag :text="tagText" type="primary" :circle="true" @click="tagClick" />
              </view>
            </view>
            <view class="user-item">
              <text>短信验证码：</text>
              <view class="user-item-content-other">
                <input v-model="addInfo.checkCode" placeholder="请输入验证码" placeholder-class="placeStyle">
              </view>
            </view>
            <view class="user-item">
              <text>身份证号：</text>
              <view class="user-item-content-other">
                <input v-model="addInfo.idCard" placeholder="请输入身份证号" placeholder-class="placeStyle">
              </view>
            </view>
            <view class="user-item">
              <text>住址：</text>
              <view class="user-item-content-other">
                <input v-model="addInfo.address" placeholder="请输入详细地址,具体到门牌号" placeholder-class="placeStyle">
              </view>
            </view>
            <view class="user-item">
              <text>疾病类型：</text>
              <view class="user-item-content-other">
                <input v-model="addInfo.diseaseType" placeholder="请输入疾病类型" placeholder-class="placeStyle">
              </view>
            </view>
            <view class="user-item">
              <text>选定套餐：</text>
              <view class="user-item-content-other">
                <select v-model="addInfo.serviceId">
                  <option value="">
                    请选择套餐
                  </option>
                  <option v-for="item in serviceList" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </view>
            </view>
            <!-- <view class="user-item">
              <text>手表标识码：</text>
              <view class="user-item-content-other">
                <input placeholder="" placeholder-class="placeStyle">
              </view>
            </view> -->
          </form>
          <view class="save-btn" @click="submit">
            保存
          </view>
        </view>
      </view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import uniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag'
import { phoneNumber, idCard } from '@/common/utils/validate'
import { ToolTips, jump } from '@/common/utils/index'
import { getCode } from '@/common/api/login'
import { mapGetters } from 'vuex'
import { getDoctorServiceList, saveUser } from '@/common/api/user'
export default {
  components: {
    MainContainer,
    uniTag
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '添加用户',
      addInfo: {
        name: '',
        account: '',
        idCard: '',
        diseaseType: '',
        serviceId: '',
        address: '',
        checkCode: '',
        doctorId: ''
      },
      tagText: '获取验证码',
      serviceList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    getDoctorServiceList({
      doctor_id: this.userInfo.userId
    }).then(({ data }) => {
      this.serviceList = data
    })
  },
  methods: {
    tagClick() {
      const { account } = this.addInfo
      if (!phoneNumber(account)) {
        return
      }
      if (Number(this.tagText) > 0) {
        return
      }
      this.tagText = '60'
      var time = setInterval(() => {
        this.tagText = String(Number(this.tagText) - 1)
        if (this.tagText === '0') {
          clearInterval(time)
          this.tagText = '获取验证码'
        }
      }, 1000)
      const params = {
        phone: account,
        type: 4
      }
      getCode(params)
    },
    submit() {
      const { name, account, idCard: id, diseaseType, serviceId, address, checkCode } = this.addInfo
      if (!name.trim()) {
        ToolTips('姓名不能为空')
        return
      }
      if (!phoneNumber(account) || !idCard(id)) {
        return
      }
      if (!checkCode.trim()) {
        ToolTips('验证码不能为空')
        return
      }
      if (!serviceId) {
        ToolTips('请选择套餐')
        return
      }
      if (!diseaseType.trim() && diseaseType.trim().length > 1) {
        ToolTips('疾病类型不能为空')
        return
      }
      if (!address.trim() && address.trim().length > 1) {
        ToolTips('地址不能为空')
        return
      }
      this.addInfo.doctorId = this.userInfo.userId
      saveUser(this.addInfo).then(({ code }) => {
        if (code === 200) {
          ToolTips('添加成功')
          jump('/pages/index/index?current=1')
          this.$store.dispatch('getUserList', this.userInfo)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-add {
  width: calc(100% - 60rpx);
  height: 100%;
  background:#fff;
  padding: 0rpx 30rpx;
  overflow: hidden;
  .user-title {
    font-size: 32rpx;
    color: #42BAE9;
    font-weight: 600;
    text-align: center;
    margin-top: 29rpx;
  }
  .user-item {
    width: 100%;
    height: 70rpx;
    border-bottom: 1rpx solid #E6E6E6;
    padding-top: 40rpx;
    font-size: 34rpx;
    line-height:  50rpx;
    display: flex;
    &-content{
      width: 300rpx;
      margin-top: 4rpx;
      &-other {
        width: 420rpx;
        margin-top: 6rpx;
      }
    }
  }
}
</style>
