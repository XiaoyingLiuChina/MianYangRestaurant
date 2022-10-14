<template>
  <div id="parallel" class="parallel"></div>
</template>
<script>
import * as d3 from "d3";
import { mapState } from "vuex";

export default {
  name: "MyPara",
  data() {
    this.parallel = null;
    return {
      paraData: null,
      option: null,
      schema: this.$store.state.parallel.schema,
    };
  },
  mounted() {
    this.initPara();
    // this.setData()
  },
  computed: {
    ...mapState("parallel", {
      areaData: "areaData",
    }),
  },
  watch: {
    areaData: {
      handler(val, olVal) {
        console.log("我变化了", val, olVal);
        this.drawPara();
      },
      deep: true,
    },
  },
  methods: {
    initPara() {
      d3.csv("parallel.csv").then((data) => {
        this.paraData = data;
        this.drawPara();
      });
    },
    drawPara() {
      const doc = document.getElementById("parallel");
      this.parallel = this.$echarts.init(doc);
      this.option = {
        title: {
          text: "不同地域店铺信息对比",
        },
        legend: {
          right: 10,
          bottom: "center",
          orient: "vertical",
          data: ["①", "②", "③"],
          itemGap: 20,
          textStyle: {
            color: "#333",
            fontSize: 14,
          },
        },
        tooltip: {
          show: true,
          formatter: (params) => {
            // console.log(params);
            // ["③", "3.5", "48", "1500", "True"]
            return `区域：${params.data[0]}评分：${params.data[1]}均价：${params.data[2]}安全许可：${params.data[3]}`;
          },
        },

        parallelAxis: [
          {
            dim: 0,
            name: this.schema[0].text,
            inverse: true,
            type: "category",
            data: ["①", "②", "③"],
            nameLocation: "start",
          },
          {
            dim: 1,
            name: this.schema[1].text,
            max:5
          },

          {
            dim: 2,
            name: this.schema[2].text,
            max:200
          },
          {
            dim: 3,
            name: this.schema[3].text,
            max: 1600,
          },
          {
            dim: 4,
            name: this.schema[4].text,
            type: "category",
            data: ["False", "True"],
          },
        ],

        parallel: {
          left: "5%",
          right: "18%",
          parallelAxisDefault: {
            type: "value",
            nameLocation: "end",
            nameGap: 20,
            nameTextStyle: {
              color: "#333",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#333",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#333",
              },
            },

            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#333",
            },
          },
        },
        series: [
          {
            name: "①",
            type: "parallel",
            lineStyle: { width: 2, opacity: 0.3 },
            emphasis: {
              lineStyle: {
                opacity: 1,
                color:'red'
              },
            },
            data: this.getSeries(0, "①"),
          },
          {
            name: "②",
            type: "parallel",
            lineStyle: { width: 2, opacity: 0.3 },
            emphasis: {
              lineStyle: {
                opacity: 1,
                color:'red'
              },
            },
            data: this.getSeries(1, "②"),
          },
          {
            name: "③",
            type: "parallel",
            lineStyle: { width: 2, opacity: 0.3 },
            emphasis: {
              lineStyle: {
                opacity: 1,
                color:'red'
              },
            },
            data: this.getSeries(2, "③"),
          },
        ],
      };
      this.parallel.setOption(this.option, true);
    },
    getSeries(index, title) {
      let res = [];
      this.areaData[index].forEach((id) => {
        for (let i = 0; i < this.paraData.length; i++) {
          if (id == this.paraData[i].poiId) {
            // 找到就是一条数据
            let temp = [];
            temp.push(
              title,
              this.paraData[i].avgScore,
              this.paraData[i].avgPrice,
              this.paraData[i].num,
              this.paraData[i].hasFoodSafeInfo
            );
            res.push(temp);
          }
        }
      });
      return res;
    },
  },
};
</script>
<style scoped>
.parallel {
  width: 50vw;
  height: 40vh;
}
</style>
