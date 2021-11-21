<template>
  <div>
    <my-table :listData="userList"
              :listCount="total"
              :="contentTableConfig"
              v-model:page="pageInfo">
      <template #avatar="scope">
          <template v-if="scope.row.avatar_url">
            <img :src="scope.row.avatar_url" alt="" />
          </template>
          <template v-else>
            <h4>无</h4>
          </template>
      </template>

      <template #createAt="scope">
        <strong>{{$filter.formatTime(scope.row.createAt)}}</strong>
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button icon="el-icon-delete"
                     size="mini"
                     type="danger"
                     @click="handleDeleteClick(scope.row)">
            删除
          </el-button>
        </div>
      </template>
    </my-table>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { getUsersList, deleUserById } from '@/service/users';
import MyTable from '@/components/MyTable.vue';
import { contentTableConfig } from './config/user.confiog';
export default {
  components: {
    MyTable
  },
  setup(props) {
    const userList = ref([])
    const total = ref(0)
    const getUserData = async (offset, size) => {
      const res = await getUsersList(offset, size)
      userList.value = res
      total.value = res.length
    }
    getUserData(0, 10)

    const pageInfo = ref({
      currentPage: 1, pageSize: 10
    })

    watch(pageInfo, () => {
      const offset = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
      const size = pageInfo.value.pageSize
      getUserData(offset, size)
    })

    const handleDeleteClick = async (row) => {
      await deleUserById(row.id)
      getUserData(pageInfo.value.currentPage - 1, pageInfo.value.pageSize)
    }
    return {
      getUserData,
      total,
      userList,
      pageInfo,
      contentTableConfig,
      handleDeleteClick
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>