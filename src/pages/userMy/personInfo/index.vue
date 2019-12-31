<template>
  <main-container>
    <view class="person-info">
      <view class="hear-img between-box">
        <view>
          头像
        </view>
        <view class="hear-img-right">
          <img class="head" :src="imgUrl" alt="" @click="changeImg">
          <img class="into" src="/static/my/rightArrow.png" alt="">
        </view>
      </view>
      <view class="info-list-box">
        <view v-for="val in infoName" :key="val.key" @click="changeDialog(val)">
          <view>
            {{ val.name }}
          </view>
          <view class="right">
            <view class="info-list-value">
              {{ endVal(val.key) }}
            </view>
            <view v-if="!(val.name == '账号' || val.name == '身份证' || val.name == '社区')" class="arrow">
              <image class="into" src="/static/my/rightArrow.png" />
            </view>
          </view>
        </view>
      </view>
      <template v-if="isUser === true">
        <view class="radius-white-box between-box info-list" @click="changePassword">
          <view>
            修改密码
          </view>
        </view>
      </template>
      <view class="radius-white-box between-box info-list" @click="signOut(true)">
        <view>
          退出登录
        </view>
      </view>
    </view>
    <xy-dialog
      :show="showDialog"
      :title="dialogTitle"
      @cancelButton="clickCancel('cancel')"
      @confirmButton="clickConfirm('confirm')"
      @close="showDialog=false"
    >
      <view class="dialog">
        <template v-if="currentKey === 'name'">
          <view class="name-box">
            <input v-model.trim="currentVal" type="text" placeholder="请输入名字">
          </view>
        </template>
        <template v-else-if="currentKey === 'sex'">
          <radio-group @change="radioChange">
            <label class="radio">
              <radio ref="radioNan" value="1" :checked="infoVal.sex === 1" style="transform:scale(0.7)" />男
            </label>
            <label class="radio">
              <radio ref="radioNv" value="0" :checked="infoVal.sex === 0" style="transform:scale(0.7)" />女
            </label>
          </radio-group>
        </template>
        <template v-else-if="currentKey === 'age'">
          <picker-view v-if="showPicker" :indicator-style="indicatorStyle" :value="[currentVal - 1]" @change="bindChange">
            <picker-view-column>
              <view v-for="(item,index) in ages" :key="index" class="item">
                {{ item }}
              </view>
            </picker-view-column>
          </picker-view>
        </template>
        <template v-else-if="currentKey === 'password'">
          <view class="password-box">
            <view>
              <text>原密码：</text>
              <input v-model="password" type="password" placeholder="请输入原密码">
            </view>
            <view>
              <text>新密码：</text>
              <input v-model="newPwd" type="password" placeholder="请输入新密码">
            </view>
            <view>
              <text>确认密码：</text>
              <input v-model="confirmPwd" type="password" placeholder="请再次输入密码">
            </view>
          </view>
        </template>
        <template v-else-if="currentKey === 'address'">
          <view class="address-box uni-textarea">
            <textarea v-model.trim="currentVal" type="text" auto-height placeholder="请输入地址" />
          </view>
        </template>
      </view>
    </xy-dialog>
    <xy-dialog
      :show="confimeType"
      title="退出登录"
      align="center"
      content="是否退出？"
      @cancelButton="signOut(true)"
      @confirmButton="signOut(false)"
    />
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import { getStorage } from '@/common/utils/index.js'
import { uploadImg, getMyDoctor, getMyUser, updateUser } from '@/common/api/userSide.js'
import { updateDoctorInfo, updateDoctorPwd } from '@/common/api/baseInfo.js'
import { ToolTips, jump } from '@/common/utils/index'
import { mapGetters } from 'vuex'
import xyDialog from '@/components/xy-dialog.vue'

export default {
  components: {
    MainContainer,
    xyDialog
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    const ages = []
    for (let i = 1; i <= 100; i++) {
      ages.push(i)
    }
    return {
      navName: '个人信息',
      confimeType: false,
      isUser: this.$route.query.isUser === 'true',
      info: [
        {
          key: 'account',
          name: '账号'
        },
        {
          key: 'name',
          name: '名字'
        },
        {
          key: 'sex',
          name: '性别'
        },
        {
          key: 'age',
          name: '年龄'
        },
        {
          key: 'address',
          name: '住址'
        },
        {
          key: 'password',
          name: '密码'
        },
        {
          key: 'idCard',
          name: '身份证'
        },
        {
          key: 'communityName',
          name: '社区'
        }
      ],
      infoVal: {},
      showDialog: false,
      dialogTitle: '',
      currentVal: '',
      currentKey: '',
      showPicker: true,
      ages,
      indicatorStyle: `height: 80rpx;line-height: 80rpx;`,
      password: '',
      newPwd: '',
      confirmPwd: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    infoName() {
      if (this.isUser === false) {
        return this.info.filter(item => item.name !== '住址')
      } else {
        return this.info.filter(item => item.name !== '密码')
      }
    },
    endVal() {
      return (key) => {
        let result = this.infoVal[key]
        if (key === 'password') {
          result = '******'
        } else if (key === 'sex' && this.infoVal.sex !== undefined && this.infoVal.sex !== null) {
          result = this.infoVal.sex === 1 ? '男' : '女'
        }
        return result
      }
    },
    imgUrl() {
      let url = '/static/user/defaultUser.png'
      if (this.userInfo.image) {
        url = this.userInfo.image
      }
      return url
    }
  },
  created() {
    this.isUser === true ? this.getUserInfo() : this.getDoctorInfo()
  },
  methods: {
    // 获取医生资料信息
    getDoctorInfo() {
      getMyDoctor({ id: this.userInfo.userId }).then(({ data }) => {
        this.infoVal = data
      })
    },
    // 获取用户信息
    getUserInfo() {
      getMyUser({ id: this.userInfo.userId }).then(({ data }) => {
        this.infoVal = data
      })
    },
    changeImg() {
      /*global uni */
      // type 1---平台，2---医生，3---用户
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: uploadImg,
            filePath: chooseImageRes.tempFilePaths[0],
            name: 'file',
            header: {
              'Blade-Auth': 'bearer ' + getStorage('token', true)
            },
            formData: {
              userId: this.userInfo.userId,
              type: this.isUser === true ? 3 : 2
            },
            success: (uploadFileRes) => {
              this.userInfo.image = JSON.parse(uploadFileRes.data).msg
              this.$store.commit('SEt_USERINFO', this.userInfo)
            }
          })
        }
      })
    },
    changeDialog(obj) {
      if (!(obj.name === '账号' || obj.name === '身份证' || obj.name === '社区')) {
        this.showDialog = !this.showDialog
      }

      this.dialogTitle = '修改' + obj.name
      if (obj.key === 'sex') {
        this.currentVal = this.infoVal[obj.key] === null ? this.infoVal[obj.key] : this.infoVal[obj.key].toString()
      } else {
        this.currentVal = this.infoVal[obj.key]
      }
      if (this.infoVal.sex && this.$refs.radioNan) {
        this.$refs.radioNan.radioChecked = true
        this.$refs.radioNv.radioChecked = false
      } else if (this.$refs.radioNv) {
        this.$refs.radioNv.radioChecked = true
        this.$refs.radioNan.radioChecked = false
      }
      this.currentKey = obj.key
    },
    clickCancel() {
      // console.log('取消')
      this.currentVal = this.infoVal[this.currentKey]
      this.initData()
    },
    clickConfirm() {
      // console.log('确定')
      const result = this.checkVal()
      if (result === true) {
        this.currentKey === 'password' ? this.updatePwd() : this.updateInfo()
      }
    },
    initData() {
      this.password = this.newPwd = this.confirmPwd = ''
    },
    updateInfo() {
      this.showDialog = false
      const params = {
        id: this.userInfo.userId
      }
      params[this.currentKey] = this.currentVal
      if (this.isUser === true) {
        // 用户
        updateUser(params).then(() => {
          this.updateUserName()
          this.getUserInfo()
        })
      } else {
        updateDoctorInfo(params).then(() => {
          this.updateUserName()
          this.getDoctorInfo()
        })
      }
    },
    updateUserName() {
      if (this.currentKey === 'name') {
        this.userInfo.userName = this.currentVal
        this.$store.commit('SEt_USERINFO', this.userInfo)
      }
    },
    radioChange(e) {
      this.currentVal = Number(e.target.value)
    },
    bindChange(e) {
      this.currentVal = this.ages[e.detail.value]
    },
    checkVal() {
      if (this.currentKey === 'name') {
        if (!this.currentVal || this.currentVal.length < 2) {
          ToolTips('名字最少为2位')
          return false
        } else {
          return true
        }
      } else if (this.currentKey === 'password') {
        if (this.password === '') {
          ToolTips('原密码不能为空')
          return false
        }
        if (this.newPwd === '') {
          ToolTips('新密码不能为空')
          return false
        }
        if (this.newPwd.length < 6) {
          ToolTips('密码最少为6位')
          return false
        }
        if (this.password === this.newPwd) {
          ToolTips('新密码不能与原密码相同')
          return false
        }
        if (this.confirmPwd === '') {
          ToolTips('确认密码不能为空')
          return false
        }
        if (this.newPwd !== this.confirmPwd) {
          ToolTips('两次密码输入不一致')
          return false
        }
        return true
      } else if (this.currentKey === 'address' && this.currentVal === '') {
        ToolTips('地址不能为空')
        return false
      } else {
        return true
      }
    },
    updatePwd() {
      const params = {
        account: this.userInfo.account,
        oldPassword: this.password,
        newPassword: this.newPwd
      }
      updateDoctorPwd(params).then(({ data }) => {
        this.showDialog = false
        this.initData()
      })
    },
    signOut(type) {
      if (!type) {
        uni.reLaunch({
          url: '/pages/login/index'
        })
        this.$store.commit('SET_SIGNOUT', true)
      }
      this.confimeType = !this.confimeType
    },
    changePassword() {
      jump('/pages/login/forget?type=' + '修改密码')
    }
  }
}
</script>

<style lang="scss" scoped>
  .person-info{
    font-size: 30rpx;
    position: relative;
    box-sizing: border-box;
    border-radius: 20rpx;
    overflow: hidden;
    .hear-img{
      height: 156rpx;
      padding: 17rpx 30rpx;
      background: #fff;
      &-right{
          display: flex;
          align-items: center;
          .head{
              width: 122rpx;
              height: 122rpx;
              margin-right: 15rpx;
          }
          .into{
              width: 17rpx;
          }
      }
    }
    .info-list-box {
      background: #fff;
      padding: 0 30rpx;
      &>view {
        // height: 90rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 24rpx 0;
        border-top: 1px solid #E6E6E6;
        .right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: calc(100vw - 238rpx);
          .arrow {
            width: 14rpx;
            height: 24rpx;
            margin-left: 14rpx;
            .into {
              width: 14rpx;
            }
          }
        }
      }
    }
    .between-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;
    }
    .info-list {
        padding: 40rpx 30rpx;
        margin-top: 20rpx;
        &-value{
            color: #CFCECE
        }
    }
    .confime {
      width: 690rpx;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      // background: rgba(0, 0, 0, .2);
      .confime-content {
        width: 400rpx;
        height: 250rpx;
        background: #fff;
        border-radius: 10rpx;
        position: absolute;
        top: 30%;
        left: 20%;
        font-size: 32rpx;

        .confime-btn {
          width: 400rpx;
          height: 80rpx;
          position: absolute;
          bottom: 0rpx;
          left: 0rpx;
          text-align: center;
          display: flex;
          & > view {
            width: 50%;
            line-height: 80rpx;
            border-top: 1rpx solid #f2f2f2;
            box-sizing: border-box;
            &:last-child {
              height: 79rpx;
              color: #fff;
              background: #47c0e8;
            }
          }
        }
      }
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
    }
    .name-box {
      input {
        margin: 0 40rpx;
      }
    }
    .address-box {
      textarea {
        width: calc(100% - 100rpx);
        margin: 0 40rpx;
        border: 1px solid #e6e6e6;
        text-align: left;
        font-size: 30rpx;
        line-height: 40rpx;
        padding: 10rpx 10rpx;
      }
    }
    label:first-child {
      margin-right: 40rpx;
    }
    picker-view {
      height: 360rpx;
      .item {
        line-height: 80rpx;
      }
    }
    .password-box {
      &>view{
        margin: 0 40rpx;
        text-align: left;
        margin-top: 20rpx;
        text {
          font-size: 30rpx;
        }
      }
    }
  }
</style>
