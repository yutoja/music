<template>
  <div class="home">
    <div class="lup" @mouseover="di" @mouseout="run">
      <img class="lups" :src="url" />
      <span @click="left"></span><img :src="url" @click="tiao" /><span @click="right"></span>
      <ul class="radoo">
        <li v-for="(item, index) in radiu" :key="index" :class="{ raoo: ge == index }" @click="ge = index"></li>
      </ul>
    </div>
    <div class="tbody">
      <div class="tebody">
        <div class="bd_1">
          <div class="te_nav">
            <div class="tou"><span class="lal"></span><a href="">热门推荐</a></div>
            <ul class="teu">
              <li><router-link to="/Gedan?cat=流行">流行</router-link></li>
              <span>|</span>
              <li><router-link to="/Gedan?cat=摇滚">摇滚</router-link></li>
              <span>|</span>
              <li><router-link to="/Gedan?cat=民谣">民谣</router-link></li>
              <span>|</span>
              <li><router-link to="/Gedan?cat=华语">华语</router-link></li>
              <span>|</span>
              <li><router-link to="/Gedan?cat=电子">电子</router-link></li>
            </ul>
            <div class="ter"><router-link to="/Gedan" class="td erpp red ko">更多</router-link></div>
          </div>
          <ul class="te_body">
            <li v-for="item in data_tou" :key="item.id">
              <div>
                <router-link :to="`/Xiang?id=${item.id}`" class="te_a"><img :src="item.picUrl"/></router-link>
                <p class="te_p">
                  <span></span>
                  <span>{{ parseInt(item.playCount / 10000) }}万</span>
                  <span></span>
                </p>
              </div>
              <p class="te_q">
                <router-link :to="`/Xiang?id=${item.id}`" class="te_a ko td">{{ item.name }} </router-link>
              </p>
            </li>
          </ul>
        </div>
        <div class="bd_2">
          <div class="te_nav">
            <div class="tou"><span class="lal"></span><a href="#">热门推荐</a></div>
            <div class="ter">
              <router-link to="/Xindie" class="td erpp red ko">更多</router-link>
            </div>
          </div>
          <div class="bd_bd">
            <div class="befor" @click="befor"></div>
            <div class="afte" @click="afte"></div>
            <ul ref="uli">
              <li v-for="(item, index) in data_tui" :key="index">
                <div class="er_na">
                  <router-link :to="`/Zhuan?id=${item.id}`"><img :src="item.picUrl" class="eri"/></router-link>
                </div>
                <p class="erp">
                  <router-link :to="`/Zhuan?id=${item.id}`" class="td">{{ item.name }}</router-link>
                </p>
                <p class="erpp">
                  <router-link :to="`/Singerhome?id=${item.artist.id}`" class="td ko">{{ item.artist.name }}</router-link>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bd_3">
          <div class="te_nav">
            <div class="tou"><span class="lal"></span><router-link to="/Bang?id=19723756">榜单</router-link></div>
            <div class="ter">
              <router-link to="/Bang?id=19723756" class="td erpp red ko">更多</router-link>
            </div>
          </div>
          <div class="sn-bd">
            <dl class="blk" v-for="item in list" :key="item.id">
              <dt>
                <div class="blk_a">
                  <router-link :to="`/Bang?id=${item.id}`"><img :src="item.coverImgUrl" alt=""/></router-link>
                </div>
                <div class="blk_b">
                  <h4>
                    <a class="td">
                      {{ item.name }}
                    </a>
                  </h4>
                  <p v-if="item.data"><a class=" as" @click="all(item.data)"></a><a class=" as" href="#"></a></p>
                </div>
              </dt>
              <dd>
                <ol class="blko">
                  <li class="hov" v-for="(im, index) in item.data" :key="im.id">
                    <span class=" cpn">{{ index + 1 }}</span> <router-link :to="`/Details?id=${im.id}`" class="xiao td over">{{ im.name }}</router-link>
                    <div class="qw"><a class=" as" :id="im.id" @click="sr"></a><a class=" as" @click="bo(im.id)"></a><a class=" as" href="#"></a></div>
                  </li>
                </ol>
              </dd>
              <router-link :to="`/Bang?id=${item.id}`" class="td xiao quan">查看全部></router-link>
            </dl>
          </div>
        </div>
      </div>
      <div class="asdie">
        <div class="yon" v-if="!$store.state.user">
          <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <a @click="deng">用户登入</a>
        </div>
        <div class="asbd">
          <div class="asbd1">
            <h6>热门歌手</h6>
            <router-link to="/Singer?area=-1" class="td xiao">查看全部</router-link>
          </div>
          <ul class="asbd2">
            <li v-for="item in data_gesh" :key="item.id">
              <router-link :to="`/SingerHome?id=${item.id}`" class="asdb">
                <div><img :src="item.img1v1Url" :title="item.name" /></div>
                <div>
                  <h4>{{ item.name }}</h4>
                  <p class="tud">{{ item.alias[0] }}</p>
                </div>
              </router-link>
            </li>
          </ul>
          <a href="https://music.163.com/st/musician" class="asbdf" target="_blank">申请成为网易音乐人</a>
        </div>
        <div class="remen">
          <div class="asbd1">
            <h6>主播</h6>
          </div>
          <ul>
            <li class="remena" v-for="item of data_zhubo" :key="item.id">
              <router-link :to="`/User?id=${item.id}`">
                <img :src="item.avatarUrl" alt="" />
              </router-link>
              <div class="rea">
                <p>
                  <router-link class="td ko" :to="`/User?id=${item.id}`">{{ item.nickName }}</router-link>
                </p>
                <div class="fudb"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      data_tou: [],
      data_tui: [],
      list: [],
      data_zhubo: [],
      data_bran: [],
      data_gesh: [],
      ge: 0,
      ds: 0,
      src: this.$audio,
      num: 1,
      nutru: true
    }
  },

  methods: {
    deng() {
      this.$emit('deng')
    },
    tiao() {
      const b = this.data_bran[this.ge]
      const a = b.targetType == 1 ? { path: '/Details', query: { id: b.targetId } } : b.targetType == 10 ? { path: '/Zhuan', query: { id: b.targetId } } : b.targetType == 3000 ? `${b.url}` : ''
      this.$router.push(a)
    },
    luno(obj, target, callback) {
      clearInterval(obj.timer)
      obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        obj.style.left = step + obj.offsetLeft + 'px'
        if (obj.offsetLeft == target) {
          clearInterval(obj.timer)
          if (callback) {
            callback()
          }
        }
      }, 10)
    },
    befor() {
      if (this.nutru) {
        this.nutru = false
        if (this.num == 0) {
          this.$refs.uli.style.left = '-1330px'
          this.num = 2
        }
        this.num--
        this.luno(this.$refs.uli, -this.num * 670 + 16, () => {
          this.nutru = true
        })
      }
    },
    afte() {
      if (this.nutru) {
        this.nutru = false
        if (this.num == 3) {
          this.num = 1
          this.$refs.uli.style.left = '-660px'
        }
        this.num++
        this.luno(this.$refs.uli, -this.num * 670 + 16, () => {
          this.nutru = true
        })
      }
    },
    left() {
      this.ge--
      if (this.ge < 0) {
        this.ge = this.data_bran.length - 1
      }
    },
    right() {
      this.ge++
      if (this.ge > this.data_bran.length - 1) {
        this.ge = 0
      }
    },
    run() {
      this.ds = setInterval(() => {
        this.right()
      }, 3000)
    },
    di() {
      clearInterval(this.ds)
    }
  },
  computed: {
    url() {
      if (!this.data_bran[this.ge]) return ''
      return this.data_bran[this.ge].imageUrl
    },
    radiu() {
      return this.data_bran
    }
  },
  created() {
    this.ds = setInterval(() => {
      this.right()
    }, 3000)
    this.$http('/personalized?limit=8').then(value => {
      this.data_tou = value.data.result
    })
    this.$http('/album/newest').then(value => {
      this.data_tui = value.data.albums
      const a = this.data_tui.splice(0, 5)
      const b = this.data_tui.splice(0, 5)
      this.data_tui = [...a, ...b, ...a, ...b]
    })
    // 获取榜单
    this.$http('/toplist').then(value => {
      this.list = value.data.list.splice(0, 3)
      this.list.forEach(element => {
        this.$http(`/playlist/detail?id=${element.id}&s=-1`).then(value => {
          element.data = [...value.data.playlist.tracks.splice(0, 10)]
        })
      })
    })
    this.$http('/dj/toplist/popular?limit=5').then(value => {
      this.data_zhubo = value.data.data.list
    })
    this.$http('/banner').then(value => {
      this.data_bran = value.data.banners
    })
    this.$http('/toplist/artist').then(value => {
      this.data_gesh = value.data.list.artists
      this.data_gesh.length = 5
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  transition: all 0.1s;
}
ul {
  list-style: none;
}
input,
button {
  border: none;
  outline: none;
}
.td {
  color: #242424;
}
.td:hover {
  text-decoration: revert;
}
.ko {
  font-size: 14px;
}
.lal {
  font-family: 'icomoon';
  font-size: 16px;
  color: #9b0909;
  margin: 0 15px;
}
.lup {
  position: relative;
  height: 285px;

  text-align: center;
}
.lups {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(30px);
  z-index: 1;
}
.lup > img:nth-of-type(2) {
  position: absolute;
  transition: all 5s;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
  width: 982px;
}
.tbody {
  width: 980px;

  margin: 0 auto;
  display: flex;
  background-color: white;
}
.tebody {
  width: 729px;
  box-sizing: border-box;
  padding: 20px 20px 40px;
}
.blk_b {
  margin-left: 10px;
}
.te_nav {
  height: 35px;
  width: 100%;
  line-height: 35px;
  border-bottom: 2px solid #9b0909;
}
.tou {
  font-size: 20px;
  /* padding-left: 40px; */
  float: left;
}
.te_nav a {
  color: #000000;
}
.teu {
  display: flex;
  float: left;
  margin-left: 20px;
  font-size: 12px;
}
.teu > span {
  margin: 0 15px;
}

.teu > li > a:hover {
  text-decoration: revert;
}
.ter {
  float: right;
}
.te_body {
  width: 100%;
  height: 468px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.te_body > li {
  height: 188px;
}

.te_body > li:nth-of-type(n) {
  margin: 0 43px 32px 0;
}
.te_body > li:nth-of-type(4n) {
  margin: 0;
}
.te_body > li > div {
  width: 140px;
  height: 140px;
  position: relative;
}
.te_a > img {
  width: 100%;
  height: 100%;
}
.te_p > span:nth-child(1) {
  float: left;
  font-family: 'icomoon';
}
.te_p > span:nth-child(3) {
  float: right;
  font-family: 'icomoon';
}
.te_p > span:nth-child(2) {
  float: left;
  margin: 0 10px;
}
.te_p {
  width: 100%;
  line-height: 20px;
  background-color: rgba(0.5, 0.5, 0.5, 0.2);
  font-size: 12px;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px;
  box-sizing: border-box;
}
.te_q {
  margin-top: 5px;
  width: 140px;
  font-size: 14px;
}
.bd_2 {
  margin-top: 20px;
}
.bd_bd {
  height: 165px;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3;
  margin-top: 20px;
  padding: 20px 16px 0;
  position: relative;
  overflow: hidden;
}
.bd_bd > ul > li {
  margin: 0 17px;
  width: 100px;
}
.bd_bd > ul {
  position: absolute;
  display: flex;
  left: -660px;
  z-index: 1;
}
.er_na .eri {
  height: 100px;
  width: 100px;
}
.erp {
  font-size: 12px;
  margin: 5px 0;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.erpp {
  font-family: 'icomoon';
  color: #979797;
  vertical-align: middle;
}
.bd_bd > .afte,
.bd_bd > .befor {
  transform: translateY(-50px);
  font-size: 16px;
  color: #979797;
  font-family: 'icomoon';
  cursor: pointer;
  z-index: 2;
}
.bd_bd > .afte {
  position: absolute;
  top: 60%;
  right: 5px;
  user-select: none;
}
.bd_bd > .befor {
  position: absolute;
  top: 60%;
  left: 5px;
  user-select: none;
}
.bd_bd::after:hover,
.bd_bd::before:hover {
  color: #000000;
}
.db_3 {
  width: 100%;
  height: 527px;
  margin-top: 20px;
}
.blk_a img {
  height: 80px;
  width: 80px;
}
.sn-bd {
  margin-top: 20px;
  display: flex;
  height: 472px;
  background-image: url('https://s2.music.126.net/style/web2/img/index/index_bill.png?e3eff37a28747a63f4d8ed6b9b237fd2');
}
.blk > dt {
  display: flex;
  padding: 20px 0 15px 20px;
  width: 230px;
  box-sizing: border-box;
}
.blk_b > h4 {
  margin: 5px 0 0 8px;
}
.blk_b > p {
  margin-top: 10px;
}
.as {
  font-family: 'icomoon';
  color: #6d6d6d;
  font-size: 24px;
  margin: 5px;
}
.blko {
  list-style: none;
  margin: 0 0 0 25px;
}
.blko > li {
  height: 32px;
  line-height: 32px;
}
.red {
  color: #9b0909;
}
.xiao {
  font-size: 12px;
  color: #000000;
  vertical-align: top;
  margin-left: 9px;
}
.blko > li {
  display: flex;
  width: 100%;
}

.hov:hover > .qw {
  display: block;
}
.how > :nth-child(1) {
  float: left;
}
.hov:hover > :nth-child(2) {
  width: 70px;
}
.over {
  width: 170px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: none;
}
.qw {
  float: right;
  display: none;
}
.yon {
  height: 126px;
  padding-left: 15px;
  font-size: 12px;
  background-image: linear-gradient(180deg, #fbfbfb, #e4e4e4);
}
.yon > p {
  padding: 16px 0;
  line-height: 22px;
}
.yon > a {
  display: inline-block;
  box-shadow: 0 1px 0 #8a060b;

  text-align: center;
  line-height: 30px;
  width: 100px;
  border-radius: 5px;
  color: white;
  margin-left: 60px;
  background-image: linear-gradient(180deg, #e41820, #c8070d);
}
.yon > a:hover {
  background-image: linear-gradient(180deg, #e41820, #000000);
}
.asdie {
  width: 250px;
  border-left: 1px solid #9b9b9b;
  border-right: 1px solid #9b9b9b;
}
.asbd {
  margin-top: 10px;
  padding: 0 15px;
}
.asbd1 {
  height: 23px;
  border-bottom: 1px solid #4f4f4f;
}
.asbd1 > h6 {
  float: left;
  font-size: 12px;
}
.asbd1 > a {
  float: right;
}
.asbd2 {
  margin-top: 10px;
}
.asbd2 > li {
  height: 62px;
  border: 1px solid #e9e9e9;
  margin: 5px 0;
}
.asdb {
  display: flex;
}
.asdb > div > img {
  height: 62px;
  width: 62px;
}
.asdb > div:nth-child(2) {
  margin-left: 10px;
  height: 62px;
  color: #4f4f4f;
}
.tud {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 70%;
  margin-top: 10px;
  font-size: 14px;
}
.fudb {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 160px;

  font-size: 12px;
}
.asbdf {
  display: block;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  font-weight: bold;
  background-image: linear-gradient(180deg, #f5f5f5, #d4d3d3);
}
.remen {
  padding: 0 15px;
  margin-top: 30px;
}
.remen > ul {
  margin-top: 10px;
  overflow: hidden;
}
.remena {
  display: flex;
  height: 40px;
  margin: 10px 0;
}
.remena > a > img {
  height: 40px;
  width: 40px;
}
.rea {
  margin-left: 10px;
}
.rea > p {
  margin-bottom: 7px;
}
.lup > span {
  position: absolute;
  font-family: 'icomoon';
  font-size: 70px;
  cursor: pointer;
  user-select: none;
  z-index: 2;
}
.lup > span:nth-of-type(1) {
  top: 50%;
  left: 170px;
  transform: translateY(-50%);
}
.lup > span:nth-of-type(2) {
  top: 50%;
  right: 170px;

  transform: translateY(-50%);
}
.quan {
  float: right;
  line-height: 32px;
  margin-right: 10px;
}
.cpn {
  width: 20px;
  text-align: center;
}
.radoo {
  position: absolute;
  left: 50%;
  top: 95%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
}
.radoo > li {
  height: 5px;
  width: 5px;
  background-color: white;
  margin-left: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.radoo > li:hover {
  background-color: red;
}
.raoo {
  background-color: red !important;
}
</style>
