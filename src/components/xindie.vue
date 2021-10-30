<template>
  <div class="xindie">
    <div class="xinhe">
      <h2 class="xin-he">热门新碟</h2>
      <div class="xin-bd">
        <ul>
          <li class="xin-li" v-for="item in data_tui" :key="item.id">
            <router-link :to="`/Zhuan?id=${item.id}`">
              <img :src="item.blurPicUrl" class="xin-im" />
            </router-link>
            <p class="xin-p">
              <router-link :to="`/Zhuan?id=${item.id}`" class="xiaolu ove">{{ item.name }}</router-link>
            </p>
            <p class="xin-p1">
              <router-link :to="`/Singerhome?id=${item.artist.id}`" class="xiaolu">{{ item.artist.name }}</router-link>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="xinbo">
      <h2 class="xin-he">
        热门新碟
        <router-link to="/Xindie?area=ALL" class="xiaolu">全部</router-link>
        <span>|</span>
        <router-link to="/Xindie?area=ZH" class="xiaolu">华语</router-link>
        <span>|</span>
        <router-link to="/Xindie?area=EA" class="xiaolu">欧美</router-link>
        <span>|</span>
        <router-link to="/Xindie?area=KR" class="xiaolu">韩国</router-link>
        <span>|</span>
        <router-link to="/Xindie?area=JP" class="xiaolu">日本</router-link>
      </h2>
      <div class="xin-bd">
        <ul>
          <li class="xin-li" v-for="item in data_tou" :key="item.id">
            <router-link :to="`/Zhuan?id=${item.id}`">
              <img :src="item.blurPicUrl" class="xin-im" />
            </router-link>
            <p class="xin-p">
              <router-link :to="`/Zhuan?id=${item.id}`" class="xiaolu ove">{{ item.name }}</router-link>
            </p>
            <p class="xin-p1">
              <router-link :to="`/Singerhome?id=${item.artist.id}`" class="xiaolu">{{ item.artist.name }}</router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="foote">
        <a href="#" @click="app">上一页</a>
        <input type="number" placeholder="页数" class="tex" v-model="yeshu" />
        <a href="#" @click="re">跳转</a>
        <a href="#" @click="add">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xindie',
  data() {
    return {
      data_tou: [],
      yeshu: 0,
      data_tui: null
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
        data: { albums }
      } = await this.$http(`/album/new?limit=20&offset=${this.yeshu * 20}`)
      this.data_tou = albums
    },
    async app() {
      if (this.yeshu <= 0) {
        this.yeshu = 0
        return alert('这页数认真的吗')
      }
      this.yeshu--
      const {
        data: { albums }
      } = await this.$http(`/album/new?limit=35&offset=${this.yeshu * 20}`)
      this.data_tou = albums
    },
    async re() {
      if (this.value < 1) alert('这页数认真的吗')
      const {
        data: { albums }
      } = await this.$http(`/album/new?limit=35&offset=${this.yeshu * 20}`)
      this.data_tou = albums
    }
  },
  created() {
    this.$http('/album/newest').then(value => {
      this.data_tui = value.data.albums
      this.data_tui = this.data_tui.splice(0, 10)
    })
    this.$http('/album/new?limit=20').then(value => {
      this.data_tou = value.data.albums
    })
  },
  watch: {
    $route(to, from) {
      this.$http(`/album/new?limit=20&area=${to.query.area}`).then(value => {
        this.data_tou = value.data.albums
      })
    }
  }
}
</script>

<style scoped>
.xindie {
  width: 980px;
  padding: 40px 30px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #ccc;
}
.xin-he {
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin-bottom: 20px;
}
.xinbo {
  margin-top: 20px;
}
.xin-li {
  display: inline-block;
  margin: 0 53px 10px 0;
}
.xin-li:nth-of-type(5n) {
  margin: 0;
}
.xin-li > a {
  display: inline-block;
  height: 130px;
  width: 153px;
  background: url('../imgs/disc.png') no-repeat;
  background-size: 130px;
  background-position: 10px 0;
  transition: all 0.3;
}
.xin-li > a:hover {
  background-position: 20px 0;
}
.xin-im {
  height: 130px;
  width: 130px;
}
.xin-p > a {
  color: black;
}
.xin-p1 > a {
  color: rgb(190, 190, 190);
  font-size: 12px;
}
.xin-p {
  margin: 5px 0 0;
}
.xin-p1 {
  margin: 0 0 0 0;
}
.foote {
  margin-top: 10px;
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
.xin-he > a {
  color: rgb(167, 167, 167);
  font-size: 12px;
  margin: 0 12px;
}
.xin-he > span {
  font-size: 12px;
  color: rgb(167, 167, 167);
}
</style>
