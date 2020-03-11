<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:26:37
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 14:54:53
 -->
<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id" @click="handleSetCity(item.nm)">
        {{ item.nm }}
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    let ret = await this.$http.getAllCities({ data: { isHot: 1 } })
    if (ret.data.length > 0) {
      this.list = ret.data.map(item => item.cities)
      console.log(this.list)
    }
  },
  methods: {
    ...mapActions(['setCity']),
    handleSetCity(nm) {
      this.setCity(nm)
      this.$router.push("/")
    }
  }
}
</script>

<style scoped lang="scss">
.m-hcity {
  padding: 20px;
  dl {
    display: flex;

    dt {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }

    dd {
      margin: 0 20px;
      color: #666;
      line-height: 22px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
