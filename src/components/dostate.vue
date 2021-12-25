<template>
  <div class="dostate" v-if="dostate">
    <div class="dobody">
      <div class="dahear">
        <h2 class="stleft">
          动态
        </h2>
        <div class="stright">
          <button class="strbu">发动态</button>
          <a class="strbu" href="#" target="_blank">发布视频</a>
        </div>
      </div>
      <div class="dotis" v-if="0">
        <div class="dotisle">
          <span class="doinco"></span>
          近三个月有4首新歌发布
        </div>
        <a class="dotisri xiaolu">快去看看 ></a>
      </div>
      <ul class="dostbody">
        <li class="dostbody_li" v-for="(item, index) in dostate.event" :key="index">
          <img class="dostbody_li_im" :src="item.user.avatarUrl" :alt="item.description" @click="skip('/User', item.user.userId)" />
          <div class="dostbody_li_bo">
            <div class="li_bo_he">
              <router-link :to="`/User?id=${item.user.userId}`" class="li_bo_he_name xiaolu">{{ item.user.nickname }}</router-link>
              <div class="li_bo_he_time">{{ item.eventTime | capitalize }}</div>
            </div>
            <div class="li_bo_bo">{{ item.json.msg }}</div>
            <div class="fexiang" v-if="item.json.song">
              <div class="fexiang_he">
                <img class="fexiang_img" :src="item.json.song.album.blurPicUrl" alt="" />
                <div @click="skip('/Details', item.json.song.id)" class="fexiang_he_it"></div>
              </div>
              <div class="fexiang_body">
                <router-link :to="`/Details?id=${item.json.song.id}`" class="fexiang_he xiaolu">{{ item.json.song.name }}</router-link>
                <div class="fexiang_name">
                  <div class="fexiang_name_id" v-for="(nam, index) in item.json.song.artists" :key="nam.id">
                    <router-link class="minsize xiaolu" :to="`/SingerHome?id=${nam.id}`"> {{ nam.name }}</router-link>
                    <span v-if="index < item.json.song.artists.length - 1"> / </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="fexiang" v-if="item.json.program">
              <div class="fexiang_he">
                <img class="fexiang_img" :src="item.json.program.coverUrl" />
                <div class="fexiang_he_it" @click="tishi"></div>
              </div>
              <div class="fexiang_body" @click="tishi">
                <div class="fexiang_he xiaolu">{{ item.json.program.name }}</div>
                <router-link class="fexiang_name xiaolu" to="/Dostate">
                  {{ item.json.program.radio.name }}
                </router-link>
              </div>
            </div>

            <div class="li_bo_he_foo">
              <p @click="ziydia(item.info.threadId, item.info.liked, typ)" :class="[item.info.liked ? 'red' : '', 'xiaolu']">{{ item.info.likedCount ? `(${item.info.likedCount})` : `` }}</p>
              <span>|</span>
              <p class="xiaolu">转发{{ item.info.shareCount ? `(${item.info.shareCount})` : `` }}</p>
              <span>|</span>
              <p class="xiaolu" @click="huoqu(item.info.threadId)">评论{{ item.info.commentCount ? `(${item.info.commentCount})` : `` }}</p>
            </div>
            <div v-if="muqi.includes(item.info.threadId) && dostlist[item.info.threadId]">
              <Com :sw="dostlist[item.info.threadId].comments" :sh="dostlist[item.info.threadId].hotComments" :qq="false" :typ="typ"></Com>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Little v-else></Little>
</template>

<script>
import win from '@/uitl/feature'
import Com from '@/views/comment'
export default {
  name: 'Dostate',
  data() {
    return {
      dostate: null, // 动态数据
      typ: 6, // 数据类型
      dostlist: {}, // 评论列表
      muqi: [], // 目前展开的评论
      scrol: true
    }
  },
  components: {
    Com
  },
  methods: {
    tishi() {
      win.danwindow('当前内容尚未完成', 0)
    },
    async huoqu(id) {
      if (!this.dostlist[id]) {
        const value = await this.$http(`/comment/event?threadId=${id}`)
        const { comments, hotComments } = value.data
        this.dostlist[id] = { hotComments, comments }
      }
      this.muqi = this.muqi.includes(id) ? this.muqi.filter(value => value != id) : [...this.muqi, id]
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
    }
  },
  async created() {
    window.onscroll = async e => {
      if (document.body.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 1 && this.scrol) {
        this.scrol = false
        const a = (await this.doatst(this.dostate.lasttime)).data
        a.event.forEach(element => {
          element.json = JSON.parse(element.json)
        })
        a.event.forEach(value => {
          const as = value.info.threadId
          !this.dostlist[as] && (this.dostlist[as] = null)
        })
        this.dostate.lasttime = a.lasttime
        this.dostate.event.push(...a.event)
        this.scrol = true
      }
    }
    const a = (await this.doatst(-1)).data
    a.event.forEach(element => {
      element.json = JSON.parse(element.json)
    })
    a.event.forEach(value => {
      const as = value.info.threadId
      this.dostlist[as] = null
    })
    this.dostate = a
  }, // 用户若没登录了跳转到主页
  beforeRouteEnter(to, from, next) {
    const a = localStorage.getItem('user')
    a ? '' : win.danwindow('请先登录', 0)
    a ? next() : next('/')
  }
}
</script>

<style scoped>
.minsize {
  font-size: 12px !important;
  color: #ccc;
}
.red {
  color: red;
}
.xiaolu {
  cursor: pointer;
}
.xiaolu:hover {
  text-decoration: underline #0c73c2 !important;
}
.dostate * {
  font-size: 14px;
}
.dostate {
  margin: 0 auto;
  width: 680px;
  background-color: rgb(255, 255, 255);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.dobody {
  padding: 20px 30px;
}
/* 头部区域 */
.dahear {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 2px solid #c20c0c;
  margin-bottom: 15px;
}
.stleft {
  font-weight: unset;
  font-size: 24px;
}
.strbu {
  font-size: 12px;
  padding: 2px 10px;
  border: 1px solid #ccc;
  border-radius: 100px;
  margin: 6px 0 0 10px;
  font-weight: 700;
  background: transparent;
}
.strbu:hover {
  background-color: rgb(239, 239, 239);
}
/* 新歌发布 */
.dotis {
  display: flex;
  justify-content: space-between;
  background-color: #e9eef5;
  font-size: 12px;
  padding: 0 16px 0 12px;
  line-height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.dotisri {
  color: #235d9d;
  font-weight: 100px;
}
/* 动态详情 */
.dostbody {
  margin-top: 15px;
}
.dostbody_li_im {
  height: 45px;
  width: 45px;
  cursor: pointer;
}
.dostbody_li {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.dostbody_li_bo {
  margin-left: 10px;
  flex: 1;
}
.li_bo_he {
  height: 40px;
  margin-bottom: 15px;
}
.li_bo_he_name {
  color: #235d9d;
}
.li_bo_he_time {
  margin-top: 12px;
  font-size: 12px;
  color: #999999;
}
.li_bo_bo {
  margin: 10px 0;
  color: #333333;
}
/* 分享类容 */
.fexiang {
  padding: 10px;
  display: flex;
  background-color: #f5f5f5;
}
.fexiang_he {
  position: relative;
  color: black;
}
.fexiang_img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.fexiang_body {
  flex: 1;
}
.fexiang_he_it {
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 40px;
  color: rgb(199, 195, 195);
  font-size: 20px;
  font-family: 'icomoon';
  width: 40px;
  height: 40px;
  background-color: rgba(0.5, 0.5, 0.5, 0.1);
  cursor: pointer;
}
.fexiang_name {
  font-size: 12px;
  margin-top: 5px;
  color: #ccc;
}
.fexiang_name_id {
  display: inline-block;
}
/* 底部功能 */
.li_bo_he_foo {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  font-family: 'icomoon';
  color: #0c73c2;
}
.li_bo_he_foo > * {
  font-size: 12px;
}
.li_bo_he_foo > span {
  margin: 0 10px;
  color: #ccc;
}
</style>
