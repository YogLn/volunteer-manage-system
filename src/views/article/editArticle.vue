<template>
	<div class="container">
		<ArticleForm @editArticle="handleEditArticle" :articleId="articleId" />
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { updateArticleReq } from '@/services/article';
import ArticleForm from './cpns/articleForm.vue';

const route = useRoute()
const router = useRouter()
const articleId = route.params.id
const handleEditArticle = async (article) => {
	const res = await updateArticleReq(article)
	if (res.code === 200) {
		ElMessage.success('修改成功~')
		router.push('/articleList')
	}
}
</script>

<style lang="less" scoped>
</style>