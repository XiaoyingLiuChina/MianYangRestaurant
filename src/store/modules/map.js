import * as d3 from "d3";
export default {
  namespaced: true,
  state() {
    return {
      option1: null,
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
