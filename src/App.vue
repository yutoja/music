<template>
  <div :class="{ app: true, paddgin: $route.path !== '/Personage' }">
    <nav :class="{ ski: $route.path == '/Personage' }">
      <div class="m-top">
        <div class="m-wrap">
          <div class="m-logo">
            <a>云音乐</a>
          </div>
          <ul class="m-tab">
            <li :class="{ mfa: !($route.path == '/Personage') }"><router-link to="/home">发现音乐</router-link></li>
            <li :class="{ mfa: $route.path == '/Personage' }"><a @click="wode">我的音乐</a></li>
            <li><a href="#">朋友</a></li>
            <li><a href="https://music.163.com/store/product" target="_blank">商城</a></li>
            <li><a href="https://music.163.com/st/musician">音乐人</a></li>
          </ul>
          <div class="m-sou">
            <label for="m-in" class="m-la">
              <input type="text" id="m-in" v-model.trim="value" @blur="ganb" @focus="ganbb" />
            </label>
            <div class="m-souz" v-if="ggu">
              <dl v-if="seek.songs">
                <dt><span class="sia"></span>单曲</dt>
                <dd v-for="item in seek.songs" :key="item.id" class="ove" @click="skip('/Details', item.id)">
                  <a>{{ item.name }}-{{ item.artists[0].name }}</a>
                </dd>
              </dl>
              <dl v-if="seek.artists">
                <dt><span class="sia"></span>歌手</dt>
                <dd v-for="item in seek.artists" :key="item.id" class="ove" @click="skip('/SingerHome', item.id)">
                  <a>{{ item.name }}</a>
                </dd>
              </dl>
              <dl v-if="seek.albums">
                <dt><span class="sia"></span>专辑</dt>
                <dd v-for="item in seek.albums" :key="item.id" class="ove" @click="skip('/Zhuan', item.id)">
                  <a>{{ item.name }}-{{ item.artist.name }}</a>
                </dd>
              </dl>
              <dl v-if="seek.playlists">
                <dt><span class="sia"></span>歌单</dt>
                <dd v-for="item in seek.playlists" :key="item.id" class="ove" @click="skip('/Xiang', item.id)">
                  <a>{{ item.name }}</a>
                </dd>
              </dl>
            </div>
          </div>
          <button class="m-zhon">创作者中心</button>
          <a href="" class="m-deng" @click.prevent="lun = true" v-if="!sese">登录</a>
          <div v-else class="douxin">
            <img class="douy" :src="sese.profile.avatarUrl" />
            <ul class="douxin-li">
              <li @click="skip('/User', sese.profile.userId)">个人中心</li>
              <li @click="logout">登出</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-botton">
        <div class="m-nav">
          <ul>
            <li :class="{ 'm-nav_a': this.$route.path == '/home' }">
              <router-link to="/">推荐</router-link>
            </li>
            <li :class="{ 'm-nav_a': this.$route.path == '/Bang' }">
              <router-link to="/Bang?id=19723756">排行榜</router-link>
            </li>
            <li ref="geng" :class="{ 'm-nav_a': this.$route.path == '/Gedan' }">
              <router-link to="/Gedan">歌单</router-link>
            </li>
            <!-- <li :class="{ 'm-nav_a': this.$route.path == '/sss' }">
              <a href="#">主播电台</a>
            </li> -->
            <li :class="{ 'm-nav_a': this.$route.path == '/Singer' }">
              <router-link to="/Singer?area=-1">歌手</router-link>
            </li>
            <li :class="{ 'm-nav_a': this.$route.path == '/Xindie' }">
              <router-link to="/Xindie">新碟上架</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="register" ref="redister" v-if="lun">
      <div class="redh" @mousedown="weizhi"><span>手机号登录</span><span @click="lun = false">X</span></div>
      <div class="reab">
        <div class="reabb">
          <input type="text" placeholder="请输入手机号" v-model.trim="account" /><br />
          <input type="password" placeholder="请输入密码" v-if="duan" v-model.trim="password" />
          <div class="readuan" v-else>
            <input type="text" placeholder="请输入验证码" v-model.trim="verification" />
            <button @click="yztime">获取验证码</button>
          </div>
          <div class="reati"><a href="#" @click="duan = !duan">短信登录</a><a href="#">忘记密码?</a></div>
          <button class="reabu" @click="post">登录</button>
        </div>
        <div class="reafoo">
          <a> &lt; 其他登录方式</a>
          <a>没有帐号？免费注册 > </a>
        </div>
      </div>
    </div>
    <!-- <keep-alive :exclude="/xiang|detail|bang|SingerHome/"> -->
    <div class="max"><router-view :bang="austatus" @ge="cuo" @deng="uuu"></router-view></div>

    <!-- </keep-alive> -->

    <div class="footer" ref="footer" @mouseleave="mout" @mouseenter="mouov">
      <div class="fbd">
        <div class="fbd1">
          <a @click="app"></a>
          <a class="f-da" @click="stop" v-text="austatus ? '' : ''"></a>
          <a @click="add"></a>
        </div>
        <div class="fbd2">
          <router-link :to="`/Details?id=${s.id}`" target="_self" v-if="s">
            <img :src="s.al.picUrl" :title="s.al.name" class="fbd2img" />
          </router-link>
          <img src="./imgs/default_album.jpg" v-else class="fbd2img" />
        </div>
        <div class="fbd3">
          <div class="fdb3s">
            <router-link :to="`/Details?id=${s ? s.id : ''}`" class="td" target="_self">{{ s ? s.name : '' }}</router-link>
            <router-link :to="`/Singerhome?id=${item.id}`" class="td fdbs3s" v-for="(item, index) in s.ar" :key="item.id">{{ item.name }} {{ s.ar.length > 1 && index !== s.ar.length - 1 ? '/' : '' }}</router-link>
            <router-link :to="`/Singerhome?id=${s ? s.ar[0].id : ''}`" class="td fdb3stu"></router-link>
          </div>
          <div class="fdb3r">
            <div class="f-yiao" @click.stop="kuai" ref="fyiao">
              <div :style="`left:${progressBar * 100}%`" class="f-yiao_y" @mousedown="mousd" @mouseup="mousu"></div>
              <div class="quarter" :style="`width:${progressBar * 100}%`"></div>
            </div>
          </div>
        </div>
        <div class="fbd5">
          <span>{{ sleng }}</span
          >/<span>{{ leng }}</span>
        </div>
        <div class="fbd4">
          <a href="#"></a>
          <a href="#" class="f-zhonj"></a>
          <a href="#"></a>
        </div>
        <div class="fdb6">
          <a class="" @click="yinl" v-text="range < 2 ? '' : ''"></a>
          <a class="f-zhonj" @click="tiss(), (xed = xed > 1 ? 0 : ++xed)" v-text="xed > 1 ? '' : xed > 0 ? '' : ''"></a>
          <a @click="lib = !lib" title="播放列表">{{ b.length > 0 ? b.length : '' }}</a>
          <div class="range" v-if="yin">
            <input type="range" value="0" v-model="range" />
          </div>
        </div>
        <div class="lieb" v-show="lib">
          <div class="lieasi">
            <div class="liehe">
              <span>播放列表</span>
              <a class="td  wite" @click="clear"><span class="sia"></span>清空</a>
            </div>
            <div class="liebd">
              <div class="li" v-for="item in b" :key="item.id">
                <span class="sia red" :class="{ visi: item.id === s.id, vi: true }"></span>
                <a class="wite mizh ove" :id="item.id" @click="sr">{{ item.name }}</a>
                <span class="sia wite" @click="remove(item.id)"></span>
                <router-link :to="`/SingerHome?id=${item.ar[0].id}`" class="wite zuozhe td ove">{{ item.ar[0].name }}</router-link>
                <span class="wite">{{ item.dt | fezhon }}</span>
              </div>
            </div>
          </div>
          <div class="liezi">
            <div class="liezih">
              <span>{{ s ? s.name : '' }}</span>
              <a @click="lib = false">x</a>
            </div>
            <div class="liezib" ref="geh" @mousewheel="geclear">
              <div class="ttbody">
                <p v-for="(item, index) in gez" :key="index" :class="{ tran: index === zindex }" ref="lyri">{{ item.lyri }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tis" v-text="xed > 1 ? '单曲循坏' : xed > 0 ? '循坏' : '随机'" v-show="tis"></div>
        <span class="s" @click="teg" ref="foote" v-text="tef ? '' : ''"></span>
        <audio :src="s.url | https" ref="audio" @durationchange="pla" @timeupdate="yie" :id="s.id"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import win from '@/uitl/feature'
export default {
  data() {
    return {
      // 底部是否自动下拉
      tef: JSON.parse(localStorage.getItem('tef')),
      // zhonji: 20,
      // 音乐时间
      leng: '00:00',
      // 音乐播放进度
      sleng: '00:00',
      // 音频开关
      austatus: false,
      // 音频播放进度与音频时间比例
      progressBar: 0,
      // 控制音频播放时间
      fazhi: false,
      // 用户拖动音频的起始位置
      clx: 0,
      // 用户松开音频的位置
      clxx: 0,
      // 要搜索的内容
      value: '',
      // 搜索内容
      seek: [],
      // 搜索内容显示
      ggu: false,
      // 音频音量
      range: 100,
      // 音量显示
      yin: false,
      // 当前播放的歌曲
      b: this.$store.state.playli,
      // 播放列表显示状态
      lib: false,
      // 登录方式
      duan: true,
      // 登录窗口初始坐标
      xy: null,
      // 存储登录窗口的坐标
      dxy: null,
      // 登录窗口的显示状态
      lun: false,
      // 账号
      account: '',
      // 密码
      password: '',
      // 验证码
      verification: '',
      // 匹配账号是否符合
      phone: /^1[36|78|51]\d{9}$/,
      // 歌词
      gez: null,
      // 当前音乐进度
      zindex: 0,
      // 播放模式
      xed: 0,
      // 播放模式文字显示状态
      tis: false,
      // 歌词是否能滚动
      geclas: true,
      // 历史音乐
      music: JSON.parse(localStorage.getItem('music'))
    }
  },
  methods: {
    wode() {
      const user = localStorage.getItem('user')
      if (!user) {
        this.lun = true
        return
      }
      this.skip('/Personage')
    },
    kuai(e) {
      const a = (e.clientX - this.$refs.fyiao.offsetLeft) / this.$refs.fyiao.clientWidth
      this.$refs.audio.currentTime = this.$refs.audio.duration * a
    },
    uuu() {
      this.lun = true
    },
    tiss() {
      clearTimeout(this.tyuu)
      this.tis = true
      this.tyuu = setTimeout(() => {
        this.tis = false
      }, 2000)
    },
    add() {
      let a = this.b.findIndex(value => value.id === +this.$refs.audio.id)
      a = a >= this.b.length - 1 ? 0 : ++a
      this.$store.state.id = this.b[a]
    },
    app() {
      let a = this.b.findIndex(value => value.id === +this.$refs.audio.id)
      a = a <= 0 ? this.b.length - 1 : --a
      this.$store.state.id = this.b[a]
    },
    // 获取验证码
    yztime(e) {
      if (!this.phone.test(this.account)) return this.win.danwindow('请填写正确的账户', 1)
      e.target.disabled = true
      let i = 60
      e.target.innerText = `${i}秒`
      const a = setInterval(() => {
        i--
        e.target.innerText = `${i}秒`
        if (i === 0) {
          clearInterval(a)
          e.target.innerText = '获取验证码'
        }
      }, 1000)
      // 发送验证码
      this.verify(this.account)
    },
    // 登录
    post() {
      if (!this.phone.test(this.account)) return this.win.danwindow('请填写正确的账户', 1)
      if (this.duan) {
        if (!this.password) return this.win.danwindow('密码不能为空', 1)
        this.ghg({
          account: this.account,
          password: this.password
        })
      } else {
        this.ghg({
          account: this.account,
          verification: this.verification
        })
      }
      this.lun = false
      this.account = ''
      this.password = ''
      this.verification = ''
    },
    // 记录登录窗口的位置
    weizhi(e) {
      this.xy = {
        x: e.clientX,
        y: e.clientY
      }
      this.dxy = {
        x: this.$refs.redister.offsetLeft,
        y: this.$refs.redister.offsetTop
      }
    },
    // 移动登录窗口
    yido(e) {
      if (!this.xy) return ''
      this.$refs.redister.style.left = e.clientX - this.xy.x + this.dxy.x + 'px'
      this.$refs.redister.style.top = e.clientY - this.xy.y + this.dxy.y + 'px'
    },
    zhonz() {
      if (this.xy) return (this.xy = null)
    },
    // 清空列表
    clear() {
      this.$store.dispatch('clear', 'n')
    },

    remove(id) {
      this.$store.dispatch('remove', id)
    },
    cuo() {
      this.stop()
    },
    yinl() {
      this.yin = !this.yin
    },
    ganb() {
      setTimeout(() => {
        this.ggu = false
      }, 100)
    },
    ganbb() {
      if (this.value !== '') {
        setTimeout(() => {
          this.ggu = true
        }, 100)
      }
    },
    // 切换固定图标
    teg() {
      this.tef = !this.tef
      localStorage.setItem('tef', JSON.stringify(this.tef))
    },
    // 若audio有音频则播放
    pla(e) {
      const fe = parseInt(e.target.duration / 60)
      const miao = parseInt(e.target.duration % 60)
      this.leng = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      if (this.music) {
        this.music = null
        return ''
      }
      e.target.play()
      this.austatus = true
    },
    // 监听audio的播放进度
    yie(e) {
      if (!this.fazhi) {
        const fe = parseInt(e.target.currentTime / 60)
        const miao = parseInt(e.target.currentTime % 60)
        this.sleng = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
        this.progressBar = this.$refs.audio.currentTime / this.$refs.audio.duration
        if (e.target.duration === e.target.currentTime && this.b.length > 0) {
          let a = this.b.findIndex(value => value.id === +e.target.id)
          switch (this.xed) {
            case 0:
              {
                const pp = parseInt(Math.random() * this.b.length)
                this.$store.state.id = this.b[pp]
                if (a === pp) {
                  e.target.pause()
                  e.target.play()
                }
              }

              break
            case 1:
              a = a === -1 ? 0 : ++a
              a = a >= this.b.length ? 0 : a
              this.$store.state.id = this.b[a]

              break
            case 2:
              // 设置 loop 属性，使其循环播放
              // e.target.loop = true
              this.$store.state.id = this.b[a]
              e.target.pause()
              e.target.play()
              break
          }
        }
        this.zindex = this.gez.findIndex(value => value.time > e.target.currentTime) - 1
      }
    },
    // 停止或播放音乐
    stop() {
      const au = this.$refs.audio.id
      if (!au) {
        const date = new Date().getDay()
        if (date == 0 || date == 6) {
          win.danwindow('双休干活就算了，还不说干啥？', 0)
          return
        }
        win.danwindow('请分派任务', 0)
        return
      }
      this.$refs.audio.pause()
      if (!this.austatus) {
        this.$refs.audio.play()
        this.austatus = !this.austatus
      } else {
        this.$refs.audio.pause()
        this.austatus = !this.austatus
      }
    },
    mousd(e) {
      this.clx = e.clientX
      this.fazhi = true
      this.clxx = this.progressBar
    },
    mousu() {
      if (this.fazhi) {
        this.fazhi = false
        this.clxx = 0
        this.austatus = true
        this.$refs.audio.currentTime = this.$refs.audio.duration * this.progressBar
        this.$refs.audio.play()
      }
    },
    mout() {
      if (this.tef) {
        window.ine = setTimeout(() => {
          this.$refs.footer.style.bottom = '-50px'
        }, 3000)
      }
    },
    mouov() {
      clearTimeout(window.ine)
      this.$refs.footer.style.bottom = '0px'
    },
    inter(obj, target, callback) {
      clearInterval(obj.timer)
      obj.timer = setInterval(function() {
        let step = (target - obj.scrollTop) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        obj.scrollTop = step + obj.scrollTop
        if (Math.abs(obj.scrollTop - target) < 1) {
          clearInterval(obj.timer)
          if (callback) {
            callback()
          }
        }
      }, 10)
    },
    geclear() {
      clearTimeout(this.$refs.geh.qou)
      this.geclas = false
      clearInterval(this.$refs.geh.timer)
      this.$refs.geh.qou = setTimeout(() => {
        this.geclas = true
      }, 2000)
    }
  },
  filters: {
    fezhon(value) {
      const fe = parseInt(value / 60 / 1000)
      const miao = parseInt((value / 1000) % 60)
      return `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
    }
  },
  watch: {
    value: function(newva) {
      if (newva !== '') {
        // 清除之前的定时器
        clearTimeout(this.interr)
        // 设置定时器，若300毫秒无操作请求数据
        this.interr = setTimeout(async () => {
          const { data } = await this.$http(`/search/suggest?keywords=${newva}`)
          this.seek = data.result
          this.ggu = true
        }, 300)
      } else {
        this.ggu = false
      }
    },
    range(lo, ne) {
      this.$refs.audio.volume = ne / 100
      return ne
    },
    b: {
      handler() {
        this.b = this.$store.state.playli
      },
      deep: true
    },
    '$store.state.id': {
      handler() {
        this.gezi(this, this.s.id)
      }
    },
    zindex(lod, ne) {
      if (this.geclas) {
        // 统计需要滚动的位置
        const a = this.$refs.lyri.slice(0, ne).reduce((pon, value) => value.offsetHeight + pon, 0)
        this.inter(this.$refs.geh, a - 68)
      }
    }
  },
  computed: {
    s() {
      return this.$store.state.id
    },
    sese() {
      if (!this.$store.state.user) {
        localStorage.removeItem('co')
      }
      return this.$store.state.user
    }
  },
  created() {
    window.onmousemove = e => {
      if (this.fazhi) {
        const au = this.$refs.audio.id

        this.progressBar = this.clxx + (e.clientX - this.clx) / 466
        if (this.progressBar > 1) return (this.progressBar = 1)
        if (this.progressBar < 0) return (this.progressBar = 0)
        const time = this.$refs.audio.duration * this.progressBar
        const fe = parseInt(time / 60)
        const miao = parseInt(time % 60)
        if (!au) return
        this.sleng = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      }
    }
    window.onmouseup = this.mousu
    window.addEventListener('keyup', e => {
      if (this.ggu && e.keyCode === 13 && this.value) {
        if (this.$route.query.id !== this.value) {
          this.$router.push(`/Personal?id=${this.value}&type=1`)
          this.ggu = false
        }
      }
    })

    window.addEventListener('mousemove', this.yido)
    window.addEventListener('mouseup', this.zhonz)
    this.$store.dispatch('user')
    if (this.tef) {
      this.mout()
    }
    if (!this.music) return ''
    this.$store.dispatch('addsrc', this.music)
  }
}
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
:root {
  --color: #ccc;
  --color-y: black;
}
.xiaolu:hover {
  text-decoration: revert !important;
}
.paddgin {
  padding-bottom: 50px;
}
.hove {
  color: var(--color);
}
.hove:hover {
  color: var(--color-y);
}
.weig {
  font-weight: initial;
}
.ski {
  position: sticky;
  top: 0;
  z-index: 1;
}
.font {
  font-family: 'icomoon';
  color: #9b9b9b;
  font-size: 14px;
  display: inline-block;
  vertical-align: bottom;
  cursor: pointer;
}
.max {
  min-width: 98vw;
  min-height: 761px;
}
* {
  margin: 0;
  padding: 0;
}
/* html {
  user-select: none;
} */
@font-face {
  font-family: 'icomoon';
  src: url('fonts/icomoon.eot?uh69jq');
  src: url('fonts/icomoon.eot?uh69jq#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?uh69jq') format('truetype'), url('fonts/icomoon.woff?uh69jq') format('woff'), url('fonts/icomoon.svg?uh69jq#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.red {
  color: red !important;
}
a {
  text-decoration: none;
  transition: all 0.1s;
  cursor: pointer;
}
ul {
  list-style: none;
}
input,
button {
  border: none;
  outline: none;
}
.app {
  background-color: #f5f5f5;
  min-width: 1519px;
  padding-bottom: 50px;
}
.td {
  color: #242424;
}
.td:hover {
  text-decoration: revert;
}
.quarter {
  position: absolute;
  top: 0px;
  left: 0;
  height: 100%;
  background-color: red;
  border-radius: 4px;
  width: 0;
  z-index: 1;
}
.m-top {
  background-color: #242424;
  height: 70px;
  line-height: 70px;
}
.m-botton {
  height: 35px;
  background-color: #c20c0c;
}
.m-wrap {
  width: 1170px;
  margin: 0 auto;
  color: white;
  display: flex;
}
.m-logo > a {
  display: inline-block;
  height: 100%;
  width: 190px;
  padding-right: 20px;
}

.m-tab {
  display: flex;
  text-align: center;
}

.m-tab > li > a {
  display: inline-block;
  padding: 0 19px;
  height: 100%;
  color: #6d6d6d;
}
.m-tab > li > a:hover {
  color: #ccc;
  background-color: #000000;
}
.m-tab > li {
  position: relative;
}
.mfa::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 0;
  width: 0;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid #9b0909;
}
.mfa {
  background-color: #000000;
}
.mfa > a {
  color: #ffffff !important;
}
.m-la {
  width: 158px;
  line-height: 32px;
  border-radius: 32px;
  background-color: white;
  display: inline-block;
}

.m-la::before {
  content: '\ebb7';
  font-family: 'icomoon';
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
}
#m-in {
  width: 121px;
  height: 21px;
  margin-left: 5px;
  vertical-align: text-top;
}
.m-sou {
  position: relative;
  margin-left: 50px;
}
.m-souz {
  position: absolute;
  top: 60px;
  left: -10px;
  line-height: initial;
  width: 200px;
  color: #000000;
  box-shadow: 0 0 5px 5px rgba(0.5, 0.5, 0.5, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  z-index: 999;
}
.m-souz dt {
  font-size: 13px;
  padding: 3px;
  background-color: rgb(243, 243, 243);
}
.m-souz dd {
  font-size: 12px;
  line-height: 30px;
  background-color: white;
}
.m-souz dd > a {
  padding: 3px 0 3px 20px;
}
.m-souz dd:hover {
  transition: all 0.2;
  background-color: lightgray;
}
.m-souz dd:hover > a {
  color: #000000;
}
.m-souz dd a {
  color: #ccc;
}
.sia {
  font-family: 'icomoon';
  color: #9b9b9b;
  font-size: 12px;
  margin-right: 5px;
}
.m-zhon {
  height: 38px;
  width: 110px;
  border: 1px solid #4f4f4f;
  background-color: #242424;
  line-height: 32px;
  color: #bdbdbd;
  border-radius: 32px;
  margin: 15px 0 0 10px;
  font-size: 14px;
}
.m-deng {
  font-size: 14px;
  color: #6d6d6d;
  margin-left: 30px;
}
.m-deng:hover {
  text-decoration: revert;
}
.m-nav {
  width: 1100px;
  height: 34px;
  margin: 0 auto;
}
.m-nav > ul {
  margin-left: 180px;
  display: flex;
  width: 744px;
}

.m-nav > ul a {
  display: inline-block;
  padding: 0 13px;

  font-size: 14px;
  border-radius: 32px;
  color: #ffffff;
}
.m-nav > ul > li {
  padding: 7px 17px 0;
}
.m-nav_a > a {
  background-color: #9b0909;
}

.footer {
  position: fixed;
  z-index: 999;
  bottom: 0px;
  transition: all 0.2s;
  left: 0;
  height: 53px;
  width: 100%;
  background-image: linear-gradient(180deg, #3d3d3d, #000000);
  box-shadow: 0 -1px 3px 3px rgba(0.5, 0.5, 0.5, 0.2);
  user-select: none;
}
.fbd {
  width: 980px;
  height: 100%;

  margin: 0 auto;
  display: flex;
}
.fbd1 {
  padding: 15px 0 0 0;
  width: 137px;
  user-select: none;
}
.fbd1 > a {
  font-family: 'icomoon';
  font-size: 24px;
  color: rgb(201, 201, 201);
}
.f-da {
  font-size: 32px !important;
  margin: 0 10px;
  color: white !important;
}
.fbd1 > a:hover {
  color: white;
}
.fbd2img {
  width: 34px;
  height: 34px;
}
.fbd2 {
  margin: 10px 20px 0 0;
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;
  height: 34px;
  width: 34px;
}
.fdb3s {
  width: 465px;
  margin: 5px 0 0 2px;
}
.fdb3s > a:nth-of-type(1) {
  display: inline-block;
  overflow: hidden;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  margin-right: 10px;
  color: white;
  vertical-align: top;
}
.fdbs3s {
  margin-right: 5px;
  color: #9b9b9b;
  font-size: 12px;
}
.fdb3stu {
  font-family: 'icomoon';
  color: #9b9b9b;
  font-size: 12px;
}
.fdb3stu:hover {
  color: white;
}
.f-yiao {
  position: relative;
  width: 466px;
  height: 9px;
  border-radius: 4px;
  margin-top: 7px;
  margin-left: 4px;
  background-color: black;
  box-shadow: inset 0 0 7px 1px #9b9b9b;
}
.f-yiao_y {
  z-index: 2;
  position: absolute;
  top: -9px;
  left: 0;
  transform: translateX(-50%);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: white;
  box-shadow: inset 0 0 1px 1px rgba(0.5, 0.5, 0.5, 0.2);
}

.fbd4 {
  margin-left: 30px;
  font-size: 20px;
  font-family: 'icomoon';
  line-height: 63px;
}
.fbd4 > a {
  color: #9b9b9b;
}
.f-zhonj {
  margin: 0 10px;
}
.fbd4 > a:hover {
  color: white;
}
.fbd5 {
  color: #9b9b9b;
  padding-top: 31px;
  font-size: 12px;
  margin-left: 12px;
}
.fdb6 {
  margin-left: 30px;
  font-size: 20px;
  font-family: 'icomoon';
  line-height: 63px;
  color: #9b9b9b;
  position: relative;
}
.fdb6 > a {
  color: #9b9b9b;
}
.fdb6 > a:hover {
  color: white;
}
.s {
  position: absolute;
  color: #9b9b9b;
  top: -17px;
  right: 20px;
  font-family: 'icomoon';
  width: 24px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  background: #3d3d3d;
  text-align: center;
  line-height: 24px;
}
.ove {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.range {
  position: absolute;
  top: -75px;
  left: -50px;
  transform: rotate(-90deg);
  height: 30px;
  z-index: 999;
  line-height: 30px;
  padding: 0 10px;
  background-color: #000000;
  border-radius: 0 5px 5px 0;
}
.range > input {
  width: 100px;
}
.lieb {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 900px;
  height: 300px;
  border-radius: 5px 5px 0 0;
  border: 1px solid rgb(12, 12, 12);
  transform: translateX(-50%);
  overflow: hidden;
  background-color: rgba(0.5, 0.5, 0.5, 0.8);
}
.lieasi {
  width: 500px;
  float: left;
}
.liezi {
  width: 400px;
  /* border-left: 2px solid #000000; */
  float: left;
}
.liezih {
  background-color: #242424;
  line-height: 40px;
  color: white;
  padding: 0 15px;
  font-size: 14px;
  justify-content: space-between;
  border-radius: 0 5px 0 0;
  overflow: hidden;
  border-bottom: 2px solid #000000;
  text-align: center;
  width: 93%;
}
.liezih > a {
  float: right;
  font-size: 20px;
}
.liezib {
  text-align: center;
  width: 94%;
  /* background-color: rgba(0.5, 0.5, 0.5, 0.8); */
  overflow-y: scroll;
  height: 260px;
  padding: 25px 24px 0 0;
}
.ttbody {
  transition: 0.5s;
  padding-bottom: 36px;
}
.ttbody > p {
  padding: 5px 0 15px 25px;
  color: #989898;
  font-size: 12px;
  transition: all 0.5s ease;
}
.tran {
  color: white !important;
  font-size: 14px !important;
}
.wite {
  color: white;
}

.liehe {
  background-color: #242424;
  line-height: 40px;
  color: white;
  display: flex;
  padding: 0 15px;
  font-size: 14px;
  justify-content: space-between;
  border-radius: 5px 0 0 0;
  overflow: hidden;
  border-bottom: 2px solid #000000;
}
.liebd {
  font-size: 14px;
  height: 260px;
  /* background-color: rgba(0.5, 0.5, 0.5, 0.8); */
  overflow-y: scroll;
}
/* 滚动条整体部分，其中的属性: width,height,background,border等。 */
.liebd::-webkit-scrollbar {
  width: 5px;
  background-color: #242424;
}
.liezib::-webkit-scrollbar {
  width: 5px;
  background-color: #242424;
}
/* 滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。 */
/* .liebd::-webkit-scrollbar-button {
  /* display: none; */
/* }  */

/* 外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。 */
/* .liebd::-webkit-scrollbar-track {
  /* display: none; */
/* } */
/* 内层轨道，具体区别看下面gif图，需要注意的就是它会覆盖第三个属性的样式。 */
/* .liebd::-webkit-scrollbar-track-piece  */
/* 滚动条里面可以拖动的那部分 */
.liezib::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgb(136, 136, 136);
}
/* ：边角，两个滚动条交汇处 */
/* .liebd::-webkit-scrollbar-corner  */
/* 两个滚动条交汇处用于拖动调整元素大小的小控件（基本用不上） */
/* .liebd::-webkit-resizer  */
.mizh {
  display: inline-block;
  width: 260px;
  padding-left: 15px;
}
.zuozhe {
  display: inline-block;
  width: 80px;
  padding-left: 15px;
  margin-right: 15px;
}
.li {
  padding: 0 15px;
  line-height: 30px;
  display: flex;
}
.li:hover {
  background-color: #242424;
}
.vi {
  visibility: hidden;
}
.visi {
  visibility: visible;
}
.register {
  z-index: 9999;
  width: 528px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 5px;
}
.redh {
  box-sizing: border-box;
  height: 30px;
  background-color: black;
  cursor: all-scroll;
  color: white;
  padding: 6px 15px 0;
  font-size: 13px;
  user-select: none;
}
.redh > span:nth-child(1) {
  float: left;
}
.redh > span:nth-child(2) {
  cursor: pointer;
  float: right;
  color: rgb(160, 160, 160);
}
.reab {
  height: 270px;
  background-color: rgb(255, 255, 255);
  border: 1px solid transparent;
}
.reabb {
  width: 220px;
  margin: 37px auto;
}
.reabb > input {
  margin: 5px 0;
  padding: 7px;
  width: 220px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.reati {
  display: flex;
  justify-content: space-between;
  width: 218px;
  font-size: 12px;
  margin: 0 auto;
  margin-top: 10px;
}
.reati > a {
  color: #242424;
}
.readuan {
  display: flex;
  justify-content: space-between;
}

.readuan > input {
  margin: 5px 0;
  padding: 7px;
  width: 125px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.readuan > button {
  cursor: pointer;
  margin: 5px 0;
  width: 90px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.reabu {
  width: 220px;
  height: 31px;
  border-radius: 3px;
  color: white;
  background-image: linear-gradient(180deg, #4392db, #1d6ebe);
  margin-top: 10px;
}
.reabu:hover {
  background-image: linear-gradient(180deg, #98c7f7, #4392db);
}
.reafoo {
  line-height: 49px;
  width: 530px;
  border-top: 1px solid #ccc;
  background: rgb(236, 236, 236);
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
}
.reafoo > a:nth-of-type(1) {
  color: rgb(67, 67, 245);
}
.dohuan {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 35px;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 0 15px 0;
  border-radius: 20px;
  color: #7c7c7c;
  z-index: 99999;
  visibility: hidden;
}
.dohuan > span {
  float: right;
  color: rgb(67, 238, 67);
  vertical-align: middle;
}
.huanda {
  animation: sadad 2s ease-in-out 1;
}
@keyframes sadad {
  from {
    visibility: visible;
    top: 150px;
    opacity: 1;
  }
  25% {
    visibility: visible;
    top: 125px;
    opacity: 1;
  }
  to {
    top: 50px;
    opacity: 0;
    visibility: hidden;
  }
}
.douy {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 13px 0 0 20px;
}
.tis {
  position: fixed;
  line-height: 32px;
  width: 100px;
  right: 100px;
  bottom: 100px;
  text-align: center;
  color: white;
  border-radius: 5px;

  background-color: black;
}
.douxin {
  position: relative;
  height: 10px;
}
.douxin-li {
  position: absolute;
  top: 50px;
  left: -5px;
  z-index: 999;
  background: rgb(61, 61, 61);
  color: white;
  line-height: 32px;
  width: 100px;
  text-align: center;
  box-shadow: 0 0 2px 2px rgba(0.5, 0.5, 0.5, 0.2);
  border-radius: 5px;
  overflow: hidden;
  display: none;
}
.douxin-li > li {
  cursor: pointer;
}
.douxin-li > li:hover {
  background-color: rgb(134, 134, 134);
}
.douxin:hover > .douxin-li {
  display: block;
}
.ping {
  padding: 20px 0 50px 0;
}
.foote {
  text-align: center;
  margin-top: 20px;
}
.foote > a {
  display: inline-block;
  line-height: 24px;
  width: 50px;
  color: black;
  background-image: linear-gradient(180deg, #ffffff, rgb(236, 236, 236));
  margin-right: 20px;
  box-shadow: 0 0 1px 1px rgba(0.5, 0.5, 0.5, 0.2);
}
.foote > a:hover {
  background-image: linear-gradient(180deg, rgb(236, 236, 236), #ffffff);
}
.tex {
  box-shadow: 0 0 1px 1px rgba(0.5, 0.5, 0.5, 0.5);
  padding-left: 5px;
  height: 24px;
  width: 50px;
  margin-right: 10px;
}
.qwer {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  word-wrap: normal;
}
</style>
