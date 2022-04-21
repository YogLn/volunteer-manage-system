<template>
	<div class="container">
		<ArticleForm @handlePublish="handlePublish" ref="FormRef" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import ArticleForm from './cpns/articleForm.vue';
import { publishArticleReq } from '@/services/article';

const FormRef = ref(null)
const handlePublish = async (article) => {
	const res = await publishArticleReq(article)
	if (res.code === 200) {
		ElMessage.success('发布成功~')
		FormRef.value.resetFields()
	}
}
</script>

<style lang="less" scoped>
</style>