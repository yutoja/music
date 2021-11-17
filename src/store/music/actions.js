import api from '@/api/api'
import state from './state'

const actions = {
  // 添加音乐并加入到播放列表中
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
  // 加入到播放列表中
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
  // 清空播放列表
  clear(commit, va) {
    if (va === 'n') {
      commit.commit('clear')
    }
  },
  // 删除播放列表中的音乐
  remove(commit, id) {
    const a = state.playli.findIndex(value => value.id === id)
    if (a === -1) return ''
    commit.commit('remove', a)
  },
  // 添加个人用户数据
  user(commit, data) {
    commit.commit('user', data)
  },
  clearuser(commit) {
    commit.commit('clearuser')
  }
}
export default actions
