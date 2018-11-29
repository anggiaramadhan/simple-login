import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    consumer: {}
  },
  mutations: {
    setAuthenticated(state, status) {
      state.authenticated = status;
    },
    setConsumer(state, data) {
      state.consumer = data;
    }
  }
});
