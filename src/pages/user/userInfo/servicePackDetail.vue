<template>
  <view>
    <my-service-pack :is-user="true" :service-detail="id" />
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
      id: this.$route.query.id
    }
  }
}
</script>
