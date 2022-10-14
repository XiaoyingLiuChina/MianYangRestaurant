import { createStore } from "vuex";
import rose from "./modules/rose";
import histogram from "./modules/histogram";
import map from "./modules/map";
import ciyun from "./modules/ciyun";
import parallel from "./modules/parallel";
export default createStore({
  // 数据
  state: {},
  // 改数据函数
  mutations: {},
  // 请求数据函数
  actions: {},
  // 分模块
  modules: {
    map,
    rose,
    histogram,
    ciyun,
    parallel,
  },
  // vuex的计算属性
  getters: {},
});
