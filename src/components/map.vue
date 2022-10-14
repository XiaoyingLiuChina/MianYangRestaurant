<template>
  <div class="mapall">
    <div id="map" class="map"></div>

    <AppButton :isArea="isArea" @change="getIsArea"></AppButton>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "MyMap",
  data() {
    this.map = null;
    return {
      mapData: null,
      option: null,
      option1: this.$store.state.map.option1, // 单一类别时用的的配置项

      isArea: false,
      areaData: [],

      isStart: false,
      //   isEnd:true,

      timer: null,
      time: 2013,
    };
  },
  provide() {
    return {
      test: this,
    };
  },

  mounted() {
    this.initMap();
  },

  methods: {
    getThisAreaData(point) {
      let temp = [];
      this.mapData["features"].forEach((item, index) => {
        if (
          item["geometry"][0] >= point.data[0] - 0.01 &&
          item["geometry"][0] <= point.data[0] + 0.01 &&
          item["geometry"][1] >= point.data[1] - 0.01 &&
          item["geometry"][1] <= point.data[1] + 0.01
        ) {
          temp.push(item["properties"]["poiId"]);
        }
      });
      return temp;
    },
    getIsArea(res) {
      this.isArea = res;
      if (this.isArea) {
        this.map.off("click");
        // 重写click
        this.map.on("click", (point) => {
          if (this.areaData.length < 2) {
            //这里可以添加提示
            this.areaData.push(this.getThisAreaData(point));
            this.$message({
              type: "success",
              text: "区域选择成功，请点击下一个区域",
            });
          } else if (this.areaData.length == 2) {
            this.areaData.push(this.getThisAreaData(point));
            this.$message({
              type: "success",
              text: "区域选择完毕，即将重绘平行坐标图",
            });
            this.$store.dispatch("parallel/updatePara", this.areaData);
            this.areaData = [];
          }
        });
      } else {
        this.map.off("click");
          this.map.on("click", (point) => {
        let temp = this.getInfo(point, "poiId");
        this.$store.dispatch("ciyun/drawChart", temp);
      });
      }
    },

    initMap() {
      d3.json("map.json").then((data) => {
        this.mapData = data;
        this.drawMap();
        this.initOption();
        this.initEvent();

        this.map.setOption(this.option, true);
      });
    },
    initOption() {
      this.option = {
        title: {
          text: "绵阳餐饮大地图分析模式",
          left: "center",
        },
        tooltip: {
          formatter: (params) => {
            return `店铺名称：${this.getInfo(params, "name")}</br>
                类别：${this.getInfo(params, "leibie")}</br>
                开店时间：${this.getInfo(params, "openTime")}</br>
                电话：${this.getInfo(params, "phone")}</br>
                地址：${this.getInfo(params, "address")}</br>`;
          },
        },
        legend: {
          show: true,
          data: ["评分:0~1", "评分:1~2", "评分:2~3", "评分:3~4", "评分:4~5"],
          orient: "vertical",
          left: "left",
        },

        bmap: {
          center: [104.741776, 31.492213],
          zoom: 12,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          pitch: 90,
        },

        series: [
          {
            name: "评分:0~1",
            type: "scatter",
            coordinateSystem: "bmap",
            symbolSize: 10,
            symbol: "circle",
            symbolOffset: [0, "-50%"],
            data: this.getMapData(0, 1),
          },

          {
            name: "评分:1~2",
            type: "scatter",
            coordinateSystem: "bmap",
            symbolSize: 10,
            symbol: "circle",
            symbolOffset: [0, "-50%"],
            data: this.getMapData(1, 2),
          },

          {
            name: "评分:2~3",
            type: "scatter",
            coordinateSystem: "bmap",
            symbolSize: 10,
            symbol: "circle",
            symbolOffset: [0, "-50%"],
            data: this.getMapData(2, 3),
          },

          {
            name: "评分:3~4",
            type: "scatter",
            coordinateSystem: "bmap",
            symbolSize: 10,
            symbol: "circle",
            symbolOffset: [0, "-50%"],
            data: this.getMapData(3, 4),
          },

          {
            name: "评分:4~5",
            type: "scatter",
            coordinateSystem: "bmap",
            symbolSize: 10,
            symbol: "circle",
            symbolOffset: [0, "-50%"],
            data: this.getMapData(4, 5),
          },
        ],
      };
    },
    drawMap() {
      const doc = document.getElementById("map");
      this.map = this.$echarts.init(doc);
      this.map.clear();
    },
    initEvent() {
      this.map.on("click", (point) => {
        let temp = this.getInfo(point, "poiId");
        this.$store.dispatch("ciyun/drawChart", temp);
      });
      let why=0
      this.map.on("dblclick", (point) => {
        // 修改option
        const key = this.getInfo(point, "leibie");
        why=why+1
        console.log(why,this.option1);

        if (this.option1 == null) {
          this.option1 = {
            title: {
              text: "绵阳餐饮单一类别地图--" + key,
              right: "center",
            },

            tooltip: {
              formatter: (params) => {
                return `店铺名称：${this.getInfo(params, "name")}</br>
                类别：${this.getInfo(params, "leibie")}</br>
                开店时间：${this.getInfo(params, "openTime")}</br>
                电话：${this.getInfo(params, "phone")}</br>
                地址：${this.getInfo(params, "address")}</br>`;
              },
            },
            bmap: {
              center: [104.741776, 31.492213],
              zoom: 12,
              roam: true,
              pitch: 90,
            },
            legend: {
              show: true,
              data: [key],
              orient: "vertical",
              left: "left",
            },
            series: [
              {
                name: key,
                type: "scatter",
                coordinateSystem: "bmap",
                symbolSize: 10,
                color: "red",
                symbol: "pin",
                symbolSize: 25,
                symbolOffset: [0, "-50%"],
                data: this.getChooseOneKind(key),
              },
            ],
          };

          this.map.clear();
          this.map.setOption(this.option1, true);
        } else {
          this.option1 = null;
          this.$message({ type: "success", text: "返回评分地图" });
         
          this.map.clear();
           this.drawMap();
          this.map.setOption(this.option, true);
        }
      });
    },
    getChooseOneKind(key) {
      let temp = [];
      this.mapData["features"].forEach((item) => {
        if (item["properties"]["leibie"] == key) {
          temp.push(item["geometry"]);
        }
      });
      return temp;
    },

    getMapData(min, max, year = 2022) {
      const temp = [];
      this.mapData["features"].forEach((item, index) => {
        if (item["properties"]["open"] <= year) {
          if (
            item["properties"]["avgScore"] >= min &&
            item["properties"]["avgScore"] < max
          )
            temp.push(item["geometry"]);
        }
      });
      return temp;
    },
    // 工具函数取出properties中需要的数据
    getInfo(point, str) {
      let temp = [];
      this.mapData["features"].forEach((item, index) => {
        if (
          item["geometry"][0] === point.data[0] &&
          item["geometry"][1] === point.data[1]
        ) {
          temp = item["properties"][str];
        }
      });
      return temp;
    },
  },
  watch: {
    isStart: {
      handler(val, olVal) {
        console.log("我变化了", val, olVal);
        if (val === true) {
          this.timer = setInterval(() => {
            this.map.clear();
            // 修改option
            if (this.option) {
              // 修改series数据
              for (let i = 0; i < 5; i++) {
                this.option.series[i].data = this.getMapData(
                  i,
                  i + 1,
                  this.time
                );
              }
              //   修改标题
              this.option.title.text = `绵阳餐饮${this.time}年店铺分布特征`;
            }

            this.map.setOption(this.option, true);
            if (this.timer != null) {
              this.time = this.time + 1;
              if (this.time == 2021) {
                this.time = 2013;
              }
            }
          }, 1000);
        } else {
          clearInterval(this.timer);
          this.map.clear();
          this.initOption();
          this.initEvent();

          this.map.setOption(this.option, true);
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* .bm-view {
  width: 70vw;
  height: 50vh;
} */
.mapall {
  display: flex;
  flex-direction: column;
}
.map {
  position: relative;
  width: 40vw;
  height: 50vh;
}
</style>
