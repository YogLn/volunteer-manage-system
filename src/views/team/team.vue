<template>
	<div class="container">
		<my-table :listData="teamList" :="tableContentConfig" :isShow="false">
			<template #serveArea="scope">
				{{ scope.row.serveArea.join(' ') }}
			</template>
			<template #serveType="scope">
				{{ scope.row.serveType.join(', ') }}
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
import { deleteTeamReq } from '@/services/team'
import { tableContentConfig } from './config/team.config';

const store = useStore();

store.dispatch('team/getTeamListAction')
const teamList = computed(() => store.state.team.teamList)

const handleDeleteClick = async ({ teamId }) => {
	const { code } = await deleteTeamReq(teamId)
	if (code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('team/getTeamListAction')
	}
}
</script>

<style lang="less" scoped>
</style>