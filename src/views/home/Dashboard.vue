<template>
  <div class="container">
    <my-table :listData="reportList" :="tableContentConfig" :isShow="false">
      <template #createDate="scope">
        {{ $filter.formatTime(scope.row.createDate) }}
      </template>
      <template #reportStatus="scope">
        <el-tag v-if="scope.row.reportStatus == 0" type="warning">审核中</el-tag>
        <el-tag v-else-if="scope.row.reportStatus == 1" type="success">举报通过</el-tag>
        <el-tag v-else="danger">举报失败</el-tag>
      </template>
      <template #handler="scope">
        <el-button icon="el-icon-edit" size="mini" type="warning" @click="showVisible(scope.row)"></el-button>
        <el-popconfirm title="确认删除吗?" @confirm="handleDeleteClick(scope.row)">
          <template #reference>
            <el-button icon="el-icon-delete" size="mini" type="danger">
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </my-table>

    <el-dialog v-model="dialogVisible" title="审核评论" width="30%">
      <el-radio v-model="radioValue" label="1" size="large">通过</el-radio>
      <el-radio v-model="radioValue" label="2" size="large">不通过</el-radio>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit()">确认</el-button>
        </span>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import MyTable from '@/components/MyTable.vue';
import { tableContentConfig } from './config/report.config';
import { deleteReportReq, auditReportReq } from '@/services/report'

const store = useStore();

const dialogVisible = ref(false)
const radioValue = ref()
const content = ref()

store.dispatch('report/getReportListAction');
const reportList = computed(() => store.state.report.reportList)

const showVisible = (row) => {
  content.value = row
  dialogVisible.value = true
}

const handleDeleteClick = async ({ id }) => {
  const { code } = await deleteReportReq(id)
  if (code === 200) {
    ElMessage.success('删除成功~')
    store.dispatch('report/getReportListAction');
  }
}

const handleSubmit = async () => {
  content.value.reportStatus = parseInt(radioValue.value)
  const { code } = await auditReportReq(content.value)
  if (code === 200) {
    ElMessage.success('审核成功~')
    store.dispatch('report/getReportListAction');
  }
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
</style>