import { createApp } from "vue";
import App from "./App.vue";
import BaiduMap from "vue-baidu-map-3x";
import * as echarts from "echarts";
import "./assets/iconfont/iconfont.css";
// import * as d3 from "d3"
// import "echarts-wordcloud"
import "../node_modules/echarts/extension/bmap/bmap";
import store from "./store";
import ui from "./components/library"
const app = createApp(App);
app.use(store);
app.use(ui)
app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "YWezsgRph4p5UU30RsrI20qXqDyPbZMO",
  // v:'2.0',  // 默认使用3.0
  // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
});

app.config.globalProperties.$echarts = echarts;
app.mount("#app");
