<template>
  <view>
    <scroll-view
      class="scroll-list"
      :scroll-top="1"
      scroll-y="true"
      :scroll-with-animation="scrollAnimationOFF"
      :scroll-into-view="scrollViewId"
      @scroll="handleScroll"
    >
      <view class="phone-list">
        <view
          v-for="(item, key) of phones"
          :id="key"
          :key="key"
          class="list-item"
        >
          <!-- <view class="list-item-title">
            {{ key }}
          </view> -->
          <view
            v-for="innerItem in item"
            :key="innerItem.id"
            class="list-item-phone"
            hover-class="commonly-hover"
            :hover-start-time="20"
            :hover-stay-time="70"
            :data-name="innerItem.name"
            :data-id="innerItem.id"
            :data-phoneNumber="innerItem.phoneNumber"
            @click="handleClick"
          >
            <img class="list-item-img" :src="innerItem.image?innerItem.image:'/static/user/defaultUser.png'" alt="">

            <view class="list-item-name">
              {{ innerItem.name }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'PhoneList',
  props: {
    phones: Object,
    letter: String,
    scrollAnimationOFF: Boolean
  },
  data() {
    return {
      winHeight: 0,
      scrollTop: 0,
      letterDetails: [],
      timer: null
    }
  },
  computed: {
    scrollViewId() {
      return this.letter
    }
  },
  mounted() {
    // #ifndef APP-PLUS
    this.winHeight = uni.getSystemInfoSync().windowHeight - 49.50
    // #endif
    // #ifdef APP-PLUS
    this.winHeight = uni.getSystemInfoSync().windowHeight - 100
    // #endif
  },
  methods: {
    handleClick(e) {
      this.$emit('handleClick', e.currentTarget.dataset)
    },
    handleScroll(e) {
      if (this.letterDetails.length === 0) {
        const view = uni.createSelectorQuery().selectAll('.list-item')
        setTimeout(() => {
          view.boundingClientRect(data => {
            const top = data && data[0].top
            data.forEach((item, index) => {
              item.top = item.top - top
              item.bottom = item.bottom - top
              this.letterDetails.push({
                id: item.id,
                top: item.top,
                bottom: item.bottom
              })
            })
          }).exec()
        }, 300)
      }

      const scrollTop = e.detail.scrollTop
      this.letterDetails.some((item, index) => {
        if (scrollTop >= item.top && scrollTop <= item.bottom - 5) {
          this.$emit('change', item.id)
          this.$emit('reset', true)
          return true
        }
      })
    }
  }

}
</script>

<style>

	.commonly-hover{
		background-color: #eee;
	}

	.scroll-list{
		flex: 1;
		/* height: 100vh; */
        height: calc(100vh - 660rpx);
		overflow-y: hidden;
        padding: 18rpx 0;
        box-sizing: border-box;
	}

	.phone-list{
		display: flex;
		background-color: #fff;
		flex-direction:column;
		position:relative;
		width: 100%;
	}

	.list-item {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		height: 92rpx;
		background-color: #fff;
		height: 100%;

	}

	.list-item >.list-item-phone{
		font-weight: normal;
	}

	.list-item-title{
		background-color: #eee;
	}

	.list-item-title,.list-item-phone{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 32rpx;
		font-weight: bold;
		padding: 9rpx 20rpx;
		/* border-bottom: 1px solid #e5e5e5; */
        /* box-sizing: border-box; */
        display: flex;
	}
    .list-item-img{
        height: 77rpx;
        width: 77rpx;
        border-radius:10px;
    }
    .info-box-img{
        background:#f2f2f2;
        height: 77rpx;
        width: 77rpx;
        border-radius:10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .info-box-img img{
        height: 51rpx;
        width: 48rpx;
    }
    .list-item-name{
        width: calc( 100% - 105rpx);
        line-height: 74rpx;
        font-size:30rpx;
        font-weight:400;
        margin-left: 28rpx;
        color:rgba(25,25,25,1);
        border-bottom: 2rpx solid rgba(217,217,217,1);
    }
</style>
