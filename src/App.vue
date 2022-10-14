<template>
  <div class="myapp">
    <div class="one_container">
      <MyRose></MyRose>
      <MyMap></MyMap>
      <MyCiyun></MyCiyun>
    </div>
    <div class="two_container">
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

export default {
  name: "App",
  components: { MyMap, MyRose, MyHis, MyCiyun, MyPara },
};
</script>
<style scoped>
.one_container {
  display: flex;
}
.two_container {
  display: flex;
  justify-content: space-between;
}
</style>
