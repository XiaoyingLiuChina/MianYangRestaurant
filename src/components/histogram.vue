<template>
  <div id="histogram" class="histogram"></div>
  <!-- {{this.his_a}} -->
</template>
<script>
import { mapGetters, mapState, useStore } from "vuex";
export default {
  name: "MyHis",
  data() {
    // 放外面解决提示框不显示的问题
    this.histogram = null;
    return {
      option: null,
    };
  },
  computed: {
    ...mapState("histogram", {
      his_ab: "his_ab",
    }),
  },
  mounted() {
    this.initHisto();
    this.setData(["2016年", "2019年"]);
  },
  methods: {
    initHisto() {
      const doc = document.getElementById("histogram");
      this.histogram = this.$echarts.init(doc);
    },
    setData([a, b]) {
      this.option = {
        title: {
          text: "消费行为时序特征",
          subtext: "销量",
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "width:auto;",
          confine: true,
        },
        legend: {
          data: [a, b],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: false,
            },
            magicType: {
              show: true,
              type: ["line", "bar"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: a,
            type: "bar",
            data: this.$store.getters["histogram/getList"][a],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "Avg",
                },
              ],
            },
          },
          {
            name: b,
            type: "bar",
            data: this.$store.getters["histogram/getList"][b],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "Avg",
                },
              ],
            },
          },
        ],
      };
      this.histogram.setOption(this.option, true);
    },
  },
  watch: {
    // his_a:(li)=>{
    //     this.setData(li,"2019年")
    // }
    // watch内调用methods方法不能使用箭头函数
    his_ab: {
      handler(val, olVal) {
        console.log("我变化了", val, olVal);
        this.setData(val);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.histogram {
  width: 55vw;
  height: 40vh;
}
</style>
