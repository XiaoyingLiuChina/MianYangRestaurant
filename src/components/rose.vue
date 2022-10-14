<template>
  <div id="rose" class="rose"></div>
</template>

<script>
export default {
  name: "MyRose",
  data() {
    this.rose = null;
    return {
      option: {
        title: {
          text: "年度总销量对比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          extraCssText: "width:auto;",
          confine: true,
          borderWidth: 1,
        },
        legend: {
          left: 0,
          bottom: 10,
          orient: "horizontal",
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: false,
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        series: [
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 140],
            center: ["45%", "45%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 2,
            },
            labelLine: {
              show: true,
              length: 3,
              length2: 8,
            },
            data: this.$store.state.rose.roseData,
          },
        ],
      },
    };
  },
  mounted() {
    // 初始化echarts
    this.initRose();
    // 绑定数据
    this.setData();
  },
  methods: {
    /**
     * 初始化echarts组件
     */
    initRose() {
      const doc = document.getElementById("rose");
      this.rose = this.$echarts.init(doc);
      this.rose.on("click", (item) => {
        const his_ab = this.$store.state.histogram.his_ab;
        his_ab.shift();
        his_ab.push(item.name);
        this.$store.dispatch("histogram/upDate1", his_ab);
      });
    },
    /**
     * 绑定数据
     */
    setData() {
      this.rose.setOption(this.option, true);
    },
  },
};
</script>
<style scoped>
.rose {
  width: 30vw;
  height: 60vh;
}
</style>
