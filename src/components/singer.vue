<template>
  <div class="singer">
    <div class="hea">
      <dl>
        <dt class="dt">语种：</dt>
        <dd class="dd" v-for="(item, index) in zho" :key="index">
          <a :class="{ back: add().area == item[1] }" :href="`/Singer?area=${item[1]}${add().type ? `&type=${add().type}` : ''}${add().initial ? `&initial=${add().initial}` : ''}`">{{ item[0] }}</a>
        </dd>
      </dl>
      <dl>
        <dt class="dt">分类：</dt>
        <dd class="dd" v-for="(item, index) in ge" :key="index">
          <a :class="{ back: add().type == item[1] }" :href="`/Singer?type=${item[1]}${add().area ? `&area=${add().area}` : ''}${add().initial ? `&initial=${add().initial}` : ''}`">{{ item[0] }}</a>
        </dd>
      </dl>
      <dl>
        <dt class="dt">筛选：</dt>
        <dd class="dd cl" v-for="(item, index) in zi" :key="index">
          <a :class="{ back: add().initial === item }" :href="`/Singer?initial=${item}${add().area ? `&area=${add().area}` : ''}${add().type ? `&type=${add().type}` : ''}`">{{ item }}</a>
        </dd>
      </dl>
    </div>
    <div class="sibd">
      <div class="xl" v-for="item in dat" :key="item.id">
        <a :href="`/SingerHome?id=${item.id}`" class="img">
          <img :src="item.img1v1Url" :title="item.name" />
        </a>
        <p class="weng ove">
          <a :href="`/SingerHome?id=${item.id}`" class="xiaolu  ">{{ item.name }}</a>
        </p>
      </div>
    </div>
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
      shu: 1
    }
  },
  methods: {
    add() {
      return this.$route.query
    }
  },
  async created() {
    window.addEventListener('scroll', async e => {
      if (document.body.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 1) {
        this.shu++
        const {
          data: { artists }
        } = await this.$http(`/artist/list?${this.$route.query.type ? `type=${this.$route.query.type}` : ''}&${this.$route.query.area ? `area=${this.$route.query.area}` : ''}&${this.$route.query.initial ? `initial=${this.$route.query.initial}` : ''}&limit=${this.shu * 10}`)
        this.dat = artists
      }
    })
    const {
      data: { artists }
    } = await this.$http('/artist/list?type=-1&area=-1&limit=10')
    this.dat = artists
  },
  watch: {
    async id() {
      const {
        data: { artists }
      } = await this.$http(`/artist/list?${this.$route.query.type ? `type=${this.$route.query.type}` : ''}&${this.$route.query.area ? `area=${this.$route.query.area}` : ''}&${this.$route.query.initial ? `initial=${this.$route.query.initial}` : ''}&limit=10`)
      this.dat = artists
    }
  },
  computed: {
    id() {
      return this.$route.query.type + this.$route.query.area + this.$route.query.initial
    }
  }
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
  min-height: 1000px;
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
