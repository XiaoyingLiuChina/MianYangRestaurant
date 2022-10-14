import * as d3 from "d3";
export default {
  namespaced: true,
  state() {
    return {
      point: "种类", //渲染评价词云还是种类词云
    };
  },
  getters: {},
  mutations: {
    upDatePoint(state, new_point) {
      state.point = new_point;
    },
  },
  actions: {
    drawChart(context, args) {
      context.commit("upDatePoint", args);
    },
  },
};
