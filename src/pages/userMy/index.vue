<template>
  <view class="user-my">
    <my :is-user="true" />
  </view>
</template>

<script>
import My from '@/pages/my/index'
export default {
  components: {
    My
  }
}
</script>

<style lang="scss" scoped>

</style>
