import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    load: true,
    stutus: '',
    notification: undefined,
    sts:true,
  },
  getters: {
    user: (state) => {
      return state.user
    },
    count: (state) => {
      return state.count
    },

    load: (state) => {
      return state.load
    },

    stutus: (state) => {
      return state.stutus
    },

    notification: (state) => {
      return state.notification
    },

    sts: (state) => {
      return state.sts
    },




  },

  actions: {
    user(context, user) {
      context.commit('user', user);
    },
    count(context, count) {
      context.commit('count', count);
    },
    load(context, load) {
      context.commit('load', load);
    },
    stutus(context, stutus) {
      context.commit('stutus', stutus);
    },
    notification(context, notification) {
      context.commit('notification', notification);
    },

    sts(context, sts) {
      context.commit('sts', sts);
    },

  },

  mutations: {

    user(state, user) {
      state.user = user
    },
    count(state, count) {
      state.count = count
    },
    load(state, load) {
      state.load = load
    },

    stutus(state, stutus) {
      state.stutus = stutus
    },

    notification(state, notification) {
      state.notification = notification
    },

    sts(state, sts) {
      state.sts = sts
    },



  },
  modules: {},
});
