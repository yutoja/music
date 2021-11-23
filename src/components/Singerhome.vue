<template>
  <div class="SingerHome">
    <div class="nav">
      <h1 class="weig">{{ srv ? (srv.data ? srv.data.artist.name : '') : '' }}</h1>
      <!-- <span>123</span> -->
    </div>
    <div class="tou" v-if="srv && dat && jis">
      <div class="im pos">
        <img :src="srv.data.artist.cover | https | jia" alt="" class="im" />
        <div class="baj"></div>
      </div>
      <ul class="ul">
        <li :class="{ qiu: teg }" @click="teg = true">热门作品</li>
        <li :class="{ qiu: !teg }" @click="teg = false">艺人介绍</li>
      </ul>
      <div v-show="teg">
        <div class="keg">
          <a :id="dat[0].id" @click="sr"><a class="font witee"></a>播放</a>
        </div>
        <div class="tbody">
          <div class="td" v-for="(item, index) in dat" :key="item.id">
            <div class="td1">
              <span class="wi c3">{{ ++index }}</span>
              <a :class="{ font: true, rea: true, red: ef === item.id }" :id="item.id" @click="sr"></a>
            </div>
            <div class="td2">
              <router-link :to="`/Details?id=${item.id}`" class="b4 xiaolu">{{ item.name }}</router-link>
            </div>
            <div class="td3">
              <span class="b4">{{ item.dt | fezhon }}</span>
              <div class="qw">
                <a class="as" @click="bo(item.id)"></a>
                <a class="as" @click.prevent="down(item)"></a>
                <a class="as" href="#"></a>
              </div>
            </div>
            <div class="td4 qwer">
              <a href="#" class="b4 xiaolu" @click="skip('/Zhuan', item.al.id)">{{ item.al.name }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="jias" v-show="!teg">
        <h4 class="diy">{{ srv ? (srv.data ? srv.data.artist.name : '') : '' }}简历</h4>
        <p class="co">{{ jis.briefDesc }}</p>
        <div v-for="(item, index) in jis.introduction" :key="index">
          <h4>{{ item.ti }}</h4>
          <p v-html="item.txt"></p>
        </div>
      </div>
    </div>
    <Little v-else></Little>
  </div>
</template>

<script>
export default {
  name: 'SingerHome',
  props: {
    ef: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dat: null,
      srv: null,
      teg: true,
      jis: null
    }
  },
  methods: {
    fun() {
      this.$http(`/artist/top/song?id=${this.$route.query.id}`).then(value => {
        const {
          data: { songs }
        } = value
        this.dat = songs
      })
      this.$http(`/artist/detail?id=${this.$route.query.id}`).then(value => {
        const { data } = value
        this.srv = data
      })
      this.$http(`/artist/desc?id=${this.$route.query.id}`).then(value => {
        const { data } = value
        this.jis = data
      })
    }
  },

  created() {
    this.fun()
  },
  computed: {
    id() {
      this.fun()
      return this.$route.query.id
    }
  },
  filters: {
    fezhon(value) {
      const fe = parseInt(value / 60 / 1000)
      const miao = parseInt((value / 1000) % 60)
      return `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
    },
    jia(value) {
      return value + '?param=640y300'
    }
  }
}
</script>

<style scoped>
.witee {
  color: white;
  margin-right: 10px;
}
.c3 {
  color: rgb(161, 161, 161);
}
.b4 {
  color: black;
}
.wi {
  margin-left: 10px;
}
.xiaoul:hover {
  text-decoration: revert;
}
.SingerHome {
  width: 700px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 30px;
  background-color: white;
}
.nav > h1 {
  display: inline-block;
}
.nav > span {
  color: #ccc;
}
.im {
  height: 300px;
  width: 100%;
}
.ul {
  display: flex;
}
.ul > li {
  position: relative;
  top: -1px;
  box-sizing: border-box;
  text-align: center;
  line-height: 40px;
  flex: 1;
  border: 1px solid #ccc;
  border-top-color: transparent;
  border-top-width: 2px;
}
.ul > li:hover {
  border-top-color: red;
}
.red {
  color: red;
}
.keg {
  padding: 10px 5px;
}
.keg > a {
  display: inline-block;
  padding: 2px 10px;
  line-height: 25px;
  background-image: linear-gradient(180deg, #116ffc, #4c30eb);
  color: white;
  border-radius: 5px;
}
.td {
  display: flex;
  font-size: 12px;
  height: 35px;
  overflow: hidden;
}
.td > div {
  padding: 6px 10px;
  line-height: 27px;
  box-sizing: border-box;
}
.td1 {
  width: 100px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
}
.td2 {
  width: 268px;
}
.td3 {
  width: 130px;
  position: relative;
}
.td4 {
  width: 140px;
}
.td:nth-child(2n) {
  background-color: #f7f7f7;
}
.pos {
  position: relative;
}
.baj {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 300px;
  box-shadow: inset 0em -4em 60px -44px rgba(88, 88, 88, 0.5);
  width: 638px;
}
.qiu {
  border-bottom: transparent !important;
}
.jias {
  margin-top: 20px;
}
.jias h4 {
  margin: 0 0 10px 0;
}
.jias p {
  font-size: 12px;
  margin-bottom: 20px;
  color: #666;
  white-space: pre-line;
}
.co {
  text-indent: 2em;
}
.qw {
  float: right;
  display: none;
  position: absolute;
  left: 0;
  top: 0;
}
.as {
  font-family: 'icomoon';
  color: #6d6d6d;
  font-size: 20px;
  font-weight: 600;
  margin: 0 12px 0 1px;
  line-height: 30px;
}
.td:hover .qw {
  display: inline-block;
}
.td:hover > .td3 .b4 {
  color: transparent;
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
