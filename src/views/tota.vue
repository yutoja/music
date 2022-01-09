<template>
  <div class="foote">
    <input type="button" class="anliu" value="上一页" @click="app" :disabled="current < 6" />
    <a :class="{ zpgi: item != '...', zpxu: tocal === item }" v-for="(item, index) in total" :key="index" @click="current = item * 1">{{ item }}</a>
    <input type="button" class="anliu" value="下一页" @click="add" :disabled="current > conshu - 5" />
  </div>
</template>

<script>
export default {
  name: 'Toca',
  props: {
    consh: {
      type: Number,
      default: 0
    },
    tocal: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      total: null,
      conshu: this.consh,
      current: this.tocal
    }
  },
  methods: {
    foototal(value) {
      const toal = value
      if (toal < 6) {
        this.total = [1, 2, 3, 4, 5, 6, 7, 8, '...', this.conshu]
      } else if (toal > 5 && toal < this.conshu - 4) {
        this.total = [1, '...', toal - 3, toal - 2, toal - 1, toal, toal + 1, toal + 2, toal + 3, '...', this.conshu]
      } else {
        this.total = [1, '...', this.conshu - 7, this.conshu - 6, this.conshu - 5, this.conshu - 4, this.conshu - 3, this.conshu - 2, this.conshu - 1, this.conshu]
      }
    },
    async add() {
      this.current++
    },
    async app() {
      this.current--
    }
  },
  created() {
    this.total = [1, 2, 3, 4, 5, 6, 7, 8, '...', this.conshu]
  },
  watch: {
    current(ne, old) {
      this.foototal(ne)
      clearTimeout(this.cur)
      this.cur = setTimeout(async () => {
        this.$emit('apd', ne)
      }, 200)
    }
  }
}
</script>

<style scoped>
/* 分页 */
.foote {
  display: flex;
  align-items: center;
  justify-content: center;
}
.zpgi {
  border: 1px solid #ccc;
  padding: 0px 6px;
  margin: 0 5px;
  border-radius: 2px;
  color: black;
}
.zpgi:hover {
  border: 1px solid black;
}
.zpxu {
  background: linear-gradient(#e1151d, #c70b0e);
  color: white;
  border-color: #a2161b;
}
.anliu {
  display: inline-block;
  line-height: 24px;
  width: 50px;
  color: black;
  background-image: linear-gradient(180deg, #ffffff, rgb(236, 236, 236));
  box-shadow: 0 0 1px 1px rgba(0.5, 0.5, 0.5, 0.2);
}
.anliu:hover {
  background-image: linear-gradient(180deg, rgb(236, 236, 236), #ffffff);
}
</style>
