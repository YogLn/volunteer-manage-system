<template>
	<div class="container">
		<my-table :listData="commentList" :="tableContentConfig" :isShow="false">
			<template #createDate="scope">
				{{ $filter.formatTime(scope.row.createDate) }}
			</template>
			<template #handler="scope">
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
import { ElMessage } from 'element-plus'
import MyTable from '@/components/MyTable.vue';
import { tableContentConfig } from './config/comment.config';
import { deleteCommentReq } from '@/services/comment'


const store = useStore();

store.dispatch('comment/getCommentListAction');
const commentList = computed(() => store.state.comment.commentList)

const handleDeleteClick = async ({ id }) => {
	const { code } = await deleteCommentReq(id)
	if (code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('comment/getCommentListAction');
	}
}
</script>

<style lang="less" scoped>
</style>