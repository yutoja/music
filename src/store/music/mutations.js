export default {
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
  },
  user(state, data) {
    state.user = data
  },
  clearuser(state) {
    state.user = null
    localStorage.removeItem('co')
    localStorage.removeItem('user')
  }
}
