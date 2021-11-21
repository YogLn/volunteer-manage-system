<template>
  <div>
    <my-table :listData="commentList"
              :="tableCommentConfig">
      <template #createTime="scope">
        <strong>{{$filter.formatTime(scope.row.createTime)}}</strong>
      </template>
      <template #userName="scope">
        <strong>{{scope.row.user.name}}</strong>
      </template>
      <template #handler="scope">
        <el-button type="danger"
                   size="mini"
                   @click="deleteComment(scope.row)">删除</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCommentListById, deleteCommentById } from '@/service/article';
import { tableCommentConfig } from './config/article.config';
import MyTable from '@/components/MyTable.vue';
export default {
  components: {
    MyTable
  },
  setup() {
    const route = useRoute()
    const commentList = ref([])
    const { id: articleId } = route.params
    // 获取文章的评论
    const getCommentListAction = async (id) => {
      const res = await getCommentListById(id)
      commentList.value = res
    }
    getCommentListAction(articleId)

    const deleteComment = async (row) => {
      await deleteCommentById(row.id)
      getCommentListAction(articleId)
    }
    return {
      commentList,
      tableCommentConfig,
      deleteComment
    }
  }
}
</script>

<style lang="less" scoped>
</style>