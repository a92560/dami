<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 14:07:23
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 14:44:22
 -->
<template>
  <el-table :data="data" border>
    <template v-for="column in columns">
      <el-table-column
        v-if="!column.template"
        :key="column.title"
        :label="column.title"
        :prop="column.key"
        :type="column.type && column.type"
        :align="column.align && column.align"
        :width="column.width && column.width"
      >
      </el-table-column>
      <el-table-column
        v-else-if="column.template && !column.filterTemplate"
        :key="column.title"
        :label="column.title"
        :prop="column.key"
        :type="column.type && column.type"
        :width="column.width && column.width"
        :align="column.align && column.align"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.template && column.filterTemplate && !column.type"
        :key="column.title"
        :label="column.title"
        :prop="column.key"
        :type="column.type && column.type"
        :width="column.width && column.width"
        :align="column.align && column.align"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.orderType === '未支付'"
            @click="handleToPay(scope.row)"
            >去支付</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.template && column.filterTemplate && column.type"
        :key="column.title"
        :label="column.title"
        :prop="column.key"
        :type="column.type && column.type"
        :width="column.width && column.width"
        :align="column.align && column.align"
      >
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ scope.row.itemName }}</span>
            </el-form-item>
            <el-form-item label="座位">
              <span v-for="item in scope.row.seat" style="margin-right: 20px"
                >{{ item.seat }}-{{ item.price }}元</span
              >
            </el-form-item>
            <div v-if="scope.row.invoiceId != '5e5768ba7856393eccf1435a'">
              <el-form-item label="发票类型">
                <span>{{
                  scope.row.invoiceType === '0' ? '个人' : '公司'
                }}</span>
              </el-form-item>
              <el-form-item
                :label="scope.row.invoiceType === '0' ? '姓名' : '公司抬头'"
              >
                <span>{{ scope.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="税号">
                <span>{{ scope.row.taxNumber }}</span>
              </el-form-item>
            </div>

            <el-form-item label="总金额">
              <span>{{
                scope.row.totalAmount + scope.row.insuranceAmount
              }}</span>
            </el-form-item>
            <!-- <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    border: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  methods: {
    handleDelete(i, item) {
      this.$emit('handleRemove', i, item)
    },
    handleToPay(item) {
      console.log('item._id', item._id)
      this.$emit('handleToPay', item._id)
    },
  },
}
</script>
<style lang="less" scoped></style>
