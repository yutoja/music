<template>
  <div class="details" v-if="scr">
    <div class="di">
      <div class="left">
        <div :class="{ rid: true, rotate: banggg && this.$route.query.id == ef }"></div>
        <div :class="{ led: true, key: true, keys: !banggg || this.$route.query.id != ef }" :id="scr[0].id" @click="srr"><img :src="scr[0].al.picUrl" :title="scr[0].al.name" :id="scr[0].id" /></div>
      </div>
      <div class="right">
        <h2 class="tou">{{ scr[0].name }}</h2>
        <div class="ming">
          歌手： <span class="blue xiaolu" @click="skip('/Singerhome', scr[0].ar[0].id)">{{ scr[0].ar[0].name }}</span>
          <p>
            专辑： <span class="blue xiaolu" @click="skip('/Zhuan', scr[0].al.id)">{{ scr[0].al.name }}</span>
          </p>
        </div>
        <div :class="{ ooo: bl, tbody: true }" v-if="gez && gez.length > 0">
          <p v-for="(item, index) in gez" :key="index">{{ item.lyri }}</p>
        </div>
        <div v-else class="tbody">纯音乐</div>
        <p class="eulb xiaolu" v-text="`${bl ? '展开' : '收起'}`" @click="ert" v-if="gez && gez.length > 0"></p>
      </div>
    </div>
    <div class="ping" v-if="hot && news">
      <Com :sw="news" :sh="hot" :su="shu" :typ="typ"></Com>
      <div class="foote">
        <a @click="app">上一页</a>
        <input type="number" placeholder="页数" class="tex" v-model="yeshu" />
        <a @click="re">跳转</a>
        <a @click="add">下一页</a>
      </div>
    </div>
  </div>
  <Little v-else></Little>
</template>
<script>
import Com from '@/views/comment'

export default {
  props: {
    bang: {
      type: Boolean,
      default: false
    },
    ef: {
      type: Number,
      default: 0
    }
  },
  name: 'detail',
  data() {
    return {
      hot: null,
      news: null,
      gez: null,
      bl: true,
      scr: null,
      shu: null,
      yeshu: 0,
      typ: 0
    }
  },
  components: {
    Com
  },
  methods: {
    srr(e) {
      this.$emit('ge')
      this.sr(e)
    },
    ert() {
      this.bl = !this.bl
    },
    async add() {
      if (this.yeshu < 0) {
        this.yeshu = 0
        return alert('这页数认真的吗')
      }
      this.yeshu++
      const {
        data: { comments }
      } = await this.$http(`/comment/music?id=${this.$route.query.id}&offset=${this.yeshu * 20}`)
      this.news = comments
    },
    async app() {
      if (this.yeshu <= 0) {
        this.yeshu = 0
        return alert('这页数认真的吗')
      }
      this.yeshu--
      const {
        data: { comments }
      } = await this.$http(`/comment/music?id=${this.$route.query.id}&offset=${this.yeshu * 20}`)
      this.news = comments
    },
    async re() {
      if (this.value < 1) alert('这页数认真的吗')
      const {
        data: { comments }
      } = await this.$http(`/comment/music?id=${this.$route.query.id}&offset=${this.yeshu * 20}`)
      this.news = comments
    }
  },
  watch: {
    async $route(to, from) {
      this.hotp(this, to.query.id, 'music')
      this.gezi(this, to.query.id)
      const {
        data: { songs }
      } = await this.$http(`/song/detail?ids=${to.query.id}`)
      this.scr = songs
    }
  },
  computed: {
    banggg() {
      return this.bang
    }
  },
  filters: {
    capitalize: function(val) {
      const shi = parseInt((+new Date() - val) / 1000 / 60 / 6 / 24)
      if (shi / 10 > 30) {
        const a = new Date(val)
        return `20${a.getYear() - 100}-${a.getMonth() + 1}-${a.getDay()}`
      }
      return shi < 10 ? (shi < 1 ? '刚刚更新' : shi + '小时前更新') : parseInt(shi / 10) + '天前'
    },
    apitalize: function(val) {
      const shi = parseInt(((+new Date() - val) / 1000 / 60) % 60)
      return shi < 60 ? (shi < 1 ? '刚刚更新' : shi + '分钟前') : shi / 60 + '小时前'
    }
  },

  async beforeMount() {
    this.hotp(this, this.$route.query.id, 'music')
    this.gezi(this, this.$route.query.id)
    const {
      data: { songs }
    } = await this.$http(`/song/detail?ids=${this.$route.query.id}`)
    this.scr = songs
  }
}
</script>

<style scoped>
.details {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 47px 30px 100px 39px;
  width: 709px;
  border: 1px solid #ccc;
  background-color: white;
}
.ping {
  margin-top: 30px;
}
.di {
  display: flex;
  justify-content: space-between;
}
.left {
  position: relative;
  height: 200px;
  width: 200px;
}
.led {
  height: 200px;
  width: 200px;
  margin: 15px 0 0 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../imgs/disc.png') no-repeat;
  background-size: cover;
  cursor: pointer;
}
.led > img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.rid {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  z-index: 999;
  height: 120px;
  transform: rotate(-20deg);
  transform-origin: 23px 5px;
  background: url('../imgs/stylus.png') round;
  transition: all 0.3s;
}
.rotate {
  transform: rotate(0deg);
}
.right {
  width: 400px;
}
.tou {
  font-weight: normal;
  margin-bottom: 10px;
}
.ming {
  color: black;
  font-size: 12px;
}
.ming > p:nth-child(2) {
  margin-top: 10px;
}
.tbody {
  padding: 20px 20px;
  width: 100%;
  overflow: hidden;
}
.ooo {
  height: 200px;
}
.tbody > p {
  padding: 10px 0 11px 25px;
  color: black;
  font-size: 12px;
}

.bo {
  font-family: 'icomoon';
}
.qufoot {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.qu {
  flex: 1;
}
.blue {
  color: blue;
}
.bo > span {
  margin: 0 5px;
}
.xiaolu:hover {
  text-decoration: underline;
  cursor: pointer;
}
.eulb {
  color: rgb(134, 134, 206);
  margin-left: 43px;
  font-size: 12px;
  font-family: 'icomoon';
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
.key {
  animation: hja 12s linear infinite;
}
.keys {
  animation-play-state: paused;
}
@keyframes hja {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
