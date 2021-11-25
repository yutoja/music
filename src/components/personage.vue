<template>
  <div class="personage" v-if="diaa">
    <div class="scto">
      <div class="left">
        <h2 class="lehe hov" @click="tab = 1">我的歌手</h2>
        <div>
          <div class="leboh font" @click="lre = !lre">{{ lre ? '' : '' }} 创建的歌单{{ daia.length > 0 ? `(${daia.length})` : `` }}</div>
          <ul v-show="lre">
            <li class="hov leli" v-for="item in daia" :key="item.id" @click="skip('/Personage', item.id), (tab = 0)">
              <img :src="item.coverImgUrl" class="leim" />
              <span>
                <p class="lep ove">{{ item.name }}</p>
                <span>{{ item.trackCount }}首</span>
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div class="leboh font" @click="lfirst = !lfirst">{{ lfirst ? '' : '' }} 收藏的歌单{{ diaa.length > 0 ? `(${diaa.length})` : `` }}</div>
          <ul v-show="lfirst">
            <li class="hov leli" v-for="item in diaa" :key="item.id" @click="skip('/Personage', item.id), (tab = 0)">
              <img :src="item.coverImgUrl" class="leim" />
              <span>
                <p class="lep ove">{{ item.name }}</p>
                <span>{{ item.trackCount }}首</span>
              </span>
            </li>
          </ul>
          <div class="zishi"></div>
        </div>
      </div>
      <div class="right">
        <component v-bind:is="com[tab]" :qu="daia[0].id"></component>
      </div>
    </div>
  </div>
  <Little v-else></Little>
</template>

<script>
import Xiang from '@/components/xiang'

import Een from '@/views/ggen'
export default {
  name: 'Personage',
  data() {
    return {
      // 创建的歌单
      lfirst: true,
      // 收藏的歌单
      lre: true,
      daia: null,
      diaa: null,
      com: [Xiang, Een],
      tab: 0
    }
  },
  components: {
    Xiang,
    Een
  },
  created() {
    const id = this.$store.state.user.account.id
    this.$http(`/user/playlist?uid=${id}`).then(value => {
      this.daia = value.data.playlist.filter(value => value.userId == id)
      this.diaa = value.data.playlist.filter(value => value.userId != id)
    })
  }
}
</script>

<style scoped>
.zishi {
  height: 1000px;
}
.personage {
  width: 98vw;
}
.scto {
  margin: 0 auto;
  width: 982px;
  display: flex;
}
.left {
  position: fixed;
  top: 105px;
  padding-bottom: 50px;
  padding-top: 40px;
  width: 245px;
  border: 1px solid #d3d3d3;
  background-color: white;
  overflow-y: auto;
  overflow-x: none;
}
.lehe {
  font-size: 14px;
  padding: 10px 0;
  padding-left: 50px;
  cursor: pointer;
}
.hov:hover {
  background-color: rgb(240, 240, 240);
}
.leboh {
  font-size: 14px;
  font-weight: bold;
  padding-left: 29px;
  cursor: pointer;
  color: black;
  margin-bottom: 12px;
  user-select: none;
}
.leim {
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border: 1px solid #ccc;
}
.leli {
  padding: 6px 0;
  display: flex;
  font-size: 12px;
  padding-left: 27px;
  cursor: pointer;
}
.lep {
  margin-bottom: 10px;
  width: 140px;
}
.right {
  margin-left: 246px;
}
</style>
