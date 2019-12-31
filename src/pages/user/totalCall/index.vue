<template>
  <info-component :title="title" :type="1" />
</template>

<script>
import infoComponent from './infoComponent'
export default {
  components:{
    infoComponent
  },
  data(){
    return {
      title: '呼叫'
    }
  }
    
}
</script>

<style lang="scss" scoped>
    
</style>