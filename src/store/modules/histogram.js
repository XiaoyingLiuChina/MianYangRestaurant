// 条形图
export default {
  namespaced: true,
  state() {
    return {
      histoData: [
        [1, 2, 3, 3, 3, 1, 3, 4, 4, 2, 5],
        [7, 6, 17, 19, 24, 20, 30, 68, 91, 197, 551, 536],
        [740, 698, 743, 2045, 2517, 2223, 3527, 4097, 4285, 4771, 4693, 5172],
        [
          6068, 5920, 5932, 6612, 8220, 7444, 8143, 8383, 5714, 5606, 4151,
          4784,
        ],
        [
          4971, 4972, 4660, 5046, 5371, 5992, 7263, 7577, 6366, 7336, 6379,
          7711,
        ],
        [
          6479, 5679, 6335, 7146, 7247, 6765, 8044, 7749, 5139, 5615, 5017,
          6334,
        ],
        [
          6412, 5347, 5261, 5753, 6603, 6532, 7774, 8893, 6679, 7821, 7440,
          8072,
        ],
        [5972, 1483, 1995, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      histoData1: {},
      his_ab: ["2016年", "2019年"],//需要展示的两年
    };
  },
  getters: {
    // 将数据改造
    getList(state) {
      state.histoData.forEach((item, index) => {
        state.histoData1[`${index + 2013}年`] = [];
        state.histoData1[`${index + 2013}年`].push(...item);
      });
      return state.histoData1;
    },
  },
  mutations: {
    // 更新数据
    upDate1(state, new_data) {
      state.his_ab = new_data;
    },
  },
  actions: {
    // 更新数据
    upDate1(context, args) {
      context.commit("upDate1", args);
    },
  },
};
