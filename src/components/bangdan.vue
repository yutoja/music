<template>
  <div class="bangdan">
    <div class="bod" v-if="data">
      <div class="aside">
        <div class="as1">
          <div class="as1_n">
            云音乐特色榜
          </div>
          <ul class="as1_b">
            <li class="as1_l" v-for="item in dat_band" :key="item.id">
              <router-link :to="`/Bang?id=${item.id}`">
                <img :src="item.coverImgUrl" />
                <div class="as1b">
                  <p>{{ item.name }}</p>
                  <div>{{ item.updateFrequency }}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="as1">
          <div class="as1_n">
            全球媒体榜
          </div>
          <ul class="as1_b">
            <li class="as1_l" v-for="item in dat_ban" :key="item.id">
              <router-link :to="`/Bang?id=${item.id}`">
                <img :src="item.coverImgUrl" />
                <div class="as1b">
                  <p>{{ item.name }}</p>
                  <div>{{ item.updateFrequency }}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="body">
        <div class="bt">
          <img :src="data.playlist.coverImgUrl" />
          <div class="btb">
            <h3>{{ data.playlist.name }}</h3>
            <p class="size">{{ time }}</p>
            <div class="btt">
              <a @click="all(data.playlist.tracks)"><a class="font wite"></a>播放</a>
              <a href="#" title="收藏"><a class="font wite black"></a>{{ data.playlist.subscribedCount }}</a>
              <a href="#" title="转发"><a class="font wite black"></a>{{ data.playlist.shareCount }}</a>
              <a href="#ping" title="评论"><a class="font wite black"></a>{{ data.playlist.commentCount }}</a>
            </div>
          </div>
        </div>
        <div class="bs">
          <div>
            <p class="h">歌曲列表</p>
            <span class="re size">{{ data.playlist.tracks.length }}首</span>
          </div>
          <div class="size">
            播放<span class="red">{{ data.playlist.playCount }}</span
            >次
          </div>
        </div>
        <table class="bb">
          <thead>
            <tr>
              <th></th>
              <th>标题</th>
              <th>时长</th>
              <th>歌手</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.playlist.tracks" :key="item.id" class="tds">
              <td class="td1">
                <span class="wi size">{{ index + 1 }}</span>
                <!-- <div class="rea size">new</div> -->
              </td>
              <td class=" td2">
                <a :class="{ font: true, red: eff === item.id }" :id="item.id" @click="sr"></a>
                <router-link :to="`/Details?id=${item.id}`" class="a ma hou size qwer">{{ item.name }}</router-link>
              </td>
              <td class="td3">
                <span class="size">{{ item.dt | capitalize }}</span>
                <div class="qw">
                  <a class="as" @click="bo(item.id)"></a>
                  <a class="as" @click.prevent="down(item)"></a>
                  <a class="as" href="#" @click.prevent="likesong(true, item.id)"></a>
                </div>
              </td>
              <td class="td4 qwer">
                <router-link :to="`/SingerHome?id=${ion.id}`" :class="{ hou: true, size: true, asdf: true, xiaolu: true, shixiao: ion.id == 0 }" v-for="(ion, index) in item.ar" :key="index">{{ ion.name }} {{ item.ar.length > 1 && index !== item.ar.length - 1 ? '/' : '' }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="ping" v-if="hot && news" id="ping">
          <Com :sw="news" :sh="hot" :su="shu" :typ="typ"></Com>
          <br />
          <Toca :consh="conshu" :tocal="current + 1" @apd="gai"></Toca>
        </div>
      </div>
    </div>
    <Little v-else></Little>
  </div>
</template>

<script>
import com from '@/views/comment'
import Toca from '@/views/tota'
export default {
  name: 'bang',
  data() {
    return {
      dat_ban: [],
      dat_band: [],
      data: null,
      da: this,
      i: 1,
      hot: null,
      news: null,
      shu: 0,
      typ: 2,
      current: 0,
      conshu: 38
    }
  },
  methods: {
    gai(value) {
      this.current = value - 1
    }
  },
  components: {
    Com: com,
    Toca
  },
  watch: {
    $route(to, from) {
      this.date(this.da, to.query.id)
      this.hotp(this, to.query.id, 'playlist')
      this.date(this, to.query.id)
      this.current = 0
    },
    async current(ne, old) {
      const {
        data: { comments }
      } = await this.$http(`/comment/playlist?id=${this.$route.query.id}&offset=${ne * 20}`)
      this.news = comments
    }
  },
  computed: {
    time() {
      if (this.data) {
        const shi = parseInt((+new Date() - this.data.playlist.updateTime) / 1000 / 60 / 6 / 24)
        return shi < 10 ? (shi < 1 ? '刚刚更新' : shi + '小时前更新') : shi / 10 + '天前更新'
      }
      return ''
    }
  },

  filters: {
    capitalize: function(value) {
      const values = value / 1000
      const fe = parseInt(values / 60)
      const miao = parseInt(values % 60)
      const time = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      return time
    }
  },
  async created() {
    this.hotp(this, this.$route.query.id, 'playlist')
    this.$http('/toplist').then(value => {
      this.dat_ban = value.data.list
      this.dat_band = this.dat_ban.splice(0, 4)
    })
    this.date(this.da, this.$route.query.id)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.shixiao {
  pointer-events: none;
}
.asdf {
  width: 130px;
  line-height: 32px;
}
.font {
  font-family: 'icomoon';
  color: #9b9b9b;
  font-size: 14px;
  display: inline-block;
  vertical-align: bottom;
  cursor: pointer;
}
.a:hover {
  text-decoration: revert;
}
.bangdan {
  background-color: #f5f5f5;
}
.bod {
  width: 982px;
  margin: 0 auto;
  display: flex;
}
.aside {
  font-size: 12px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  width: 240px;
}
.wite {
  color: white;
  margin-right: 10px;
}
.black {
  color: #9b9b9b;
}
.body {
  width: 740px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}
.as1 {
  margin-top: 30px;
}
.as1_n {
  margin-left: 10px;
  margin-bottom: 5px;
}
.as1_l > a {
  display: flex;
  padding: 10px 0 10px 20px;
}
.as1_l > a:hover {
  background-color: #ebebeb;
}
.as1_l img {
  height: 40px;
  width: 40px;
}
.as1b {
  margin-left: 10px;
}
.as1b > p {
  color: black;
  margin-top: 2px;
  margin-bottom: 8px;
}
.as1b > div {
  color: #9b9b9b;
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
  margin-left: 20px;
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
  width: 672px;
  justify-content: space-between;
  border-bottom: 2px solid red;
  margin: 0 0 0 40px;
  padding: 0 0 10px 0;
}
.bs > div:nth-child(1) {
  display: flex;
}
.bs > div:nth-child(2) {
  margin: 10px 10px 0 0;
}
.h {
  font-size: 24px;
}
.re {
  margin-left: 20px;
  margin-top: 10px;
}
.red {
  color: red;
}
.hou {
  color: black;
}
.qwer {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  word-wrap: normal;
}
table {
  text-align: left;
  border-collapse: collapse;
  margin-left: 40px;
}
.td1 {
  width: 100px;
  display: flex;
  line-height: 30px;
  overflow: hidden;
  justify-content: center;
}
.td2 {
  width: 319px;
  overflow: hidden;
}
.td3 {
  height: 30px;
  overflow: hidden;
  width: 91px;
  position: relative;
}
.td4 {
  height: 30px;
  width: 140px;
  overflow: hidden;
}
.rea {
  width: 32px;
  margin-left: 10px;
}
.wi {
  width: 38px;
  text-align: center;
}
th {
  padding: 6px 8px 6px 10px;
  font-size: 12px;
  font-weight: normal;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dbdbdb;
}
tbody td {
  padding-left: 5px;
  font-size: 12px;
}
.ma {
  margin-left: 10px;
  width: 260px;
  vertical-align: text-bottom;
}

tbody > tr:nth-child(1n) {
  background-color: #f7f7f7;
}
tbody > tr:nth-child(2n) {
  background-color: white;
}
.ping {
  padding: 20px 30px 100px 39px;
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
</style>
