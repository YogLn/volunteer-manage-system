<template>
  <el-card>
    <my-form btnName="修改"
             @editArticle="handleEditArticle"
             :articleId="id" />
  </el-card>
</template>

<script>
import { ref } from 'vue';
import MyForm from '@/components/MyForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { updateArticle, updateArticleLabel } from '@/service/article';
export default {
  components: {
    MyForm
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const id = ref()
    id.value = route.params.id
    const handleEditArticle = async (payload) => {
      await updateArticle(id.value, payload[0])
      // 给文章添加标签
      await updateArticleLabel(id.value, payload[1])
      ElMessage.success('修改成功')
      router.push('/articleList')
    }
    return {
      handleEditArticle,
      id
    }
  }
}
</script>

<style lang="less" scoped>
</style>