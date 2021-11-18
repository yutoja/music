<template>
  <div class="singer">
    <div class="hea">
      <dl>
        <dt class="dt">语种：</dt>
        <dd class="dd" v-for="(item, index) in zho" :key="index">
          <router-link :class="{ back: add().area == item[1] }" :to="`/Singer?area=${item[1]}${add().type ? `&type=${add().type}` : ''}${add().initial ? `&initial=${add().initial}` : ''}`">{{ item[0] }}</router-link>
        </dd>
      </dl>
      <dl>
        <dt class="dt">分类：</dt>
        <dd class="dd" v-for="(item, index) in ge" :key="index">
          <router-link :class="{ back: add().type == item[1] }" :to="`/Singer?type=${item[1]}${add().area ? `&area=${add().area}` : ''}${add().initial ? `&initial=${add().initial}` : ''}`">{{ item[0] }}</router-link>
        </dd>
      </dl>
      <dl>
        <dt class="dt">筛选：</dt>
        <dd class="dd cl" v-for="(item, index) in zi" :key="index">
          <router-link :class="{ back: add().initial === item }" :to="`/Singer?initial=${item}${add().area ? `&area=${add().area}` : ''}${add().type ? `&type=${add().type}` : ''}`">{{ item }}</router-link>
        </dd>
      </dl>
    </div>
    <div class="sibd" v-if="dat">
      <div class="xl" v-for="item in dat" :key="item.id">
        <router-link :to="`/SingerHome?id=${item.id}`" class="img">
          <img :src="item.img1v1Url" :title="item.name" />
        </router-link>
        <p class="weng ove">
          <router-link :to="`/SingerHome?id=${item.id}`" class="xiaolu  ">{{ item.name }}</router-link>
        </p>
      </div>
    </div>
    <Little v-else></Little>
  </div>
</template>

<script>
export default {
  name: 'singer',
  data() {
    return {
      zi: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      zho: [
        ['全部', -1],
        ['华语', 7],
        ['欧美', 96],
        ['日本', 8],
        ['韩国', 16],
        ['其他', 0]
      ],
      ge: [
        ['全部', -1],
        ['男歌手', 1],
        ['女歌手', 2],
        ['乐队组合', 3]
      ],
      dat: null,
      shu: 1,
      scrol: true
    }
  },
  methods: {
    add() {
      return this.$route.query
    }
  },
  async created() {
    window.addEventListener('scroll', async e => {
      if (document.body.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 1 && this.scrol) {
        this.scrol = false
        this.shu++
        const query = this.$route.query
        const {
          data: { artists }
        } = await this.$http(`/artist/list?${query.type ? `type=${query.type}` : ''}&${query.area ? `area=${query.area}` : ''}&${query.initial ? `initial=${query.initial}` : ''}&limit=10&offset=${this.shu * 10}`)
        this.dat.push(...artists)
        this.scrol = true
      }
    })
    const {
      data: { artists }
    } = await this.$http('/artist/list?type=-1&area=-1&limit=10')
    this.dat = artists
  },
  watch: {
    async $route(to, from) {
      const {
        data: { artists }
      } = await this.$http(`/artist/list?${to.query.type ? `type=${to.query.type}` : ''}&${to.query.area ? `area=${to.query.area}` : ''}&${to.query.initial ? `initial=${to.query.initial}` : ''}&limit=10`)
      this.dat = artists
    }
  }
  //  beforeRouteEnter (to, from, next) {
  //   const {
  //     data: { artists }
  //   } = await this.$http('/artist/list?type=-1&area=-1&limit=10')
  //   next(artists)
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.dat =
  // },
}
</script>

<style scoped>
.back {
  background-color: rgb(211, 15, 15);
  background-size: 10px;
  color: white !important;
  border-radius: 5px;
}
.singer {
  margin: 0 auto;
  width: 960px;
  padding: 30px;
}
.hea > dl {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}
.dt {
  color: black;
}
.dd {
  margin-bottom: 10px;
}
.dd > a {
  color: var(--color);
  padding: 0 10px 0 10px;
}
.dd > a:hover {
  color: var(--color-y);
}
.as {
  margin: 0 10px;
  color: var(--color);
}
.cl:nth-of-type(n)::after,
.dd:nth-of-type(n)::after {
  content: '|';
  margin: 0 10px;
  color: var(--color);
}
.cl:nth-of-type(26)::after {
  display: none;
}
.hidd::after {
  display: none;
}
.cl:nth-of-type(17) {
  margin-left: 48px;
}
.sibd {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
}
.weng {
  width: 130px;
  margin-top: 10px;
}
.weng > a {
  color: var(--color-y);
}
.xl {
  margin: 0 50px 30px 0;
}
.img > img {
  width: 140px;
  height: 140px;
}
</style>
