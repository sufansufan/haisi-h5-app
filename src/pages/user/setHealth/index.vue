<template>
  <main-container>
    <view class="ss">
      <scroll-view>
        <set-not :data-list="dataList.noConfigUserList" :type="set" />
        <set-not :data-list="dataList.configUserList" :type="edit" />
      </scroll-view>
    </view>
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import { goBack } from '@/common/utils/index'
import SetNot from './components/SetNot'
import {healthList} from '@/common/api/user'
export default {
  components: {
    MainContainer,
    SetNot
  },
  provide() {
    return {
      titleName: this.navName
    }
  },
  data() {
    return {
      navName: '设置健康值',
      set: 'not',
      edit: 'has',
      dataList: {
        configUserList:[],
        noConfigUserList:[]
      }
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      healthList().then( res =>{
        this.dataList.configUserList =res.data.configUserList
        this.dataList.noConfigUserList =res.data.noConfigUserList
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .ss{
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
