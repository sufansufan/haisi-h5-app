<template>
  <scroll-view :scroll-y="true">
    <view class="login-content-box">
      <view class="login-item">
        <view class="code">
          <view>
            <input v-model="register.account" placeholder="手机号" placeholder-class="placeStyle">
          </view>
          <view class="user-add">
            <uni-tag :text="tagText" type="primary" :circle="true" @click="tagClick" />
          </view>
        </view>
      </view>
      <view class="login-item">
        <view>
          <input v-model="register.checkCode" placeholder="验证码" placeholder-class="placeStyle">
        </view>
      </view>
      <view class="login-item">
        <view>
          <input v-model="register.password" placeholder="设置密码" type="password" placeholder-class="placeStyle">
        </view>
      </view>
      <view class="login-item">
        <view>
          <input v-model="register.name" placeholder="姓名" placeholder-class="placeStyle">
        </view>
      </view>
      <view class="login-item">
        <view>
          <input v-model="register.idCard" placeholder="身份证号" placeholder-class="placeStyle">
        </view>
      </view>
      <view class="save-btn" @click="submit">
        保存
      </view>
    </view>
  </scroll-view>
</template>

<script>
import uniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag'
import { phoneNumber, idCard } from '@/common/utils/validate'
import { getCode, registered } from '@/common/api/login'
import { ToolTips } from '@/common/utils/index'
export default {
  components: {
    uniTag
  },
  data() {
    return {
      register: {
        account: '',
        checkCode: '',
        idCard: '',
        name: '',
        password: ''
      },
      tagText: '获取验证码'
    }
  },
  methods: {
    tagClick() {
      const { account } = this.register
      if (!phoneNumber(account)) {
        return
      }
      if (parseInt(this.tagText) > 0) {
        return
      }
      this.tagText = '60s'
      var time = setInterval(() => {
        this.tagText = String(parseInt(this.tagText) - 1) + 's'
        if (parseInt(this.tagText) === 0) {
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
      const { account, idCard: id, checkCode, name, password } = this.register
      if (!name.trim() || name.trim().length < 2) {
        ToolTips('姓名不能为空且最少2位')
        return
      }
      if (!phoneNumber(account) || !idCard(id)) {
        return
      }
      if (!checkCode.trim()) {
        ToolTips('验证码不能为空')
        return
      }
      if (!password.trim() && password.trim() > 6) {
        ToolTips('密码不能为空，且大于6位')
        return
      }
      registered(this.register).then(({ code }) => {
        if (code === 200) {
          this.$emit('changeTab')
          ToolTips('注册成功', 'success')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-content-box{
  .login-item {
    width: 635rpx;
    height: 88rpx;
    background: #ecf8fd;
    margin: 43rpx auto 0rpx;
    border-radius: 88rpx;
    display: flex;
    align-items: center;
    & > view {
      width: 90%;
      height: 60rpx;
      margin: 15rpx auto 0rpx;
    }
    input {
      color: #68C8ED;
    }
    .code {
      display: flex;
      & > view {
        &:first-child {
          width: 69%;
        }
      }
      input {
        color: #68C8ED;
      }
    }
  }
}
</style>
