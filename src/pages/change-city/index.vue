<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:24:29
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 14:47:47
 -->
<template>
  <div class="page-changeCity container">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/change-city/is-select.vue'
import Hot from '@/components/change-city/hot.vue'
import Categroy from '@/components/change-city/category.vue'
export default {
  components:{
    iSelect,
    Hot,
    Categroy
  }
}
</script>

<style lang="less">
.page-changeCity{
  background: white;
}
</style>
