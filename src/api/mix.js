const mix = {
  data() {
    return { zhen: false, no: 0, title: '登录成功', tgg: false }
  },
  methods: {
    // 下载音乐
    async down(row) {
      const than = this.$parent
      // 创建任务
      than.schedule = than.schedule ? than.schedule : []
      // 判断当前任务是否重复
      if (than.schedule.includes(row.id)) return ''
      // 添加任务
      than.schedule.push(row.id)
      const {
        data: {
          data: [res]
        }
      } = await this.$http(`/song/url?id=${row.id}`)
      const a = 'https' + res.url.slice(4)
      // 弹出开始下载提示
      than.title = '开始下载'
      than.tgg = false
      than.zhen = true
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
        than.title = '下载完成'
        than.tgg = false
        than.zhen = true
      })
    },

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
      const a = localStorage.getItem('co')
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
      const ve = this.$parent
      const a = localStorage.getItem('co')

      this.$http(`/follow?id=${id}&t=${type}&cookie=${a}`)
        .then(value => {
          if (parseInt(value.data.code / 100) == 2) {
            if (value.data.followContent) {
              ve.title = value.data.followContent
            } else {
              ve.title = '取消关注'
            }

            ve.tgg = false
            ve.zhen = true
            this.aaaa = true
          }
        })
        .catch(err => {
          if (err) {
            ve.title = '请先登录'
            ve.tgg = true
            ve.zhen = true
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
      this.title = '登录成功'
      this.tgg = false
      this.zhen = true
      if (data.data.code !== 200) {
        this.title = '登录失败'
        this.tgg = true
        return
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
        this.$router.push('/')
        this.title = '登出账号'
        this.tgg = false
        this.zhen = true
        return ''
      }
    },
    // 点赞
    diaz(id, cid, type, like) {
      const t = Number(!like)
      const ve = this.$parent.$parent
      const a = localStorage.getItem('co')
      this.$http(`/comment/like?id=${id}&cid=${cid}&type=${type}&t=${t}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            ve.title = '点赞成功'
            ve.tgg = false
            ve.zhen = true
          }
        })
        .catch(err => {
          if (err) {
            ve.title = '请先登录'
            ve.tgg = true
            ve.zhen = true
          }
        })
      if (ve.tgg) return ''
      switch (type) {
        case 0:
          this.hotp(this, this.$route.query.id, 'music')
          break
        case 2:
          this.hotp(this, this.$route.query.id, 'playlist')
          break
      }
    },
    // 评论
    pinlu(id, text, type, t, commentId) {
      const ve = this.$parent.$parent
      const a = localStorage.getItem('co')

      this.$http(`/comment?t=${t}&type=${type}&id=${id}&content=${text}${t === 2 ? `&commentId=${commentId}` : ''}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            ve.title = '点赞成功'
            ve.tgg = false
            ve.zhen = true
          }

          switch (type) {
            case 0:
              this.hotp(this, this.$route.query.id, 'music')
              break
            case 2:
              this.hotp(this, this.$route.query.id, 'playlist')
              break
          }
        })
        .catch(err => {
          if (err) {
            ve.title = '请先登录'
            ve.tgg = true
            ve.zhen = true
          }
        })
    },
    remov(id, type, commentId) {
      const ve = this.$parent.$parent
      const a = localStorage.getItem('co')
      this.$http(`/comment?t=0&type=${type}&id=${id}&commentId=${commentId}&cookie=${a}`)
        .then(value => {
          if (value.data.code === 200) {
            this.title = '删除成功'
            this.tgg = false
            this.zhen = true
            switch (type) {
              case 0:
                this.hotp(this, this.$route.query.id, 'music')
                break
              case 2:
                this.hotp(this, this.$route.query.id, 'playlist')
                break
            }
          }
        })
        .catch(err => {
          if (err) {
            ve.title = '请先登录'
            ve.tgg = true
            ve.zhen = true
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
