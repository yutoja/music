<template>
  <div class="vedio" v-if="dae">
    <div class="vbo">
      <div class="vhe">
        <p class="vhp">
          <span class="vhe-h" :title="dae.name || dae.title">{{ dae.name || dae.title }}</span>
          <span v-if="dae.artists">
            <router-link class="xiaolu" :to="`/SingerHome?id=${item.id}`" v-for="item in dae.artists" :key="item.id">{{ item.name }}</router-link></span
          >
          <router-link class="xiaolu" :to="`/User?id=${dae.creator.userId}`" v-else>by {{ dae.creator.nickname }}</router-link>
        </p>
        <div class="vhbd">
          <video :src="ved.url | https" class="vedi" controls ref="video"></video>
          <!-- <a href="#" class="vha"></a> -->
        </div>

        <div></div>
      </div>
      <div>
        <div class="btb" v-if="veda">
          <div class="btt">
            <!-- <a :id="data.songs[0].id" @click="sr" title="播放"><a class="font wite"></a>播放</a> -->
            <a href="#ping" title="点赞"><a class="font black"></a>{{ veda.likedCount > 0 ? `(${veda.likedCount})` : '' }}</a>
            <a href="#" title="收藏"><a class="font black"></a>{{ dae.subCount > 0 ? `(${dae.subCount})` : '' }}</a>
            <a href="#" title="转发"><a class="font black"></a>{{ dae.shareCount > 0 ? `(${dae.shareCount})` : '' }}</a>
          </div>
        </div>
      </div>
      <div class="ping" v-if="hot && news" id="ping">
        <Com :sw="news" :sh="hot" :su="shu" :typ="typ"></Com>
        <br />
        <Toca :consh="conshu" :tocal="current + 1" @apd="gai"></Toca>
      </div>
    </div>
    <div class="asdie">
      <div class="ve-he">
        <p>{{ (dae.vid + '').length > 5 ? '视频' : 'MV' }}简历</p>
        <div class="ve-bd">发布时间：{{ dae.publishTime | as }}</div>
        <div class="ve-bd">播放次数：{{ dae.playCount ? (dae.playCount > 10000 ? parseInt(dae.playCount / 10000) + '万' : dae.playCount) : dae.playTime > 10000 ? parseInt(dae.playTime / 10000) + '万' : dae.playTime }}</div>
      </div>
      <div class="ve-he">
        <p>相关推荐</p>

        <div class="vtui" v-for="item in tuijian" :key="item.vid">
          <router-link :to="`/Vedio?id=${item.vid}`" class="vtim">
            <img :src="item.coverUrl | https" />
            <span class="vtou font">{{ parseInt(item.playTime / 10000) }}万</span>
          </router-link>
          <div class="vtbo">
            <router-link :to="`/Vedio?id=${item.vid}`" class="xiaolu blac " :title="item.title">{{ item.title }}</router-link>
            <p>{{ item.durationms | capitalize }}</p>
            <router-link :to="`${(item.creator[0].userId + '').length < 5 ? `/SingerHome?id=${item.creator[0].userId}` : `/User?id=${item.creator[0].userId}`}`" class="xiaolu wie">{{ item.creator[0].userName }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Little v-else></Little>
</template>

<script>
import com from '@/views/comment'
import Toca from '@/views/tota'
export default {
  name: 'vedio',
  data() {
    return {
      hot: null,
      news: null,
      shu: null,
      typ: 2,
      ved: '',
      dae: null,
      veda: null,
      tuijian: null,
      current: 0,
      conshu: 38
    }
  },
  methods: {
    // 页数
    gai(value) {
      this.current = value - 1
    },
    async fun() {
      const id = this.$route.query.id
      const type = id.length < 10 ? 'mv' : 'video'
      const t = id.length < 10 ? 'mv' : 'v'
      const ty = id.length < 10 ? 'mv' : ''
      this.hotp(this, id, type)

      if (ty == 'mv') {
        const {
          data: { data }
        } = await this.$http(`/${type}/url?id=${id}`)
        this.ved = data
      } else {
        const {
          data: { urls }
        } = await this.$http(`/${type}/url?id=${id}`)

        this.ved = urls[0]
      }

      {
        const {
          data: { data }
        } = await this.$http(`/${type}/detail?${ty}id=${id}`)
        this.dae = data
      }
      {
        const { data } = await this.$http(`/${type}/detail/info?${t}id=${id}`)
        this.veda = data
      }
      {
        const {
          data: { data }
        } = await this.$http(`/related/allvideo?id=${id}`)

        this.tuijian = data
      }
    }
  },
  components: {
    Com: com,
    Toca
  },
  filters: {
    capitalize: function(value) {
      const values = value / 1000
      const fe = parseInt(values / 60)
      const miao = parseInt(values % 60)
      const time = `${fe < 10 ? '0' + fe : fe}:${miao < 10 ? '0' + miao : miao}`
      return time
    },
    as(val) {
      const a = new Date(val)

      return `20${a.getYear() - 100}-${a.getMonth() + 1}-${a.getDay()}`
    }
  },
  watch: {
    $route(to, from) {
      // this.date(this.da, to.query.id)

      this.hotp(this, to.query.id, 'mv')
      this.fun()
      this.current = 0
      // this.date(this, to.query.id)
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
    this.fun()
  }
}
</script>

<style scoped>
.vedio {
  width: 970px;
  margin: 0 auto;
  padding: 0 30px;
  /* box-sizing: border-box; */
  display: flex;
}
.vbo {
  width: 709px;
  padding: 25px 30px 40px 39px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.asdie {
  flex: 1;
}
.vhe-h {
  display: inline-block;
  font-size: 24px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  margin-right: 25px;
  vertical-align: text-bottom;
}
.vhp > a {
  color: rgb(115, 115, 226);
  font-size: 12px;
}
.vhp > a:nth-child(2) {
  margin-right: 10px;
}
.vedi {
  height: 100%;
  width: 100%;
  /* object-fit: fill; */
}
.vhbd {
  position: relative;
  margin: 10px 0;
  height: 360px;
  width: 640px;
}
.vha {
  font-family: 'icomoon';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  background: #dbdbdb;
  border-radius: 50%;
  color: #ffffff;
}
.asdie {
  padding: 20px 40px 40px 30px;
  border: 1px solid #ccc;
}
.ve-he {
  margin-bottom: 10px;
}
.ve-he > p {
  border-bottom: 1px solid rgb(207, 207, 207);
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}
.ve-he > .ve-bd {
  font-size: 12px;
  color: #ccc;
  margin: 5px 0;
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
/* .btt > a:nth-of-type(1) {
  background-image: linear-gradient(180deg, #116ffc, #4c30eb);
  color: white;
} */
.btt > a:nth-of-type(2) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(3) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.btt > a:nth-of-type(1) {
  background-image: linear-gradient(180deg, #f7f7f7, #e0e0e0);
}
.font {
  font-family: 'icomoon';
  font-size: 16px;
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
.vtim {
  position: relative;
}
.vtim > img {
  height: 54px;
  width: 96px;
}
.vtui {
  display: flex;
  height: 54px;
  margin-bottom: 15px;
}
.vtbo > * {
  font-size: 12px;
}
.vtbo {
  margin-left: 5px;
  color: #ccc;
  font-size: 12px;
}
.blac {
  color: black;
}
.wie {
  color: #ccc;
}
.vtou {
  font-size: 12px;
  position: absolute;
  right: 0;
  color: white;
  top: 0;
}
.vtbo > a {
  display: inline-block;
  width: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
</style>
