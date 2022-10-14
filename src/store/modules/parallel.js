export default {
  namespaced: true,
  state() {
    return {
      // 默认的三个区域
      areaData: [
        [
          1409876198, 195075324, 521519433, 606922393, 194709752, 160799990,
          158635268, 50618491, 161059077, 1796266207, 155351477, 613116870,
          4958584, 177868842, 111671889, 1518978935, 4769510,
        ],
        [
          163339041, 162840125, 104330742, 82762440, 159262996, 1545459777,
          86321077, 40602497, 163896936, 118197195, 162711043, 77962540,
          52642020,
        ],
        [
          50295171, 6838764, 42465394, 65817757, 52602141, 71069177, 41975558,
          179358821, 50224236, 1626803327, 4281971, 41117875, 41549000,
          41221132, 42018549, 42493807, 40038896, 41450385,
        ],
      ],
      schema: [
        {
          name: "店铺",
          index: 0,
          text: "店铺",
        },
        {
          name: "店铺评分",
          index: 1,
          text: "店铺评分",
        },

        {
          name: "店铺平均价格",
          index: 2,
          text: "店铺平均价格",
        },
        {
          name: "店铺销量",
          index: 3,
          text: "店铺销量",
        },
        {
          name: "是否安全",
          index: 4,
          text: "是否安全",
        },
      ],
    };
  },

  mutations: {
    updateAreaData(state, new_area) {
      state.areaData = new_area;
      console.log(state.areaData);
    },
  },
  actions: {
    updatePara(context, args) {
      context.commit("updateAreaData", args);
    },
  },
};
