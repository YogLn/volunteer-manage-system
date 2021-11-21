<template>
  <div>
    <my-table :listData="articleList"
              :listCount="total"
              :=tableContentConfig
              v-model:page="pageInfo">
      <template #titleImg="scope">
        <template v-if="scope.row.titleImg">
          <img :src="scope.row.titleImg"
               alt="" />
        </template>
        <template v-else>
          <h4>无</h4>
        </template>
      </template>

      <template #labels="scope">
        <template v-for="label in scope.row.labels"
                  :key="label.id">
          <el-tag type="success">{{label.name}}</el-tag>
        </template>
      </template>

      <template #updateTime="scope">
        <strong>{{$filter.formatTime(scope.row.updateTime)}}</strong>
      </template>

      <template #handler="scope">
        <el-button icon="el-icon-edit"
                   size="mini"
                   type="primary"
                   @click="handleEditClick(scope.row)">
        </el-button>
        <el-button icon="el-icon-delete"
                   size="mini"
                   type="danger"
                   @click="handleDeleteClick(scope.row)">
        </el-button>
        <el-button size="mini"
                   @click="handleCommentClick(scope.row)">
          <el-icon>
            <comment />
          </el-icon>
        </el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { Comment, Edit } from '@element-plus/icons'
import { useRouter } from 'vue-router';
import MyTable from '@/components/MyTable.vue';
import { getArticleList, deleteArticle } from '@/service/article';
import { tableContentConfig } from './config/article.config';
export default {
  components: {
    MyTable,
    Comment,
    Edit
  },
  setup() {
    const articleList = ref([])
    const total = ref(0)
    const router = useRouter()

    const getArticleListAction = async (offset = 0, size = 10) => {
      const res = await getArticleList(offset, size)
      articleList.value = res
      total.value = res[0].total
    }
    getArticleListAction()

    const pageInfo = ref({
      currentPage: 1, pageSize: 10
    })

    watch(pageInfo, () => {
      const offset = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
      const size = pageInfo.value.pageSize
      getArticleListAction(offset, size)
    })

    const handleEditClick = (row) => {
      const id = row.id
      router.push(`/article/${id}`)
    }

    const handleDeleteClick = async (row) => {
      await deleteArticle(row.id)
      getArticleListAction(pageInfo.value.currentPage -1, pageInfo.value.pageSize)
    }

    const handleCommentClick = async (row) => {
      const id = row.id
      router.push(`/comment/${id}`)
    }

    return {
      tableContentConfig,
      articleList,
      total,
      pageInfo,
      handleEditClick,
      handleDeleteClick,
      handleCommentClick
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 0 5px;
}
img {
  width: 150px;
  height: 150px;
}
</style>