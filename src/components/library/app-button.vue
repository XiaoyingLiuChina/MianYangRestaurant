<template>
  <div class="butt">
    <button @click="getLook" :disabled="test.isStart">点击观看</button>
    <!-- <button >暂停观看</button>
    <button >继续观看</button> -->
    <button :disabled="!test.isStart" @click="getLook">结束观看</button>
    -----
    <button @click="clickArea" :disabled="isArea">选择区域比较</button>
    <button @click="clearArea" :disabled="!isArea">退出区域选择</button>
  </div>
</template>
<script>
export default {
  name: "AppButton",
  data() {
    return {};
  },
  inject: ["test"],
  props: {
    isArea: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["change"],
  methods: {
    getLook() {
      this.test.isStart = !this.test.isStart;
    },

    clickArea() {
      let temp = !this.isArea;
      this.$emit("change", temp);
    },
    clearArea() {
      this.$emit("change", false);
    },
  },
};
</script>
<style scoped></style>
