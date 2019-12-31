<template>
  <view>
    <view class="search">
      <input
        class="search-input"
        type="text"
        focus
        placeholder="请输入要搜索的联系人"
        @input="handleInput"
      >
    </view>
    <view v-if="keyword" class="search-main">
      <view v-if="hasNoData" class="search-main-errtitle">
        无搜索结果
      </view>
      <view
        v-for="item of list"
        :key="item.id"
        class="search-main-title"
        hover-class="hover"
        :hover-start-time="20"
        :hover-stay-time="70"
        :data-name="item.name"
        :data-id="item.id"
        :data-phoneNumber="item.phoneNumber"
        @click="handleClick"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PhoneSearchList',
  props: {
    phones: Object
  },
  data() {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData() {
      return !this.list.length
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (const i in this.phones) {
          this.phones[i].forEach((item) => {
            if (item.spell.indexOf(this.keyword) > -1 || item.name.indexOf(this.keyword) > -1) {
              result.push(item)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  methods: {
    handleInput(e) {
      this.keyword = e.detail.value
    },
    handleClick(e) {
      this.$emit('paramClick', e.target)
    }
  }
}
</script>

<style>
	.hover{
		background-color: #eee;
	}
	.search{
		background-color: #fff;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #e5e5e5;
	}

	.search-input{
		font-size:28rpx;
		border: 1px solid #e5e5e5;
		border-radius: 3px;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.search-main{
		height: 100%;
		padding-bottom: 20rpx;
		background-color:#fff;
		overflow: hidden;
	}

	.search-main-errtitle,.search-main-title{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 32rpx;
		padding: 0 20rpx;
		border-bottom: 1px solid #e5e5e5;
	}

</style>
