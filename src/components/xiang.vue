<template>
  <div class="w" v-if="data && zda">
    <div class="th">
      <div class="left"><img :src="data.playlist.coverImgUrl | https" :title="data.playlist.name" /></div>
      <div class="right">
        <h3 class="no"><span class="font red"></span>{{ data.playlist.name }}</h3>
        <div class="to">
          <router-link :to="`/User?id=${data.playlist.creator.userId}`" class="yo"><img :src="data.playlist.creator.avatarUrl | https" class="yo"/></router-link>
          <router-link :to="`/User?id=${data.playlist.creator.userId}`" class="ve col size">{{ data.playlist.creator.nickname }}</router-link>
          <span class="ve clo size">{{ time }} 创建</span>
        </div>
        <div class="btb">
          <div class="btt">
            <a @click="all(data.playlist.tracks)" title="播放"><a class="font wite"></a>播放</a>
            <a href="#" :title="zda.data.subscribed ? '已收藏' : '收藏'"><a class="font black"></a>({{ zda.data.bookedCount | hhuan }})</a>
            <a href="#" title="转发"><a class="font black"></a>({{ zda.data.shareCount | hhuan }})</a>
            <a href="#ping" title="评论"><a class="font black"></a>({{ zda.data.commentCount | hhuan }})</a>
          </div>
        </div>
        <div class="top">
          标签：<router-link :to="`Gedan?cat=${item}`" v-for="(item, index) in data.playlist.tags" :key="index">{{ item }}</router-link>
        </div>
        <div class="fotr"><span>介绍：</span>{{ data.playlist.description }}</div>
      </div>
    </div>
    <div class="bs">
      <div>
        <p class="h">歌曲列表</p>
        <span class="re size">{{ data.playlist.trackCount }}首</span>
      </div>
      <div class="size">
        播放：<span class="redr">{{ zda.data.playCount }}</span
        >次
      </div>
    </div>
    <table class="bb">
      <thead>
        <tr>
          <th></th>
          <th>歌曲标题</th>
          <th>时长</th>
          <th>歌手</th>
          <th>专辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.playlist.tracks" :key="item.id" class="tds">
          <td>
            <span class="wi size">{{ index + 1 }}</span>
            <a :class="{ font: true, rea: true, size: true, fff: true, redee: eff === item.id }" :id="item.id" @click="sr"></a>
          </td>
          <td>
            <router-link :to="`/Details?id=${item.id}`" class="a ma hou size xiaoul er width" :title="item.name">{{ item.name }}</router-link>
          </td>
          <td class="td3">
            <span class="size">{{ item.dt | capitalize }}</span>
            <div class="qw">
              <a class="as" @click="bo(item.id)"></a>
              <a class="as" @click.prevent="down(item)"></a>
              <a class="as" href="#"></a>
            </div>
          </td>
          <td class="qwer">
            <router-link :to="`/SingerHome?id=${ion.id}`" class="hou size asdf xiaolu" v-for="(ion, index) in item.ar" :key="index">{{ ion.name }} {{ item.ar.length > 1 && index !== item.ar.length - 1 ? '/' : '' }}</router-link>
          </td>
          <td>
            <a href="#" class="hou size er xiaoul" :title="item.al.name" @click="skip('/Zhuan', item.al.id)">{{ item.al.name }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ti">
      <p>查看更多,请下载客户端</p>
      <a href="#" class="buttno">下载客户端</a>
    </div>
    <div class="ping" v-if="hot && news" id="ping">
      <Com :sw="news" :sh="hot" :su="shu" :typ="typ"></Com>
      <br />
      <Toca :consh="conshu" :tocal="current + 1" @apd="gai" v-if="news.length > 20"></Toca>
    </div>
  </div>
  <Little v-else></Little>
</template>

<script>
import Com from '@/views/comment'
import Toca from '@/views/tota'
export default {
  name: 'xiang',
  props: {
    qu: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      data: null,
      zda: null,
      shu: null,
      hot: null,
      news: null,
      typ: 2,
      current: 0,
      conshu: 38
    }
  },
  components: {
    Com,
    Toca
  },
  methods: {
    // 页数
    gai(value) {
      this.current = value - 1
    },
    // 数据更新
    async update() {
      const id = this.$route.query.id || this.qu
      const b = localStorage.getItem('co')
      this.hotp(this, id, 'playlist')
      this.date(this, id)
      const a = await this.$http(`/playlist/detail/dynamic?id=${id}&cookie=${b}`)
      this.zda = a
    }
  },
  watch: {
    $route(to, from) {
      this.update()
      this.current = 0
    },
    // 监听页数获取数据
    async current(ne, old) {
      const {
        data: { comments }
      } = await this.$http(`/comment/playlist?id=${this.$route.query.id}&offset=${ne * 20}`)
      this.news = comments
    }
  },
  async created() {
    this.update()
  },
  computed: {
    time() {
      if (!this.data) return ''
      const a = new Date(this.data.playlist.createTime)
      return `20${a.getYear() - 100}-${a.getMonth() + 1}-${a.getDay()}`
    }
  },
  filters: {
    capitalize: function(value) {
      const values = value / 1000
      const fe = parseInt(values / 60)
      const miao = parseInt(values % 60)
      const time = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      return time
    },
    hhuan(value) {
      return value > 1_0000_0000 ? parseInt(value / 1_0000_0000) + '亿' : value > 100000 ? parseInt(value / 10000) + '万' : value
    }
  }
}
</script>

<style scoped>
.w {
  box-sizing: border-box;
  width: 709px;
  margin: 0 auto;
  padding: 47px 30px 100px 39px;
  border: 1px solid #ccc;
  background-color: white;
}
.fff {
  color: #ccc;
}
.der {
  color: red;
}
.font {
  font-family: 'icomoon';
  font-size: 16px;
}
.red {
  color: red;
  margin-right: 20px;
}
.redee {
  color: red;
}
.black {
  color: rgb(128, 128, 128);
  vertical-align: top;
  margin-right: 5px;
}
.wite {
  color: white;
  margin-right: 10px;
  vertical-align: text-bottom;
}
.th {
  display: flex;
  justify-content: space-between;
}
.left > img {
  width: 204px;
  height: 204px;
  border: 1px solid #ccc;
  padding: 2px;
}
.right {
  width: 410px;
}
.no {
  line-height: 24px;
  font-weight: normal;
  margin-bottom: 15px;
}
.to {
  line-height: 35px;
}
.yo {
  display: inline-block;
  height: 35px;
  width: 35px;
}
.col {
  color: rgb(146, 146, 243);
}
.clo {
  color: rgb(172, 172, 172);
}
.ve {
  display: inline-block;
  vertical-align: top;
  margin-left: 15px;
}

.btb > h3 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: normal;
}
.btb > p {
  margin-left: 5px;
  margin-bottom: 40px;
}
.btt > a {
  display: inline-block;
  padding: 7px 10px;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 12px;
  border: 1px solid #e0e0e0;
  color: black;
}
.btt > a:nth-of-type(1) {
  background-image: linear-gradient(180deg, #116ffc, #4c30eb);
  color: white;
}
.btt > a:nth-of-type(2) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(3) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(4) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.top {
  margin-top: 25px;
  font-size: 12px;
  color: rgb(150, 150, 150);
}
.top > a {
  padding: 2px 15px;
  margin-right: 10px;
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  color: rgb(124, 124, 124);
}
.top > a:hover {
  color: black;
}
.fotr {
  margin-top: 10px;
  font-size: 12px;
  overflow: hidden;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: rgb(150, 150, 150);
}
.width {
  width: 170px !important;
}
.er {
  display: block;
  overflow: hidden;
  width: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.bb {
  border: 1px solid #e0e0e0;
}
.bt {
  display: flex;
  padding: 40px;
}
.bt > img {
  height: 150px;
  width: 150px;
  border: 1px solid #ebebeb;
  padding: 5px;
}
.btb {
  margin-top: 20px;
}
.btb > h3 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: normal;
}
.size {
  font-size: 12px;
}
.btb > p {
  margin-left: 5px;
  margin-bottom: 40px;
}
.btt > a {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 12px;
  border: 1px solid #e0e0e0;
  color: black;
}
.btt > a:nth-of-type(1) {
  background-image: linear-gradient(180deg, #116ffc, #4c30eb);
  color: white;
}
.btt > a:nth-of-type(2) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(3) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(4) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.bs {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid red;
  margin-top: 15px;
  padding: 0 0 5px 0;
}
.bs > div:nth-child(1) {
  display: flex;
}
.bs > div:nth-child(2) {
  margin: 10px 10px 0 0;
}
.h {
  font-size: 20px;
}
.re {
  margin-left: 20px;
  margin-top: 5px;
}
.redr {
  color: red;
}
.hou {
  color: black;
}
table {
  text-align: left;
  border-collapse: collapse;
}
tbody > tr > td:nth-child(1) {
  display: flex;
}
tbody > tr > td:nth-child(2) {
  width: 200px;
}
tbody > tr > td:nth-child(3) {
  width: 100px;
}
tbody > tr > td:nth-child(4) {
  width: 100px;
}
tbody > tr > td:nth-child(5) {
  width: 100px;
}
.rea {
  width: 32px;
  margin-left: 10px;
}
.wi {
  width: 25px;
  text-align: center;
}
tbody td,
th {
  padding: 6px 8px 6px 10px;
  line-height: 20px;
  text-align: left;
  font-size: 14px;
  font-weight: normal;
}
th {
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dbdbdb;
}
.ma {
  margin-left: 10px;
}

tbody > tr:nth-child(1n) {
  background-color: #f7f7f7;
}
tbody > tr:nth-child(2n) {
  background-color: white;
}
.xiaoul:hover {
  text-decoration: revert;
}
.ti {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  font-size: 12px;
}
.ti > p {
  margin-bottom: 30px;
  color: rgb(94, 94, 94);
}
.buttno {
  padding: 10px 20px;
  border-radius: 25px;
  background-color: red;
  color: white;
}
.tex {
  box-shadow: 0 0 1px 1px rgba(0.5, 0.5, 0.5, 0.5);
  padding-left: 5px;
  height: 24px;
  width: 50px;
  margin-right: 10px;
}
.td3 {
  position: relative;
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
.tds:hover .qw {
  display: inline-block;
}
.tds:hover > .td3 .size {
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
