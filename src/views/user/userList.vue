<template>
	<div class="container">
		<my-table :listData="userList" :="tableContentConfig" :isShow="false">
			<template #sex="scope">
				<el-tag v-if="scope.row.sex === 1">男</el-tag>
				<el-tag v-else>女</el-tag>
			</template>
			<template #serveArea="scope">
				{{ scope.row.serveArea.join(' ') }}
			</template>
			<template #serveType="scope">
				{{ scope.row.serveType.join(', ') }}
			</template>
			<template #role="scope">
				<el-tag v-if="scope.row.roleId === 0">普通用户</el-tag>
				<el-tag v-else-if="scope.row.roleId === 1" type="warning">团队管理员</el-tag>
				<el-tag v-else type="danger">超级管理员</el-tag>
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
import { tableContentConfig } from './config/user.config';
import { deleteUserReq } from '@/services/user'

const store = useStore();

store.dispatch('user/getUserListAction');

const userList = computed(() => store.state.user.userList)

const handleEditClick = ({ id }) => {
	router.push(`/user/${id}`)
}

const handleDeleteClick = async ({ id }) => {
	const res = await deleteUserReq(id)
	if (res.code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('user/getUserListAction')
	}
}

</script>

<style lang="less" scoped>
</style>