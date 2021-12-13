<template>
  <div class="comment">
    <div class="thead">
      <h2>评论</h2>
      <span>共有{{ su }}评论</span>
    </div>
    <div class="discuss">
      <div class="dsisscu"><img :src="sess ? sess.profile.avatarUrl : ''" /><textarea v-model="text" @focus="fouc = true" @blur="fouc = false"></textarea></div>
      <input type="button" value="评论" @click="pilun(text, 1)" />
    </div>
    <div class="zhon" v-if="hot.length > 0">
      <div class="jizai">
        精彩评论
      </div>
      <div :class="{ jibody: true, shaa: sess && sess.bindings[0].userId == item.user.userId }" v-for="item in hot" :key="item.commentId">
        <img :src="item.user.avatarUrl" alt="" @click="skip('/User', item.user.userId)" />
        <div class="qu">
          <div class="lun">
            <span class="xiaolul" @click="skip('/User', item.user.userId)">{{ item.user.nickname }}</span> ：
            {{ item.content }}
          </div>
          <div class="hu" v-if="item.beReplied && item.beReplied.length > 0">
            <span class="xiaolul">{{ item.beReplied[0].user.nickname }}</span> ：
            {{ item.beReplied[0].content }}
          </div>
          <div class="qufoot">
            <span>{{ item.timeStr }}</span>
            <div class="bo">
              <span class="xiaolul sha" @click=";(tish = true), (dat = item.commentId)">删除</span>
              <span class="xiaolul" @click="diaz(cidd, item.commentId, typ, item.liked)"><span v-bind:class="[item.liked ? 'red' : 'blue']"></span>({{ item.likedCount }})</span>
              <span class="xiaolul" @click="fuid == item.commentId ? (fuid = '') : (fuid = item.commentId)"> <span class="blue"></span>回复</span>
            </div>
          </div>
        </div>
        <div class="discuss1" v-if="item.commentId == fuid">
          <div class="dsisscu1"><img :src="sess ? sess.profile.avatarUrl : ''" /><textarea v-model="hhuifu" :placeholder="`回复${item.user.nickname}`"></textarea></div>
          <input type="button1" value="回复" @click="pilun(hhuifu, 2, item.commentId), (hhuifu = '')" />
        </div>
      </div>
    </div>
    <div class="zhon" v-if="news.length > 0">
      <div class="jizai">
        最新评论
      </div>
      <div :class="{ jibody: true, shaa: sess && sess.bindings[0].userId == item.user.userId }" v-for="(item, index) in news" :key="index">
        <img :src="item.user.avatarUrl" alt="" @click="skip('/User', item.user.userId)" />
        <div class="qu">
          <div class="lun">
            <span class="xiaolul" @click="skip('/User', item.user.userId)">{{ item.user.nickname }}</span> ：
            {{ item.content }}
          </div>
          <div class="hu" v-if="item.beReplied && item.beReplied.length > 0">
            <span class="xiaolul">{{ item.beReplied[0].user.nickname }}</span> ：
            {{ item.beReplied[0].content }}
          </div>
          <div class="qufoot">
            <span>{{ item.time | apitalize }}</span>
            <div class="bo">
              <span class="xiaolul sha" @click=";(tish = true), (dat = item.commentId)">删除</span>
              <span class="xiaolul" @click="diaz(cidd, item.commentId, typ, item.liked)"><span v-bind:class="[item.liked ? 'red' : 'blue']"></span>({{ item.likedCount }})</span>
              <span class="xiaolul" @click="fuid == item.commentId ? (fuid = '') : (fuid = item.commentId)"> <span class="blue"></span>回复</span>
            </div>
          </div>
        </div>
        <div class="discuss1" v-if="item.commentId == fuid">
          <div class="dsisscu1"><img :src="sess ? sess.profile.avatarUrl : ''" /><textarea v-model="hhuifu" :placeholder="`回复${item.user.nickname}`"></textarea></div>
          <input type="button" value="回复" @click="pilun(hhuifu, 2, item.commentId), (hhuifu = '')" />
        </div>
      </div>
    </div>
    <div class="boos" v-if="tish">
      <div class="tishi">
        <div class="tihe">
          <span>删除</span>
          <span @click=";(tish = false), (dat = '')" class="yiu">x</span>
        </div>
        <div class="tibod">
          <span>确定删除吗</span>
          <div class="tiba">
            <button @click="remo(), (tish = false), (dat = '')">确定</button>
            <button @click=";(tish = false), (dat = '')">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    sw: {
      type: [Array, Object],
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    sh: {
      type: [Array, Object],
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    su: {
      type: Number,
      default: 0
    },
    typ: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      hot: this.sh,
      news: this.sw,
      text: '',
      hhuifu: '',
      fuid: 0,
      tish: false,
      dat: '',
      fouc: false
    }
  },
  filters: {
    apitalize: function(val) {
      let shi = parseInt((+new Date() - val) / 1000 / 60 / 6 / 24)
      if (shi / 10 > 10) {
        const a = new Date(val)
        return `20${a.getYear() - 100}-${a.getMonth() + 1}-${a.getDay()}`
      }
      shi = parseInt(((+new Date() - val) / 1000 / 60) % 60)
      return shi < 60 ? (shi < 1 ? '刚刚更新' : shi + '分钟前') : shi / 60 + '小时前'
    }
  },
  methods: {
    pilun(text, t, commentId) {
      if (!text.trim()) return ''
      if (commentId) {
        this.pinlu(this.cidd, text, this.typ, t, commentId)
        this.fuid = 0
      } else {
        this.pinlu(this.cidd, text, this.typ, t)
      }
      this.text = ''
    },
    remo() {
      this.remov(this.cidd, this.typ, this.dat)
    }
  },
  watch: {
    sh: {
      handler() {
        this.hot = this.sh
      },
      deep: true
    },
    sw: {
      handler() {
        this.news = this.sw
      },
      deep: true
    }
  },
  computed: {
    cidd() {
      return this.$route.query.id
    },
    sess() {
      return this.$store.state.user
    }
  },
  created() {
    window.addEventListener('keyup', e => {
      if (this.fouc && e.keyCode === 13) {
        this.pilun(this.text, 1)
      }
    })
  }
}
</script>

<style scoped>
.thead {
  display: flex;
  height: 35px;
  border-bottom: 2px red solid;
  line-height: 35px;
}
.thead > h2 {
  font-weight: normal;
  font-size: 20px;
  margin-right: 10px;
}
.thead > span {
  color: #999;
  font-size: 12px;
  vertical-align: bottom;
}
.jizai {
  line-height: 30px;
  border-bottom: 1px solid rgb(211, 211, 211);
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}
.jibody {
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.jibody > img {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.lun > span {
  color: rgb(192, 192, 245);
}
.bo {
  font-family: 'icomoon';
  user-select: none;
}
.qufoot {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.qu {
  flex: 1;
}
.blue {
  color: blue;
}
.red {
  color: red;
}
.bo > span {
  margin: 0 5px;
}
.xiaolul:hover {
  text-decoration: underline;
  cursor: pointer;
}

.hu {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ebebeb;
  border: 1px solid #ccc;
}
.hu > span {
  color: rgb(192, 192, 245);
}
.discuss {
  margin: 10px 0 0 10px;
  height: 65px;
  display: flex;
}
.dsisscu > img {
  height: 40px;
  width: 40px;
  vertical-align: top;
  margin-top: 10px;
  margin-right: 10px;
}
.dsisscu > textarea {
  width: 475px;
  height: 60px;
  border: 2px solid #ccc;
  outline: none;
  resize: none;
  padding: 5px;
  box-sizing: border-box;
}
.dsisscu > textarea:hover {
  border: 2px solid rgb(118, 118, 238);
}
.discuss > input {
  height: 60px;
  flex: 1;
  background-color: aqua;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.discuss1 {
  margin: 10px 0 0 10px;

  display: flex;
}
.dsisscu1 {
  margin-left: 40px;
}
.dsisscu1 > img {
  height: 20px;
  width: 20px;
  vertical-align: top;
  margin-top: 5px;
  margin-right: 10px;
  float: left;
}
.dsisscu1 > textarea {
  float: right;
  width: 475px;
  height: 30px;
  border: 2px solid #ccc;
  outline: none;
  resize: none;
  padding: 5px;
  box-sizing: border-box;
}
.dsisscu1 > textarea:hover {
  border: 2px solid rgb(118, 118, 238);
}
.discuss1 > input {
  height: 30px;
  width: 50px;
  background-color: aqua;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  text-align: center;
}
.lun {
  white-space: pre-line;
  word-break: break-all;
}
.tishi {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 180px;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 20px 5px rgba(0.5, 0.5, 0.5, 0.5);
  z-index: 999;
}
.tishi > .tihe {
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding: 0 10px;
}
.tibod {
  padding-top: 40px;
  box-sizing: border-box;
  background-color: #fff;
  height: 150px;
  text-align: center;
}
.tiba {
  margin-top: 20px;
}
.tiba > button {
  height: 30px;
  width: 70px;
  border-radius: 5px;
  cursor: pointer;
}
.tiba > button:nth-child(1) {
  background-image: linear-gradient(180deg, #fff, blue);
  margin-right: 30px;
}
.tiba > button:nth-child(2) {
  background-image: linear-gradient(180deg, rgb(155, 155, 155), rgb(219, 219, 219));
  margin-right: 10px;
}
.yiu {
  cursor: pointer;
}
.boos {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  user-select: none;
}
.sha {
  display: none;
}
.shaa:hover .sha {
  display: inline-block;
}
</style>
