<template>
  <div class="user" v-if="daia && dat.profile">
    <thead>
      <img :src="dat.profile.avatarUrl" alt="" class="img" />
      <div class="jian">
        <div class="jh">
          <h1>{{ dat.profile.nickname }}</h1>
          <em>Lv. {{ dat.level }} </em>
          <span :class="{ font: true, blue: dat.profile.gender == 1, red: dat.profile.gender == 2 }"></span>
          <button @click=";(a = guzh(dat.userPoint.userId, xi)), xi === 1 && a ? (xi = 0) : ((xi = 1), (a = undefined))" v-text="xi == 1 ? '关注' : '取消关注'" v-if="!$store.state.user || $store.state.user.profile.userId != $route.query.id">关注</button>
          <button v-if="!$store.state.user || $store.state.user.profile.userId != $route.query.id">发私信</button>
        </div>
        <div class="js">
          <div>
            <p>{{ dat.profile.eventCount }}</p>
            <span>动态</span>
          </div>
          <div>
            <p>{{ dat.profile.follows }}</p>
            <span>关注</span>
          </div>
          <div>
            <p>{{ dat.profile.followeds }}</p>
            <span>粉丝 </span>
          </div>
        </div>
        <br />
        <div class="jj">个人介绍：{{ dat.profile.signature }}</div>
        <!-- <div class="jd">所在地区：广东省 - 梅州市 年龄：85后</div>
        <div class="jw">社交网络：</div> -->
      </div>
    </thead>
    <div class="bdbd" v-if="daia.length > 0">
      <div class="bdhe">{{ dat.profile.nickname }}创建的歌单({{ daia.length }})</div>
      <ul class="tbody">
        <li class="tli" v-for="item in daia" :key="item.id">
          <a @click="visit(item.id)">
            <img :src="item.coverImgUrl" alt="" class="ain" />
          </a>
          <div class="baj">
            <span class="font"> {{ item.playCount > 10000 ? parseInt(item.playCount / 10000) + '万' : item.playCount }}</span> <span class="font"></span>
          </div>
          <a href="#" class="xiaolu black ove dis">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="bdbd" v-if="diaa.length > 0">
      <div class="bdhe">{{ dat.profile.nickname }}收藏的表单({{ diaa.length }})</div>
      <ul class="tbody">
        <li class="tli" v-for="item in diaa" :key="item.id">
          <router-link :to="`/Xiang?id=${item.id}`">
            <img :src="item.coverImgUrl" alt="" class="ain" />
          </router-link>
          <div class="baj">
            <span class="font"> {{ item.playCount > 10000 ? parseInt(item.playCount / 10000) + '万' : item.playCount }}</span> <span class="font"></span>
          </div>
          <router-link :to="`/Xiang?id=${item.id}`" class="xiaolu black ove dis">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      dat: null,
      xi: 1,
      daia: null,
      diaa: null,
      a: undefined
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.$http(`/user/detail?uid=${this.id}`).then(value => {
      this.dat = value.data
    })
    this.$http(`/user/playlist?uid=${this.id}`).then(value => {
      this.daia = value.data.playlist.filter(value => value.creator.userId == this.id)
      this.diaa = value.data.playlist.filter(value => value.creator.userId != this.id)
    })
  }
}
</script>

<style scoped>
.dis {
  display: inline-block;
  width: 100%;
}
* {
  color: rgb(177, 177, 177);
}
.blue {
  color: aqua;
}
.black {
  color: black;
  margin-top: 5px;
}
.font {
  font-family: 'icomoon';
}
.user {
  padding: 40px;
  width: 980px;

  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  box-sizing: border-box;
}
.img {
  height: 180px;
  width: 180px;
  border: 2px solid #ccc;
  padding: 2px;
  float: left;
}
thead {
  margin-bottom: 43px;
  height: 200px;
  overflow: hidden;
}
.jian {
  width: 670px;
  margin-left: 40px;
  float: right;
}
.jh {
  display: flex;
  line-height: 40px;
}
.jh > h1 {
  font-weight: 400;
  color: black;
}
.font {
  font-family: 'icomoon';
}
.jh > *:nth-child(n) {
  margin: 0 10px;
}
.jh > *:nth-child(1) {
  margin-left: 0;
}
.jh > button {
  width: 70px;
  color: white;
  border-radius: 5px;
  height: 35px;
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
  cursor: pointer;
}
.jh > button:nth-of-type(1) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
  color: black;
}
.jh > button:nth-of-type(2) {
  background-image: linear-gradient(180deg, #116ffc, #4c30eb);
}
.jh > button:nth-of-type(1):hover {
  background-image: linear-gradient(180deg, #e0e0e0, #dddddd);
  color: black;
}
.jh > button:nth-of-type(2):hover {
  background-image: linear-gradient(180deg, #c3b9fc, #116ffc);
}
.jh > em {
  color: red;
  font-weight: bold;
}
.red {
  color: rgb(255, 93, 160);
}
.js {
  height: 40px;
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
.js > div {
  float: left;
  border-right: 1px solid #ccc;
  padding: 0px 40px 0 20px;
}
.js > div > p {
  font-size: 20px;
  color: rgb(85, 85, 85);
}
.js > div > span {
  font-size: 12px;
}
.jj,
.jd,
.jw {
  font-size: 12px;
  margin-top: 3px;
}
.bdbd {
  margin: 25px 0 0 0;
}
.bdhe {
  color: black;
  padding-bottom: 5px;
  font-size: 20px;
  border-bottom: 2px solid rgb(146, 0, 0);
}
.tbody {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.tli {
  position: relative;
  width: 140px;
}
.ain {
  width: 140px;
  height: 140px;
}
.baj {
  position: absolute;
  top: 114px;
  width: 100%;
  line-height: 25px;
  background-color: rgba(0.5, 0.5, 0.5, 0.2);
  color: #ccc;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.tli:nth-child(n) {
  margin: 0 49.5px 30px 0;
}
.tli:nth-child(5n) {
  margin: 0;
}
</style>
