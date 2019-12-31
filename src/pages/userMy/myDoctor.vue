<template>
  <view class="my-doctor">
    <main-container>
      <view class="my-doctor-box">
        <block v-if="noBindDoctor">
          <view class="no-doctor">
            暂无绑定医生
          </view>
        </block>
        <block v-else>
          <view class="hander">
            <view class="hander-image">
              <image :src="dataList.image ? dataList.image : '/static/userMy/doctorImg.png'" />
            </view>
            <view class="hander-dec">
              <view>{{ dataList.name }}</view>
              <view v-if="dataList.sex !== undefined">
                {{ dataList.sex ? '男' : '女' }}
              </view>
              <view>{{ dataList.phone }}</view>
            </view>
          </view>
          <view class="my-doctor-introduce">
            <view>
              简介：
            </view>
            <view>
              {{ dataList.brief }}
            </view>
          </view>
          <view class="my-doctor-introduce">
            <view>
              从业经验：
            </view>
            <view>
              {{ dataList.experience }}
            </view>
          </view>
        </block>
      </view>
    </main-container>
  </view>
</template>

<script>
import MainContainer from '@/components/MainContainer.vue'
import { getMyDoctor } from '@/common/api/userSide'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainContainer
  },
  provide() {
    return {
      titleName: '我的医生'
    }
  },
  data() {
    return {
      dataList: {},
      noBindDoctor: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const id = this.$route.query.id
      getMyDoctor({ id: id === undefined ? this.userInfo.doctorId : id }).then(({ data }) => {
        if (JSON.stringify(data) === '{}') {
          this.noBindDoctor = true
        } else {
          this.dataList = data
          this.noBindDoctor = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-doctor {
  .my-doctor-box {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    .no-doctor{
      padding-top: 48rpx;
      text-align: center;
    }
    .hander {
      width: 630rpx;
      height: 120rpx;
      border-bottom: 1px solid #E6E6E6;
      padding: 30rpx 0rpx;
      display: flex;
      .hander-image {
        width: 120rpx;
        height: 120rpx;
        margin-right: 30rpx;
        border-radius: 10rpx;
      }
      .hander-dec {
        color: #B0B0B0;
        font-size: 26rpx;
        line-height: 40rpx;
        & > view:first-child {
          color: #222222;
          font-size: 30rpx;
        }
      }
    }
    .my-doctor-introduce {
      margin-top: 30rpx;
      display: flex;
      & > view {
        &:first-child {
          min-width: 150rpx;
          font-size: 30rpx;
          color: #1596C5;
        }
        &:last-child {
          width: calc(100% - 200rpx);
          font-size: 28rpx;
          color: #222222;
        }
      }
    }
  }
}
</style>
