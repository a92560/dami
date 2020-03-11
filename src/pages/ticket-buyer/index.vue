<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-07 11:51:18
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-08 16:31:13
 -->
<template>
  <div class="buyer-wrapper">
    <div class="add-btn tc fr" @click="sureToAdd">新建购票人</div>
    <m-table
      class="ticket-buyer-table"
      :columns="columns"
      :data="buyerData"
      :border="true"
      @handleRemove="handleRemove"
    ></m-table>

    <el-dialog
      title="添加购票人"
      :lock-scroll="false"
      :visible.sync="showAddTicketBuyerDialog"
      width="40%"
    >
      <el-form
        :model="addTicketBuyerForm"
        ref="addTicketBuyerForm"
        :rules="ticketBuyerFormRules"
      >
        <el-form-item label="姓名" :label-width="labelWidth" prop="name">
          <el-input
            v-model="addTicketBuyerForm.name"
            placeholder="请填写姓名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="证件号" :label-width="labelWidth" prop="cardID">
          <el-input
            v-model="addTicketBuyerForm.cardID"
            placeholder="请填写证件号"
          />
        </el-form-item>
        <el-form-item label="证件类型" :label-width="labelWidth">
          <el-radio-group
            v-model="addTicketBuyerForm.cardType"
            @click="handleCardTypeChange"
          >
            <el-radio label="0">身份证</el-radio>
            <el-radio label="1" style="margin-left: 15px">军官证</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" prop="cardType">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MTable from '@/components/table'
import { ticketBuyerColumns } from '@/config'
export default {
  name: 'TicketBuyer',
  components: {
    MTable,
  },
  data() {
    return {
      columns: ticketBuyerColumns,
      buyerData: [],
      addTicketBuyerForm: {
        // 姓名
        name: '范磊',
        // 证件号
        cardID: '372892303849230398',
        // 证件类型
        cardType: '0',
      },
      showAddTicketBuyerDialog: false,
      ticketBuyerFormRules: {
        name: [
          {
            required: true,
            message: '姓名为必填项',
            trigger: 'blur',
          },
        ],
        cardID: [
          {
            required: true,
            message: '身份证号为必填项',
            trigger: 'blur',
          },
          {
            type: 'string',
            min: 15,
            message: '身份证号不能小于15位',
            trigger: 'blur',
          },
        ],
      },
      labelWidth: '20',
    }
  },
  methods: {
    async getBuyerData() {
      const ret = await this.$http.getOrderTicketBuyerList()
      if (ret) {
        if (ret.data[0].ticketBuyerList) {
          this.buyerData = ret.data[0].ticketBuyerList.map(item => {
            return {
              linkId: item.linkId,
              name: item.name,
              cardId: item.cardId,
              cardType: item.cardType === '0' ? '身份证' : '军官证',
              _id: item._id,
            }
          })
        } else {
          this.buyerData = []
        }
      }
    },
    // 处理删除购票人
    async handleRemove(i, item) {
      console.log('handleRemove:::::', i, item)

      this.$msgBox
        .confirm('确定删除该购票人?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        })
        .then(async () => {
          const ret = await this.$http.deleteTicketBuyer({
            data: { id: item._id },
          })
          if (ret && ret.message) {
            this.$message.success(ret.message)
            await this.getBuyerData()
          }
        })
        .catch(() => {})
    },
    // 处理管理dialog
    handleClose() {
      this.showAddTicketBuyerDialog = false
      this.$refs['addTicketBuyerForm'].resetFields()
    },
    // 处理确定添加
    async handleAdd() {
      const { name, cardID, cardType } = this.addTicketBuyerForm
      const ret = await this.$http.postTicketBuyer({
        name,
        cardId: cardID,
        cardType,
      })
      if (ret && ret.message) {
        this.$message.success(ret.message)
        await this.getBuyerData()
      }
      this.showAddTicketBuyerDialog = false
    },
    // 处理展示
    sureToAdd() {
      this.showAddTicketBuyerDialog = !this.showAddTicketBuyerDialog
    },
    handleCardTypeChange(value) {
      this.cardType = value
    },
  },
  mounted() {
    this.getBuyerData()
  },
}
</script>
<style lang="less">
.el-form-item {
  margin-bottom: 15px;
}
.buyer-wrapper {
  width: 100%;
  .add-btn {
    background: @HoverC;
    color: white;
    padding: 5px 10px;
    width: 92px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
}
</style>
