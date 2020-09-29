import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import login from "./login";
// import point from "./point"

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    // point
  }
});
