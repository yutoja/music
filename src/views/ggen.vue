<template>
  <div class="Een">
    <div class="ehe">
      我的歌手
    </div>
    <div class="eeb">
      <div class="body" v-for="item in dat" :key="item.id">
        <img :src="item.img1v1Url" @click="skip('/SingerHome', item.id)" class="cur" />
        <div class="bow">
          <h4 @click="skip('/SingerHome', item.id)" class="cur">{{ item.name }}</h4>
          <span>
            <span v-show="item.albumSize > 0">{{ item.albumSize }}个专辑 </span>
            <span v-show="item.mvSize > 0">{{ item.mvSize }}个mv</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Een',
  data() {
    return {
      dat: null
    }
  },
  created() {
    const a = localStorage.getItem('co')
    this.$http(`/artist/sublist?cookie=${a}`).then(value => {
      const {
        data: { data }
      } = value
      this.dat = data
    })
  }
}
</script>

<style scoped>
.Een {
  width: 709px;
  padding: 40px;
  background-color: white;
}
.ehe {
  font-size: 24px;
  padding-bottom: 10px;
  border-bottom: 2px solid #c20c0c;
}
.cur {
  cursor: pointer;
}
.eeb {
  border-bottom: 1px solid #ccc;
}
.body {
  display: flex;
  padding: 10px 0;
}
.body > img {
  width: 80px;
  height: 80px;
}
.bow {
  margin-left: 10px;
  font-size: 12px;
}
.bow > h4 {
  font-size: 16px;
  margin: 10px 0;
}
</style>
