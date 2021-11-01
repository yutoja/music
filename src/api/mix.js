const mix = {
  data() {
    return { t: 1, zhen: false, no: 0 }
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
    // 退出登录
    async logout() {
      const { data } = await this.$http('/logout')
      if (data.code == 200) {
        this.$store.dispatch('clearuser')
        return ''
      }
    },
    // 点赞
    diaz(id, cid, type) {
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')
      this.$http(`/comment/like?id=${id}&cid=${cid}&type=${type}&t=${this.t}&cookie=${a}`)

      switch (type) {
        case 0:
          this.hotp(this, this.$route.query.id, 'musie')
          break
        case 2:
          this.hotp(this, this.$route.query.id, 'playlist')
          break
      }

      this.t = this.t === 1 ? 0 : 1
    },
    // 评论
    pinlu(id, text, type, t, commentId) {
      const a = sessionStorage.getItem('co')
      if (!a) return alert('请先登录')
      this.$http(`/comment?t=${t}&type=${type}&id=${id}&content=${text}${t === 2 ? `&commentId=${commentId}` : ''}&cookie=${a}`).then(value => {
        alert('评论成功')

        switch (type) {
          case 0:
            this.hotp(this, this.$route.query.id, 'musie')
            break
          case 2:
            this.hotp(this, this.$route.query.id, 'playlist')
            break
        }
      })
    },
    remov(id, type, commentId) {
      const a = sessionStorage.getItem('co')
      this.$http(`/comment?t=0&type=${type}&id=${id}&commentId=${commentId}&cookie=${a}`).then(value => {
        if (value.data.code === 200) {
          alert('删除成功')

          switch (type) {
            case 0:
              this.hotp(this, this.$route.query.id, 'musie')
              break
            case 2:
              this.hotp(this, this.$route.query.id, 'playlist')
              break
          }
        }
      })
    },
    sr(e) {
      this.$store.dispatch('addsrc', e.target.id)
    },
    all(e) {
      const a = [...e]
      this.$store.dispatch('addsrc', a.splice(0, 1)[0].id)
      if (this.$store.state.playli.length > 499) {
        this.$store.state.playli.length = 0
      }
      a.forEach(element => {
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
        data: { hotComments, comments, total }
      } = await this.$http(`/comment/${type}?id=${id}`)

      el.hot = hotComments
      el.news = comments
      el.shu = total
    },
    // async newsa(el, id, type) {
    //   const {
    //     data: {
    //       data: {  }
    //     }
    //   } = await this.$http(`/comment/new?type=${type}&id=${id}&sortType=3`)

    // },
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
