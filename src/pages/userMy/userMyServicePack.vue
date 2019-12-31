<template>
  <view>
    <my-service-pack :is-user="true" />
  </view>
</template>

<script>
import MyServicePack from '@/pages/my/myServicePack'
export default {
  components: {
    MyServicePack
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
</style>
