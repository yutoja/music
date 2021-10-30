const mix = {
  data() {
    return { t: 1, zhen: false }
  },
  methods: {
    // 获取验证码
    verify(phone) {
      this.$http(`/captcha/sent?phone=${phone}`)
    },
    // 跳转页面
    skip(path, id) {
      this.$router.push({
        path,
        query: {
          id: id
        }
      })
    },
    // 访问他人歌单
    visit(id) {
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')

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
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')
      this.$http(`/follow?id=${id}&t=${type}&cookie=${a}`).then(value => {
        if (value.code === 200) {
          return 1
        }
      })
    },
    // 登录
    async ghg(obj, na) {
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

      if (data.data.code !== 200) return alert('。。。。')
      this.zhen = true
      sessionStorage.setItem('co', data.data.cookie)
      // 获取指定的cookie
      // console.log(document.cookie.replace(/(?:(?:^|.*;\s*)text\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
      const {
        data: { account, profile, bindings, token }
      } = data
      this.$store.dispatch('user', {
        account,
        profile,
        bindings,
        token
      })
    },
    // 点赞
    diaz(id, cid, type) {
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')
      this.$http(`/comment/like?id=${id}&cid=${cid}&type=${type}&t=${this.t}&cookie=${a}`)

      this.t = this.t === 1 ? 0 : 1
    },
    // 评论
    pinlu(id, text, type, t, commentId) {
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')
      this.$http(`/comment?t=2&type=1&id=5436712&content=${text}${t === 2 ? `&commentId=${6281318440}` : ''}&cookie=${a}`).then(value => {})
    },
    sr(e) {
      this.$store.dispatch('addsrc', e.target.id)
    },
    all(e) {
      this.$store.dispatch('addsrc', e.splice(0, 1)[0].id)
      e.forEach(element => {
        this.$store.dispatch('addbo', element.id)
      })
    },
    bo(id) {
      this.$store.dispatch('addbo', id)
    },
    async date(obj, id) {
      const { data } = await this.$http(`/playlist/detail?id=${id}&s=-1`)
      obj.data = data
    },
    async hotp(el, id, type) {
      const {
        data: { hotComments }
      } = await this.$http(`/comment/hot?id=${id}&type=${type}`)
      el.hot = hotComments
    },
    async newsa(el, id, type) {
      const {
        data: {
          data: { comments, totalCount }
        }
      } = await this.$http(`/comment/new?type=${type}&id=${id}&sortType=3`)

      el.news = comments

      el.shu = totalCount
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
  }
}
export default mix
