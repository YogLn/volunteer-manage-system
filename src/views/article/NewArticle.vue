<template>
  <div>
    <my-form btnName="发布"
             ref="formRef"
             @publishArticle="handlePublishArticle"></my-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import MyForm from '@/components/MyForm.vue';
import { publishArticle, addLabelToArticle } from '../../service/article';
export default {
  components: {
    MyForm
  },
  setup() {
    const formRef = ref()
    const handlePublishArticle = async (payload) => {
      const res = await publishArticle(payload[0])
      // 给文章添加标签
      const articleId = res.insertId
      await addLabelToArticle(articleId, payload[1])
      formRef.value.text = ''
      formRef.value.article = {}
      ElMessage({
        message: '发布成功~',
        type: 'success',
      })
    }
    return {
      formRef,
      handlePublishArticle
    }
  }

}
</script>

<style lang="less" scoped>
</style>