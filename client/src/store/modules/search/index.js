import Vue from 'vue'

const state = {
  search: {
    administration: {},
    support: {},
    testingAll: {}
  }
};
const getters = {
  get_search: state => {
    return state.search
  }
};
const mutations = {
  set_search: (state, data) => {
    Vue.set(state.search[data.name], data.title, data.text)
  }
};
const actions = {
  SET_search_administration: async (state, data) => {
    await state.commit('set_search', data)
  }
};

export default {state, getters, mutations, actions}
