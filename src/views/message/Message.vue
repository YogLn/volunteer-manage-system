<template>
  <div>
    <my-table :listData="messageList"
              :="contentTableConfig"
              :listCount="total"
              v-model:page="pageInfo">
      <template #createAt="scope">
        <strong>{{$filter.formatTime(scope.row.createAt)}}</strong>
      </template>
      <template #avatar="scope">
        <template v-if="scope.row.user.avatar">
          <img :src="scope.row.user.avatar"
               alt="">
        </template>
				<template v-else>无</template>
      </template>
      <template #username="scope">
        {{scope.row.user.username}}
      </template>
      <template #handler="scope">
        <el-button type="danger"
                   size="mini"
                   @click="deleteMessage(scope.row.id)">删除</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { getMessageList, deleMessgeById } from '@/service/message';
import { contentTableConfig } from './config/message.config';
import MyTable from '@/components/MyTable.vue';
export default {
  components: {
    MyTable
  },
  setup() {
    const messageList = ref([])
    const total = ref(0)
    const pageInfo = ref({
      currentPage: 1, pageSize: 10
    })

    const getMessageListAction = async (offset, size) => {
      const res = await getMessageList(offset, size)
      messageList.value = res
      total.value = res[0].total
    }
    getMessageListAction(0, 10)

    const deleteMessage = async (id) => {
      await deleMessgeById(id)
      getMessageListAction(pageInfo.value.currentPage - 1, pageInfo.value.pageSize)
    }
    // 处理分页
    watch(pageInfo, () => {
      const offset = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
      const size = pageInfo.value.pageSize
      getMessageListAction(offset, size)
    })
    return {
      messageList,
      contentTableConfig,
      deleteMessage,
      total,
      pageInfo
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 150px;
  height: 150px;
}
</style>