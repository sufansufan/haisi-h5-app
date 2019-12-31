<template>
  <info-component :title="title" :type="2" />
</template>

<script>
import infoComponent from '../totalCall/infoComponent'
export default {
  components: {
    infoComponent
  },
  data() {
    return {
      title: '超标'
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
