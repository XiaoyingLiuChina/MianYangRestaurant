import * as d3 from "d3";
export default {
  namespaced: true,
  state() {
    return {
      option1: null,// 类别地图配置项
    };
  },
  getters: {},
  mutations: {
    updateOp1(state, newop) {
      state.option1 = newop;
    },
  },
  actions: {
    updateOp1(context, args) {
      context.commit("updateOp1", args);
    },
  },
};
