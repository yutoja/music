<template>
  <div class="app">
    <nav>
      <div class="m-top">
        <div class="m-wrap">
          <div class="m-logo">
            <a>网易云音乐</a>
          </div>
          <ul class="m-tab" @click="qie($event, 'm-fa')">
            <li class="m-fa"><router-link to="/home">发现音乐</router-link></li>
            <li><a href="#">我的音乐</a></li>
            <li><a href="#">朋友</a></li>
            <li><a href="https://music.163.com/store/product" target="_blank">商城</a></li>
            <li><a href="https://music.163.com/st/musician">音乐人</a></li>
          </ul>
          <div class="m-sou">
            <label for="m-in" class="m-la">
              <input type="text" id="m-in" v-model="value" @blur="ganb" @focus="ganb" />
            </label>
            <div class="m-souz" v-if="ggu">
              <dl v-if="seek.songs">
                <dt><span class="sia"></span>单曲</dt>
                <dd v-for="item in seek.songs" :key="item.id" class="ove">
                  <router-link :to="`/Details?id=${item.id}`">{{ item.name }}-{{ item.artists[0].name }}</router-link>
                </dd>
              </dl>
              <dl v-if="seek.artists">
                <dt><span class="sia"></span>歌手</dt>
                <dd v-for="item in seek.artists" :key="item.id" class="ove">
                  <router-link :to="`/SingerHome?id=${item.id}`">{{ item.name }}</router-link>
                </dd>
              </dl>
              <dl v-if="seek.albums">
                <dt><span class="sia"></span>专辑</dt>
                <dd v-for="item in seek.albums" :key="item.id" class="ove">
                  <router-link to="">{{ item.name }}-{{ item.artist.name }}</router-link>
                </dd>
              </dl>
              <dl v-if="seek.playlists">
                <dt><span class="sia"></span>歌单</dt>
                <dd v-for="item in seek.playlists" :key="item.id" class="ove">
                  <router-link :to="`/Xiang?id=${item.id}`">{{ item.name }}</router-link>
                </dd>
              </dl>
            </div>
          </div>
          <button class="m-zhon">创作者中心</button>
          <a href="" class="m-deng" @click.prevent="lun = true" v-if="!sese">登录</a>
          <img v-else :src="sese.profile.avatarUrl" class="douy" />
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
    <div :class="{ dohuan: true, huanda: this.zhen }">登录成功<span class="font"></span></div>
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
    <div class="max"><router-view :bang="austatus" @ge="cuo" :ef="s.id" @deng="uuu"></router-view></div>

    <!-- </keep-alive> -->

    <div class="footer" ref="footer" @mouseleave="mout" @mouseenter="mouov">
      <div class="fbd">
        <div class="fbd1">
          <a @click="app"></a>
          <a class="f-da" @click="stop" v-text="austatus ? '' : ''"></a>
          <a @click="add"></a>
        </div>
        <div class="fbd2">
          <router-link :to="`/Details?id=${s ? s.id : ''}`" target="_self"><img :src="s ? s.al.picUrl : ''" :title="s ? s.al.name : ''"/></router-link>
        </div>
        <div class="fbd3">
          <div class="fdb3s">
            <router-link :to="`/Details?id=${s ? s.id : ''}`" class="td" target="_self">{{ s ? s.name : '' }}</router-link>
            <router-link :to="`/Singerhome?id=${s ? s.ar[0].id : ''}`" class="td">{{ s ? s.ar[0].name : '' }}{{ s ? (s.ar[1] ? '/' + s.ar[1].name : '') : '' }}</router-link>
            <router-link :to="`/Singerhome?id=${s ? s.ar[0].id : ''}`" class="td"></router-link>
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
                <p v-for="(item, index) in gez" :key="index" :class="{ tran: index === zindex }">{{ item.lyri }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tis" v-text="xed > 1 ? '单曲循坏' : xed > 0 ? '循坏' : '随机'" v-show="tis"></div>
        <span class="s" @click="teg" ref="foote" v-text="tef ? '' : ''"></span>
        <audio :src="s.url" ref="audio" @durationchange="pla" @timeupdate="yie" :id="s.id"></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tef: true,
      zhonji: 20,
      leng: '00:00',
      sleng: '00:00',
      austatus: false,
      progressBar: 0,
      fazhi: false,
      clx: 0,
      clxx: 0,
      value: '',
      seek: [],
      ggu: false,
      range: 100,
      yin: false,
      b: this.$store.state.playli,
      lib: false,
      duan: true,
      xy: null,
      dxy: null,
      lun: false,
      account: '',
      password: '',
      verification: '',
      cookie: null,
      phone: /^1[36|78|51]\d{9}$/,
      gez: null,
      zindex: 0,
      xed: 0,
      tis: false,
      geclas: true
    }
  },
  methods: {
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
      if (!this.phone.test(this.account)) return alert('请填写正确的账户')
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
      if (!this.phone.test(this.account)) return alert('请填写正确的账户')
      if (this.duan) {
        if (!this.password) return alert('密码不能为空')
        this.ghg(
          {
            account: this.account,
            password: this.password
          },
          this
        )
      } else {
        this.ghg(
          {
            account: this.account,
            verification: this.verification
          },
          this
        )
      }

      // if (this.cookie && this.cookie.account) return alert(this.cookie.msg)
      this.zhen = false
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
        this.ggu = !this.ggu
      }, 100)
    },
    qie(e, str) {
      for (const k in [...e.target.parentNode.parentNode.children]) {
        e.target.parentNode.parentNode.children[k].className = ''
      }
      e.target.parentNode.className = str
    },
    // 切换固定图标
    teg() {
      this.tef = !this.tef
    },
    // 若audio有音频则播放
    pla(e) {
      e.target.play()
      this.austatus = true
      const fe = parseInt(e.target.duration / 60)
      const miao = parseInt(e.target.duration % 60)
      this.leng = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
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
        this.$refs.footer.ine = setTimeout(() => {
          this.$refs.footer.style.bottom = '-50px'
        }, 3000)
      }
    },
    mouov() {
      clearTimeout(this.$refs.footer.ine)
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
    value: async function(newva) {
      if (newva !== '') {
        const { data } = await this.$http(`/search/suggest?keywords=${newva}`)
        this.seek = data.result
        this.ggu = true
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
        this.inter(this.$refs.geh, ne * 36 - 68)
      }
    }
  },
  computed: {
    s() {
      return this.$store.state.id
    },
    sese() {
      return this.$store.state.user
    }
  },
  created() {
    window.onmousemove = e => {
      if (this.fazhi) {
        this.progressBar = this.clxx + (e.clientX - this.clx) / 466
        if (this.progressBar > 1) return (this.progressBar = 1)
        if (this.progressBar < 0) return (this.progressBar = 0)
        const time = this.$refs.audio.duration * this.progressBar
        const fe = parseInt(time / 60)
        const miao = parseInt(time % 60)
        this.sleng = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      }
    }
    window.onmouseup = this.mousu
    window.addEventListener('keyup', e => {
      if (this.ggu && e.keyCode === 13) {
        if (this.$route.query.id !== this.value) this.$router.push(`/Personal?id=${this.value}&type=1`)
      }
    })

    window.addEventListener('mousemove', this.yido)
    window.addEventListener('mouseup', this.zhonz)
  }
}
</script>

<style>
:root {
  --color: #ccc;
  --color-y: black;
}
.xiaolu:hover {
  text-decoration: revert;
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
  min-height: 1000px;
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
.m-fa::after {
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
.m-fa {
  background-color: #000000;
}
.m-fa > a {
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
  bottom: -53px;
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
.fbd2 > a > img {
  width: 34px;
  height: 34px;
}
.fbd2 {
  margin: 10px 10px 0 0;
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
.fdb3s > a:nth-of-type(2) {
  margin-right: 10px;
  margin-left: 10px;
  color: #9b9b9b;
  font-size: 12px;
}
.fdb3s > a:nth-of-type(3) {
  font-family: 'icomoon';
  color: #9b9b9b;
  font-size: 12px;
}
.fdb3s > a:nth-of-type(3):hover {
  color: white;
}
.f-yiao {
  position: relative;
  width: 466px;
  height: 9px;
  border-radius: 4px;
  margin-top: 10px;
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
  padding-top: 32px;
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
}
.ttbody > p {
  padding: 10px 0 10px 25px;
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
  position: absolute;
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
</style>
