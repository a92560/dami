<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-28 19:00:21
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-28 19:14:56
 -->
<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    background
    layout="prev, pager, next, total"
  >
  </el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    },
    total: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit("currentPageChange", currentPage)
    }
  },
}
</script>
<style lang="less" scoped>
</style>