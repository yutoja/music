<template>
  <div class="Personal" v-if="dat">
    <div class="thead">
      <input type="text" class="the" v-model="value" @blur="ganb" @focus="ganb" />
      <button class="font theb" @click="kepu"></button>
      <div class="m-souz" v-if="ggu && seek.songs && value">
        <dl v-if="seek.songs">
          <dt><span class="sia"></span>单曲</dt>
          <dd v-for="item in seek.songs" :key="item.id">
            <router-link :to="`/Details?id=${item.id}`">{{ item.name }}-{{ item.artists[0].name }}</router-link>
          </dd>
        </dl>
        <dl v-if="seek.artists">
          <dt><span class="sia"></span>歌手</dt>
          <dd v-for="item in seek.artists" :key="item.id">
            <router-link to="">{{ item.name }}</router-link>
          </dd>
        </dl>
        <dl v-if="seek.albums">
          <dt><span class="sia"></span>专辑</dt>
          <dd v-for="item in seek.albums" :key="item.id">
            <router-link to="">{{ item.name }}-{{ item.artist.name }}</router-link>
          </dd>
        </dl>
        <dl v-if="seek.playlists">
          <dt><span class="sia"></span>歌单</dt>
          <dd v-for="item in seek.playlists" :key="item.id" class="ove">
            <router-link to="">{{ item.name }}</router-link>
          </dd>
        </dl>
      </div>
    </div>
    <span class="zhon"
      >收搜'{{ this.$route.query.id }}' 共<span class="red">{{ shu }}</span
      >{{ zi }}</span
    >
    <ul class="nav">
      <li>
        <label for="gedan" @click="pus(1, $event)" :class="{ labhh: $route.query.type == 1 }">单曲</label>
      </li>
      <li>
        <label for="geshu" @click="pus(100)" :class="{ labhh: $route.query.type == 100 }">歌手</label>
      </li>
      <li><label for="geuhs" @click="pus(10)" :class="{ labhh: $route.query.type == 10 }">专辑</label></li>
      <li>
        <label for="zhuj" @click="pus(1000)" :class="{ labhh: $route.query.type == 1000 }">歌单</label>
      </li>
      <li>
        <label for="zhuj" @click="pus(1014)" :class="{ labhh: $route.query.type == 1014 }">视频</label>
      </li>
    </ul>
    <div class="rouqi">
      <div class="gedan" v-for="item in dat.songs" :key="item.id" :class="{ qiang: $route.query.type == 1 }">
        <div class="body">
          <div class="bo1"><a :id="item.id" @click="sr" class="font"></a></div>
          <div class="bo2">
            <router-link :to="`/Details?id=${item.id}`" class="xiaolu over">{{ item.name }}</router-link>
            <span class="hidd"><a href="#" class="font"></a><a href="#" class="font"></a><a href="#" class="font"></a><a href="#" class="font"></a></span>
          </div>
          <div class="bo3">
            <a href="#" class="xiaolu over wind">{{ item.artists[0].name }}</a>
          </div>
          <div class="bo4">
            <a href="#" class="xiaolu over wind">《{{ item.album.name }}》</a>
          </div>
          <div class="bo5">
            <span>{{ item.duration | capitalize }}</span>
          </div>
        </div>
      </div>

      <div class="geshu" :class="{ qiang: $route.query.type == 100 }">
        <ul>
          <li class="get" v-for="item in dat.artists" :key="item.id">
            <img :src="item.img1v1Url" :title="item.name" @click="skip('/Singerhome', item.id)" />
            <p class="over">
              <router-link class="xiaoul size" :to="`/SingerHome?id=${item.id}`">{{ item.name }}</router-link>
            </p>
          </li>
        </ul>
      </div>

      <div class="geuhs" :class="{ qiang: $route.query.type == 10 }">
        <ul>
          <li class="get" v-for="item in dat.albums" :key="item.id">
            <img :src="item.picUrl" @click="skip('/Zhuan', item.id)" />
            <p class="over">
              <router-link class="xiaoul size black" :to="`/Zhuan?${item.id}`">{{ item.name }}</router-link>
            </p>
            <p class="over">
              <a class="xiaoul gexi" href="#">{{ item.artist.name }}</a>
            </p>
          </li>
        </ul>
      </div>

      <table class="zhuj" :class="{ qiang: $route.query.type == 1000 }">
        <tr class="ge" v-for="item in dat.playlists" :key="item.id">
          <td class="ge1"><a class="font" @click="sr" :id="item.track.id"></a></td>
          <td class="ge2">
            <router-link :to="`/Xiang?id=${item.id}`"><img :src="item.coverImgUrl" class="gei" :title="item.name"/></router-link>
          </td>
          <td class="ge3">
            <router-link :to="`/Xiang?id=${item.id}`" class="xiaolu over wind">{{ item.name }}</router-link>
          </td>
          <td class="ge4"><a href="#" class="font"></a><a href="#" class="font"></a><a href="#" class="font"></a></td>
          <td class="ge5">{{ item.trackCount }}首</td>
          <td class="ge6">
            by<a href="#" class="xiaolu over wind"> {{ item.creator.nickname }}</a>
          </td>
          <td class="ge7">
            <a href="#">收场：{{ item.bookCount }}</a>
          </td>
          <td class="ge8">
            <a href="#">收听：{{ item.playCount > 1000 ? `${parseInt(item.playCount / 1000) / 10}万` : item.playCount }}</a>
          </td>
        </tr>
      </table>

      <div class="geuhs" :class="{ qiang: $route.query.type == 1014 }">
        <ul>
          <li class="gett" v-for="item in dat.videos" :key="item.id">
            <img :src="item.coverUrl" @click="skip('/Vedio', item.vid)" />
            <p class="over">
              <router-link class="xiaoul size black" :to="`/Vedio?id=${item.vid}`">{{ item.title }}</router-link>
            </p>
            <p class="over">
              by <router-link class="xiaoul gexi" :to="`/User?id=${item.creator[0].userId}`">{{ item.creator[0].userName }}</router-link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      dat: null,
      value: '',
      ggu: false,
      seek: []
    }
  },
  methods: {
    pus(val) {
      if (val !== this.$route.query.type) this.$router.push(`/Personal?id=${this.$route.query.id}&type=${val}`)
    },
    ganb() {
      setTimeout(() => {
        this.ggu = !this.ggu
      }, 100)
    },
    kepu() {
      if (this.$route.query.id !== this.value) this.$router.push(`/Personal?id=${this.value}&type=1`)
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

  computed: {
    shu() {
      if (!this.dat) return ''
      if (this.dat.songs) return this.dat.songs.length
      if (this.dat.artists) return this.dat.artists.length
      if (this.dat.albums) return this.dat.albums.length
      if (this.dat.playlists) return this.dat.playlists.length
      if (this.dat.videos) return this.dat.videos.length
      return ''
    },
    zi() {
      if (!this.dat) return ''
      if (this.dat.songs) return '首单曲'
      if (this.dat.artists) return '个歌手'
      if (this.dat.albums) return '个歌单'
      if (this.dat.playlists) return '张专辑'
      if (this.dat.videos) return '个视频'
      return ''
    }
  },
  watch: {
    $route(to, from) {
      this.$http(`/search?keywords=${to.query.id}&type=${to.query.type ? to.query.type : '1'}`).then(value => {
        const {
          data: { result }
        } = value
        this.dat = result
      })
    },
    value: async function(newva) {
      if (newva !== '') {
        const { data } = await this.$http(`/search/suggest?keywords=${newva}`)
        this.seek = data.result
        this.ggu = true
      }
    }
  },
  created() {
    window.onkeyup = e => {
      if (this.ggu && e.keyCode === 13) {
        if (this.$route.query.id !== this.value) this.$router.push(`/Personal?id=${this.value}&type=1`)
      }
    }
    this.dat = ''
    this.$http(`/search?keywords=${this.$route.query.id}&type=${this.$route.query.type ? this.$route.query.type : '1'}`).then(value => {
      const {
        data: { result }
      } = value
      this.dat = result
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* .rouqi {
} */
.gexi {
  font-size: 12px;
}
.red {
  color: red;
}
a {
  color: #333;
}
.size {
  font-size: 14px;
}
.black {
  color: black;
}
.dho {
  position: fixed;
  top: -100px;
}
.Personal {
  padding: 40px 30px;
  width: 970px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
}
.thead {
  position: relative;
  height: 40px;
  width: 420px;
  margin: 0 auto 45px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 0 9px -3px rgba(0.5, 0.5, 0.5, 0.5);
}
.the {
  padding: 12px 15px;
  width: 320px;
  vertical-align: top;
}
.font {
  font-family: 'icomoon';
  font-size: 14px;
}
.xiaoul:hover {
  text-decoration: revert !important;
}
.theb {
  height: 40px;
  width: 70px;
  font-size: 24px;
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.zhon {
  font-size: 12px;
  color: #ccc;
}
.nav {
  width: 100%;
  display: flex;
  line-height: 39px;
  text-align: center;
  box-sizing: border-box;
  border-top: 2px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.nav label {
  display: inline-block;
  width: 100%;
  position: relative;
  top: -3px;
  height: 39px;
  vertical-align: middle;
  border-top: 2px solid transparent;
}
.nav > li {
  flex: 1;
}
.nav label:hover {
  border-top: 2px solid red;
}
.gedan {
  display: none;
}
.body {
  font-size: 12px;
  color: rgb(134, 134, 134);
  padding: 10px 10px 8px 18px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
}
.bo1 {
  width: 40px;
}
.bo2 {
  width: 400px;
  height: 100%;
  margin-right: 15px;
}
.bo2 > *:nth-child(1) {
  width: 265px;
  float: left;
}
.bo2:hover > span {
  visibility: visible;
}
.wind {
  display: inline-block;
  width: 100px;
  vertical-align: middle;
}
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.bo2 > *:nth-child(2) {
  float: right;
}
.bo2 > *:nth-child(2) > a {
  margin: 0 5px;
}
.bo3 {
  width: 155px;
}
.bo4 {
  width: 155px;
}
.bo5 {
  width: 100px;
}
.gedan:nth-child(2n) {
  background-color: rgb(236, 236, 236);
}
/* .ge:nth-child(2n) {
  background-color: rgb(236, 236, 236);
} */
.geshu {
  display: none;
}
.geuhs {
  display: none;
}
.get {
  display: inline-block;
  height: 154px;
  width: 130px;
  margin: 0 26px 20px 0;
}
.get:nth-child(6n) {
  margin: 0;
}
.get > img {
  height: 130px;
  width: 130px;
}
.gett {
  display: inline-block;
  height: 154px;
  width: 161px;
  margin: 0 26px 45px 0;
}
.gett:nth-child(5n) {
  margin: 0;
}
.gett > img {
  height: 130px;
  width: 162px;
}
.ge {
  height: 60px;
  padding: 5px;
  font-size: 12px;
  color: #ccc;
}
.ge > td:nth-of-type(2) img {
  height: 50px;
  width: 50px;
}
.ge1 {
  width: 35px;
  padding-left: 15px;
}
/* .ge2 {
} */
.ge3 {
  width: 300px;
  padding-left: 20px;
}
.ge4 {
  visibility: hidden;
  transition: all 0.2s;
}
.ge:hover > .ge4 {
  visibility: visible;
}
.ge4 > a {
  margin: 0 5px;
}
.ge5 {
  padding-left: 10px;
  width: 100px;
}
.ge6 {
  width: 125px;
}
.ge7 {
  width: 100px;
}
.ge8 {
  width: 100px;
}
.zhuj {
  display: none;
  border-collapse: collapse;
}
.hidd {
  visibility: hidden;
}
#gedan:checked ~ .rouqi .gedan {
  display: block !important;
}
#geshu:checked ~ .rouqi .geshu {
  display: block !important;
}
#geuhs:checked ~ .rouqi .geuhs {
  display: block !important;
}
.qiang {
  display: block !important;
}

.labhh {
  border-top: 2px solid red !important;
}
.m-souz {
  position: absolute;
  top: 60px;
  left: 0px;
  line-height: initial;
  width: 420px;
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
  padding: 3px 0 3px 20px;
  font-size: 12px;

  background-color: white;
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
.get > img {
  cursor: pointer;
}
</style>
