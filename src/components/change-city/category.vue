<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:26:49
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 14:55:14
 -->
<template>
  <div class="">
    <dl :class="['m-categroy', { 'fixed': fixed }]">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item, index) in list" :key="item">
        <a href="javascript:;" @click="handleClick(item, index)">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in blocks" :key="item.title" class="m-categroy-section">
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c" @click="handleClickCity(c)">{{
          c
        }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
import throttle from 'lodash/throttle'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      blocks: JSON.parse(localStorage.getItem('cities_blocks')) || [],
      title: '',
      fixed: false,
    }
  },
  async mounted() {
    // window.addEventListener('scroll', throttle(this.handleScroll, 500))
    // window.addEventListener('scroll', this.handleScroll)
    if (this.blocks.length > 0) {
      return
    } else {
      await this.handleGetCities()
    }
  },
  destroyed() {
    // document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(['setCity']),
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop //滚动高度
      if (scrollTop >= 300) {
        this.fixed = true
      } else {
        this.fixed = false
      }
      console.log('scrollTop', scrollTop)
    },
    // },
    handleClick(title, index) {
      // 第一次滚动之后 就会出bug
      this.handleScroll()
      let firstScrolled = true
      this.title = title
      const target = document.getElementById(`city-${title}`)
      if (!target) {
        return
      }
      const offsetTop = target.offsetTop
      const scrollHeight = document.documentElement.scrollHeight
      const { top, y } = target.getBoundingClientRect()
      // console.log('target', target)
      // console.log('offsetTop', offsetTop)
      // console.log('top', top)
      // console.log('y', y)
      // console.log('scrollHeight', scrollHeight)
      // console.log('this.fixed', this.fixed)
      document.documentElement.scrollTop =
        top - ( this.fixed ? 64 : 0 ) + (firstScrolled ? document.documentElement.scrollTop : 0)
      firstScrolled = false
      // const top = document.querySelector(`#city-${this.title}`).offsetTop
      // document.querySelector(`#city-${this.title}`).scrollIntoView()
    },
    async handleGetCities() {
      let blocks = []
      let ret = await this.$http.getAllCitiesCategory()
      if (ret && ret.data && ret.data[0] && ret.data[0].cities) {
        let p
        let c
        let d = {}
        ret.data[0].cities.forEach(item => {
          p = item.py.toLocaleLowerCase().slice(0, 1)
          c = p.charCodeAt(0)
          if (c > 96 && c < 123) {
            if (!d[p]) {
              d[p] = []
            }
            d[p].push(item.nm)
          }
        })
        for (let [k, v] of Object.entries(d)) {
          blocks.push({
            title: k.toUpperCase(),
            city: v,
          })
        }
        blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        localStorage.setItem('cities_blocks', JSON.stringify(blocks))
        this.blocks = blocks
      }
    },
    handleClickCity(city) {
      this.setCity(city)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.m-categroy {
  display: flex;
  margin-bottom: 15px;
  padding: 10px 20px;
  &.fixed {
    position: fixed;
    top: 0;
    height: 34px;
    padding: 10px 20px;
    background: white;
  }
  dt {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }

  dd {
    font-size: 15px;
    color: #666;
    margin: 0 6px;
    width: 24px;
    height: 24px;
    padding: 4px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;

    &:hover {
      background: #f8f8f8;
    }
  }
}
.m-categroy-section {
  display: flex;
  padding: 13px 30px 13px 10px;
  border-radius: 10px;

  &:hover {
    background: #f8f8f8;
  }

  dt {
    box-sizing: border-box;
    vertical-align: top;
    padding-top: 10px;
    display: inline-block;
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background: #13d1be;
    box-shadow: 0 4px 5px 0 rgba(39, 178, 164, 0.22);
  }

  dd {
    flex: 1;

    span {
      margin: 10px 20px;
      color: #666;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
