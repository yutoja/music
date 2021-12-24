import win from '@/uitl/feature'

const mix = {
  data() {
    return { no: 0 }
  },
  methods: {
    // 下载音乐
    async down(row) {
      const than = this.$parent
      // 创建任务
      than.schedule = than.schedule || []
      // 判断当前任务是否重复
      if (than.schedule.includes(row.id)) return win.danwindow('正在下载', 0)
      // 添加任务
      than.schedule.push(row.id)
      const {
        data: {
          data: [res]
        }
      } = await this.$http(`/song/url?id=${row.id}`)
      const a = 'https' + res.url.slice(4)
      win.danwindow('开始下载', 0)
      // 弹出开始下载提示  复用一个弹出窗口，若需用将 win.danwindow('***', 0)改为下方即可
      // than.title = '开始下载'
      // than.tgg = false
      // than.zhen = true
      this.$http({
        method: 'get',
        url: a,
        responseType: 'blob'
      }).then(response => {
        const href = URL.createObjectURL(response.data)
        const a = document.createElement('a')
        a.setAttribute('href', href)
        a.setAttribute('download', row.name)
        a.click()
        URL.revokeObjectURL(href)
        // 删除完成的进度
        than.schedule.splice(than.schedule.indexOf(than.schedule), 1)
        // 弹出提示
        win.danwindow('下载完成', 0)
      })
    },
    // 获取验证码
    verify(phone) {
      this.$http(`/captcha/sent?phone=${phone}`)
    },
    // 跳转页面
    skip(path, id) {
      const http = this.$route
      if (http.path == path && http.query.id == id) return
      this.$router.push({
        path,
        query: {
          id: id
        }
      })
    },
    // 访问他人歌单
    visit(id) {
      const a = localStorage.getItem('co')
      if (!a) return win.danwindow('请先登录', 1)

      this.$router.push({
        path: '/Xiang',
        query: {
          id: id
        },
        params: {
          cookie: a
        }
      })
    },
    // 关注
    guzh(id, type) {
      const a = localStorage.getItem('co')
      this.$http(`/follow?id=${id}&t=${type}&cookie=${a}`)
        .then(value => {
          if (parseInt(value.data.code / 100) == 2) {
            if (value.data.followContent) {
              win.danwindow(value.data.followContent, 0)
            } else {
              win.danwindow('取消关注', 0)
            }
            this.aaaa = true
          }
        })
        .catch(err => {
          if (err) {
            win.danwindow('请先登录', 1)
          }
        })
    },
    // 登录
    async ghg(obj) {
      let data

      if (obj.verification) {
        this.$http(`/captcha/verify?phone=${obj.account}&captcha=${obj.verification}`)
          .then(async value => {
            data = await this.$http(`/login/cellphone?phone=${obj.account}&captcha=${obj.verification}`)
          })
          .catch(() => {
            return ''
          })
      } else {
        data = await this.$http(`/login/cellphone?phone=${obj.account}&password=${obj.password}`)
      }

      if (data.data.code !== 200) {
        win.danwindow('登录失败', 1)
        return
      } else {
        win.danwindow('登录成功', 0)
      }

      localStorage.setItem('co', data.data.cookie)
      // 获取指定的cookie
      // console.log(document.cookie.replace(/(?:(?:^|.*;\s*)text\s*\=\s*([^;]*).*$)|^.*$/, '$1'))

      const {
        data: { account, profile, bindings, token }
      } = data
      localStorage.setItem(
        'user',
        JSON.stringify({
          account,
          profile,
          bindings,
          token
        })
      )
      this.$store.dispatch('user')
    },
    // 退出登录
    async logout() {
      const { data } = await this.$http('/logout')
      if (data.code == 200) {
        this.$store.dispatch('clearuser')
        this.$route.path != '/home' && this.$router.push('/')
        win.danwindow('登出账号', 0)
        return ''
      }
    },
    // 添加歌曲
    async likesong(type, id) {
      const as = localStorage.getItem('co')
      const a = await this.$http(`/like?id=${id}&like=${type}&cookie=${as}`)
      if (a.status == 200) {
        win.danwindow('收藏OK', 0)
      }
    },
    // 收藏歌单
    async collect(id, collec) {
      // const a = await this.$http('/playlist/subscribe?t=1&id=106697785')
    },
    // 点赞
    diaz(id, cid, type, like) {
      const than = this
      const t = Number(!like)
      const a = localStorage.getItem('co')
      this.$http
        .post(`/comment/like?id=${id}&cid=${cid}&type=${type}&t=${t}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            if (t) {
              win.danwindow('点赞成功', 0)
            } else {
              win.danwindow('取消点赞', 0)
            }
            // 刷新数据
            win.reques(than, type)
          }
        })
        .catch(err => {
          if (err) {
            win.danwindow('请先登录', 1)
          }
        })
    },
    // 评论
    pinlu(id, text, type, t, commentId) {
      const than = this
      const a = localStorage.getItem('co')
      this.$http(`/comment?t=${t}&type=${type}&id=${id}&content=${text}${t === 2 ? `&commentId=${commentId}` : ''}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            win.danwindow('已评论', 0)
          }
          // 刷新数据
          win.reques(than, type)
        })
        .catch(err => {
          if (err) {
            win.danwindow('请先登录', 0)
          }
        })
    },
    remov(id, type, commentId) {
      const than = this
      const a = localStorage.getItem('co')
      this.$http(`/comment?t=0&type=${type}&id=${id}&commentId=${commentId}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            win.danwindow('已删除', 0)
            // 刷新数据
            win.reques(than, type)
          }
        })
        .catch(err => {
          if (err) {
            win.danwindow('请先登录', 1)
          }
        })
    },
    sr(e) {
      this.$store.dispatch('addsrc', e.target.id)
    },
    // 载入当前歌单
    all(e) {
      const a = [...e]
      this.$store.dispatch('addsrc', a.splice(0, 1)[0].id)
      if (this.$store.state.playli.length > 499) {
        this.$store.state.playli.length = 0
      }
      a.forEach(element => {
        this.$store.dispatch('addbo', { id: element.id, valu: true })
      })
    },
    // 添加到播放列表
    bo(id) {
      this.$store.dispatch('addbo', { id, valu: false })
    },
    // 获取歌单详情
    async date(obj, id) {
      const a = localStorage.getItem('co')
      const { data } = await this.$http(`/playlist/detail?id=${id}&s=-1&cookie=${a}`)
      obj.data = data
    },
    hotp(el, id, type) {
      setTimeout(async () => {
        const a = localStorage.getItem('co')
        const as = Date.now()
        const {
          data: { hotComments, comments, total }
        } = await this.$http(`/comment/${type}?id=${id}&a=${as}&cookie=${a}`)
        el.hot = hotComments
        el.news = comments
        el.shu = total
      }, 500)
    },
    async gezi(el, id) {
      try {
        const {
          data: {
            lrc: { lyric }
          }
        } = await this.$http(`/lyric?id=${id}`)
        const re = /\[([^\]]+)\]([^[]+)/g
        var result = []
        lyric.replace(re, ($0, $1, $2) => {
          result.push({ time: this.formatTimeToSec($1), lyri: $2 })
        })
        el.gez = result
      } catch (err) {}
    },
    formatTimeToSec(value) {
      const a = value.split(':')
      return parseFloat(a[0] * 60) + parseFloat((a[1] * 1).toFixed(1))
    }
  },
  computed: {
    eff() {
      return this.$store.state.id.id
    }
  }
}
export default mix
