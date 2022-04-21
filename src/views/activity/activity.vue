<template>
	<div class="container">
		<my-table :listData="activityList" :="tableContentConfig" :isShow="false">
			<template #type="scope">
				{{ scope.row.type.join(', ') }}
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
import { deleteActivityReq } from '@/services/activity'
import { tableContentConfig } from './config/activity.config';

const store = useStore();
// 派发action从vuex中发起网络请求，并拿到数据
store.dispatch('activity/getActivityListAction')
const activityList = computed(() => store.state.activity.activityList)

// 处理删除逻辑
const handleDeleteClick = async ({ activityId }) => {
	const { code } = await deleteActivityReq(activityId)
	if (code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('activity/getActivityListAction')
	}
}
</script>

<style lang="less" scoped>
</style>