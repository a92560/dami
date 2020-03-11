<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:26:24
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:42:24
 -->
<template>
  <div class="m-iselect">
    <div>
      <span class="name">按省份选择:</span>
      <el-select v-model="pvalue" class="province" placeholder="省份">
        <el-option
          v-for="item in provinces"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="cvalue" :disabled="!cities.length" placeholder="城市">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      provinces: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: [],
    }
  },
  watch: {
    pvalue: async function(newPvalue) {
      // 重新选择了省份
      let ret = await this.$http.getProCities({ data: { proId: newPvalue } })
      if (ret) {
        console.log('ret.data', ret)
        this.cities = ret.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        // 清空当前选中的城市
        this.cvalue = ''
      }
    },
  },
  async mounted() {
    let ret = await this.$http.getProvinces()
    if (ret) {
      this.provinces = ret.data.map(item => {
        return {
          value: item.id,
          label: item.value,
        }
      })
    }
  },
  methods: {
    ...mapActions(['setCity']),
    querySearchAsync: debounce(async function(query, cb) {
      let ret = await this.$http.getAllCitiesSearch({ data: { city: query } })
      console.log('ret', ret)
      if (ret && ret.data) {
        let retArr = ret.data.map(item => {
          return {
            value: item.cities.nm,
          }
        })
        cb(retArr)
      } else {
        cb([])
      }
    }, 500),
    handleSelect: function(item) {
      console.log('item', item)
      this.setCity(item.value)
      this.$router.push("/")
    },
  },
}
</script>

<style lang="less" scoped>
.page-changeCity {
  width: 1190px;
  box-sizing: border-box;
  margin: 20px auto 0;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  min-height: 1000px;
  padding: 20px;

  .m-iselect {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .name {
      font-size: 14px;
      margin-right: 5px;
    }
    .el-select.province {
      margin-right: 5px;
    }
    .province {
      cursor: pointer;
      border-radius: 4px;
      margin: 0 10px 0 20px;
    }

    .city {
      cursor: not-allowed;
      border-radius: 4px;
      margin: 0 20px 0 10px;
    }

    .label {
      margin-left: 40px;
    }

    .input {
      width: 220px;
      height: 40px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 14px;
      color: #666;
      box-sizing: border-box;
    }
  }
  .el-row {
    padding-bottom: 20px;
    &:after {
      content: ' ';
      height: 1px;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      padding-top: 20px;
    }
  }
}
</style>
