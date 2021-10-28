import Vuex from 'vuex'

import Vue from 'vue'

import api from '../api/api'

Vue.use(Vuex)

const actions = {
  async addsrc(commit, value) {
    const { data: res } = await api(`/song/url?id=${value}`)
    const {
      data: {
        songs: [{ name, id, al, ar, tns, dt }]
      }
    } = await api(`/song/detail?ids=${res.data[0].id}`)
    const dui = {
      url: res.data[0].url,
      al,
      ar,
      id,
      name,
      tns,
      dt
    }
    commit.commit('addsrc', dui)
    if (state.playli.some(value => value.id === dui.id)) return ''
    commit.commit('addbo', dui)
  },
  async addbo(commit, value) {
    const { data: res } = await api(`/song/url?id=${value}`)
    const {
      data: {
        songs: [{ name, id, al, ar, tns, dt }]
      }
    } = await api(`/song/detail?ids=${res.data[0].id}`)
    const dui = {
      url: res.data[0].url,
      al,
      ar,
      id,
      name,
      tns,
      dt
    }
    if (state.playli.some(value => value.id === dui.id)) return ''
    commit.commit('addbo', dui)
  },
  clear(commit, va) {
    if (va === 'n') {
      commit.commit('clear')
    }
  },
  remove(commit, id) {
    const a = state.playli.findIndex(value => value.id === id)
    if (a === -1) return ''
    commit.commit('remove', a)
  }
}
const mutations = {
  addsrc(state, value) {
    state.id = value
  },
  addbo(state, value) {
    state.playli.push(value)
  },
  clear(state) {
    state.playli.splice(0)
  },
  remove(state, index) {
    state.playli.splice(index, 1)
  }
}

const state = {
  id: '',
  playli: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store
