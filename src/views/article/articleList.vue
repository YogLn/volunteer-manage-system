<template>
	<div class="container">
		<my-table :listData="articleUserList.concat(articleTeamList)" :="tableContentConfig" :isShow="false">
			<template #publishby="scope">
				<template v-if="scope.row.publishby === 1">
					<el-tag type="success">志愿者</el-tag>
				</template>
				<template v-else>
					<el-tag>志愿团队</el-tag>
				</template>
			</template>
			<template #createDate="scope">
				{{ $filter.formatTime(scope.row.createDate) }}
			</template>
			<template #handler="scope">
				<el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEditClick(scope.row)">
				</el-button>
				<el-popconfirm title="确认删除吗?" @confirm="handleDeleteClick(scope.row)">
					<template #reference>
						<el-button icon="el-icon-delete" size="mini" type="danger">
						</el-button>
					</template>
				</el-popconfirm>
			</template>
		</my-table>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import router from '@/router';
import { ElMessage } from 'element-plus'
import MyTable from '@/components/MyTable.vue';
import { deleteArticleReq } from '@/services/article'
import { tableContentConfig } from './config/article.config';

const store = useStore();

store.dispatch('article/getArticleListAction', 1)
store.dispatch('article/getArticleListAction', 2)

const articleUserList = computed(() => store.state.article.articleUserList)
const articleTeamList = computed(() => store.state.article.articleTeamList)

const handleEditClick = ({ id }) => {
	router.push(`/article/${id}`)
}

const handleDeleteClick = async ({ id }) => {
	const res = await deleteArticleReq(id)
	if (res.code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('article/getArticleListAction', 1)
		store.dispatch('article/getArticleListAction', 2)
	}
}

</script>

<style lang="less" scoped>
</style>