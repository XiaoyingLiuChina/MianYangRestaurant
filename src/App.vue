<template>
  <div class="myapp">
    <div class="map_container">
      <MyRose></MyRose>
      <MyMap></MyMap>
      <MyCiyun></MyCiyun>
    </div>
    <div class="rose_container">
      <MyHis></MyHis>
      <MyPara></MyPara>
    </div>
  </div>
</template>

<script>
import MyMap from "./components/map.vue";
import MyHis from "./components/histogram.vue";
import MyRose from "./components/rose.vue";
import MyPara from "./components/parallel.vue";
import MyCiyun from "./components/ciyun.vue";
import AppButton from "./components/library/app-button.vue";
// import * as echarts from 'echarts'
// import {provide} from 'vue'

export default {
  name: "App",
  components: { MyMap, MyRose, MyHis, AppButton, MyCiyun, MyPara },
  //   setup(props) {
  //       provide('echart', echarts)
  //   }
};
</script>
<style scoped>
.map_container {
  display: flex;
}
.rose_container {
  display: flex;
  justify-content: space-between;
}
</style>
