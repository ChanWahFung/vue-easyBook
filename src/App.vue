<template>
  <div id="app">
    <EbHeader v-if="showHeader"></EbHeader>
    <router-view></router-view>
    <BackTop :height="800" :duration="800">
      <div class="top iconfont icon-top"></div>
    </BackTop>
  </div>
</template>

<script>
import EbHeader from './components/EbHeader'

export default {
  name:'app',
  provide(){
    return {
      'app':this
    }
  },
  data() {
    return {
      showHeader:true
    }
  },
  methods: {
    
  },
  components:{
    EbHeader,
  }
}

</script>

<style scoped>
#app{
  font-size: 16px;
  color:#333;
}
.warp{
  margin-top: 20px;
}
.top{
  width:50px;
  height:50px;
  line-height: 50px;
  text-align:center;
  border-radius: 3px;
  font-size: 20px;
  border: 1px solid #d9d9d9;
  color:#666;
}
</style>
