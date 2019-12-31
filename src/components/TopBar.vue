<template>
  <view
    class="top-bar"
    :style="{'display': show ? 'block' :'none' }"
  />
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100vw;
  height: 30rpx;
  box-sizing: border-box;
  border-image: llinear-gradient(to right,#42BAE9, #63DDE3);
  background: -webkit-linear-gradient(left,#42BAE9, #63DDE3);
  background: -o-linear-gradient(right,#42BAE9, #63DDE3);
  background: -moz-linear-gradient(right,#42BAE9,#63DDE3);
  background: linear-gradient(to right,#42BAE9, #63DDE3);
  }
</style>
