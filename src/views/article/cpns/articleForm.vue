<template>
	<div class="container">
		<el-form :model="article" label-width="120px" ref="FormRef">
			<el-form-item label="文章标题" prop="title">
				<el-input v-model="article.title"></el-input>
			</el-form-item>
			<el-form-item label="文章来源" prop="source">
				<el-input v-model="article.source"></el-input>
			</el-form-item>
			<el-form-item label="文章类型" prop="publishby">
				<el-radio v-model="article.publishby" label="1" size="large">志愿者</el-radio>
				<el-radio v-model="article.publishby" label="2" size="large">志愿团体</el-radio>
			</el-form-item>
			<el-form-item label="文章内容" prop="content">
				<el-input v-model="article.content" :autosize="{ minRows: 10, maxRows: 20 }" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button @click="handlePublish()" type="primary">发 布</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { getArticleDetailReq } from '@/services/article';

const { articleId } = defineProps({ articleId: { type: String } });
const emit = defineEmits(['sendArticle', 'editArticle'])

const FormRef = ref(null)
let article = reactive({
	title: '',
	source: '',
	content: '',
	publishby: ''
})

// 获取文章详细信息
if (articleId) {
	const getArticleDetail = async () => {
		const { data } = await getArticleDetailReq(articleId)
		console.log(data);
		article.id = data.id
		article.title = data.title
		article.source = data.source
		article.content = data.content
		article.publishby = data.publishby + ''
	}
	getArticleDetail()
}
const handlePublish = async () => {
	if (articleId) {
		// 修改
		emit('editArticle', article)
	} else {
		// 新增
		emit('sendArticle', article)
		FormRef.value.resetFields()
	}

}
</script>

<style lang="less" scoped>
</style>