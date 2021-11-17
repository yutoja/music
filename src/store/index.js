import Vuex from 'vuex'

import Vue from 'vue'

import state from './music/state'

import mutations from './music/mutations'

import actions from './music/actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store
