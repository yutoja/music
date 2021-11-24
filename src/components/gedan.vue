<template>
  <div class="gdan">
    <div class="w">
      <div class="tou">
        <div class="left">
          <h2 class="xi">{{ this.$route.query.cat ? this.$route.query.cat : '全部' }}</h2>
          <button @click="ba = !ba">全部分类></button>
        </div>
        <div class="right">></div>
        <div class="felei" v-show="ba">
          <div class="fehe"><router-link to="/Gedan" class="xiaolul">全部分类</router-link></div>
          <div class="febd">
            <dl v-for="(item, index) in feng[0]" :key="index">
              <dt class="febb"><span v-text="zibiao[index]"></span> {{ item }}</dt>
              <dd class="fenn">
                <div v-for="iem in feng[++index]" :key="iem.id">
                  <router-link :to="`/Gedan?cat=${iem.name}`" class="xiaolul">{{ iem.name }}</router-link> <span class="zjs">|</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="tbody">
        <ul class="te_body" v-if="data_tou">
          <li v-for="(item, index) in data_tou" :key="index">
            <div>
              <router-link :to="`/Xiang?id=${item.id}`" class="te_a"><img :src="item.coverImgUrl | https"/></router-link>
              <p class="te_p">
                <span></span>
                <span>{{ parseInt(item.playCount / 10000) }}万</span>
                <span></span>
              </p>
            </div>
            <p class="te_q xiaolul" @click="skip('/Xiang', item.id)">{{ item.name }}</p>
            <a class="size ove" @click="skip('/User', item.creator.userId)">
              by<a class="xiaolul tufa">{{ item.creator.nickname }}</a></a
            >
          </li>
        </ul>
        <Little v-else></Little>
        <div class="foote">
          <a href="#" @click="app">上一页</a>
          <input type="number" placeholder="页数" class="tex" v-model="yeshu" />
          <a href="#" @click="re">跳转</a>
          <a href="#" @click="add">下一页</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //  "0": "语种",
//         "1": "风格",
//         "2": "场景",
//         "3": "情感",
//         "4": "主题" -->
</template>

<script>
export default {
  data() {
    return {
      data_tou: null,
      yeshu: 0,
      feng: [],
      zibiao: ['', '', '', '', ''],
      ba: false
    }
  },
  methods: {
    async add() {
      if (this.yeshu < 0) {
        this.yeshu = 0
        return alert('这页数认真的吗')
      }
      this.yeshu++
      const {
        data: { playlists }
      } = await this.$http(`/top/playlist?limit=35&offset=${this.yeshu * 35}`)
      this.data_tou = playlists
    },
    async app() {
      if (this.yeshu <= 0) {
        this.yeshu = 0
        return alert('这页数认真的吗')
      }
      this.yeshu--
      const {
        data: { playlists }
      } = await this.$http(`/top/playlist?limit=35&offset=${this.yeshu * 35}`)
      this.data_tou = playlists
    },
    async re() {
      if (this.value < 1) alert('这页数认真的吗')
      const {
        data: { playlists }
      } = await this.$http(`/top/playlist?limit=35&offset=${this.yeshu * 35}`)
      this.data_tou = playlists
    }
  },
  async created() {
    const {
      data: { playlists }
    } = await this.$http(`/top/playlist?limit=35${this.$route.query.cat ? `&cat=${this.$route.query.cat}` : ''}`)
    this.data_tou = playlists
    const { data } = await this.$http('/playlist/catlist')
    this.feng.push(data.categories)
    for (let i = 0; i < 5; i++) {
      this.feng.push(data.sub.filter(value => value.category === i))
    }
  },
  watch: {
    async $route(to, from) {
      const {
        data: { playlists }
      } = await this.$http(`/top/playlist?limit=35${to.query.cat ? `&cat=${to.query.cat}` : ''}`)
      this.ba = false
      this.data_tou = playlists
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.w {
  width: 970px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  box-sizing: border-box;
}
.xi {
  font-weight: normal;
}
.tou {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 42px;
  border-bottom: 1px solid red;
}
.size {
  font-size: 12px;
  color: #ccc;
}
.left {
  display: flex;
  height: 32px;
}
.left > button {
  margin-left: 10px;
  color: blue;
  background-image: linear-gradient(180deg, #ffffff, rgb(236, 236, 236));
  box-shadow: 0 0 1px 1px #ccc;
  border-radius: 5px;
  padding: 0 20px;
}
.right {
  padding-top: 10px;
}
.te_body {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.te_body > li {
  height: 188px;
}

.te_body > li:nth-child(n) {
  margin: 0 45px 32px 0;
}
.te_body > li:nth-child(5n) {
  margin: 0;
}
.te_body > li > div {
  border: 1px solid rgb(228, 228, 228);
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
  margin: 5px 0;
  width: 140px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  cursor: pointer;
}
.foote {
  text-align: center;
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
.ove {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: none;
  white-space: nowrap;
  display: inline-block;
  width: 140px;
}
.xiaolul:hover {
  text-decoration: underline;
}
.felei {
  position: absolute;
  left: -30px;
  top: 50px;
  z-index: 999;
  box-shadow: 0 0 8px 2px rgba(0.5, 0.5, 0.5, 16%);
  width: 85%;
  border: 1px solid #ccc;
  background-color: white;
}
.fehe {
  line-height: 40px;
  color: rgb(122, 122, 122);
  font-size: 13px;
  padding-left: 20px;
}
.febd {
  padding: 0px 20px 20px;
  font-size: 13px;
}
.febd > dl {
  display: flex;
  margin: 5px;
}
.febb {
  line-height: 35px;
  border-right: 1px solid #ccc;
  padding-right: 8px;
  font-weight: bold;
  width: 55px;
}
.febb > span {
  font-family: 'icomoon';
  color: #ccc;
  font-size: 24px;
  vertical-align: top;
}
.fenn {
  padding: 8px 7px 0 15px;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.fenn a {
  color: rgb(70, 70, 70);
}
.fenn > div {
  margin-bottom: 10px;
}
.zjs {
  margin: 0 8px 0 10px;
  color: #ccc;
}
.tufa {
  margin-left: 10px;
}
</style>
