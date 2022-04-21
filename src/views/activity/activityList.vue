<template>
	<div class="container">
		<my-table :listData="activityList" :="tableContentConfig" :isShow="false">
			<!-- 通过vue3的作用域插槽拿到数据对特殊数据进行处理 -->
			<template #logo="scope">
				<el-image :src="scope.row.logo"></el-image>
			</template>
			<template #status="scope">
				<el-tag v-if="scope.row.status === 0" type="warning">审核中</el-tag>
				<el-tag v-else-if="scope.row.status === 1" type="success">通过</el-tag>
				<el-tag v-else type="danger">不通过</el-tag>
			</template>
			<template #type="scope">
				{{ scope.row.type.join(', ') }}
			</template>
			<!-- 操作按钮 -->
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
import { tableContentConfig } from './config/activity.config';
import { deleteActivityReq } from '@/services/activity'

const store = useStore();
// 派发action从vuex中发起网络请求，并拿到数据
store.dispatch('activity/getActivityListAction');
const activityList = computed(() => store.state.activity.activityList)
// 梳理修改事件
const handleEditClick = ({ id }) => {
	// 路由跳转
	router.push(`/activity/${id}`)
}
// 处理删除逻辑
const handleDeleteClick = async ({ id }) => {
	const res = await deleteActivityReq(id)
	if (res.code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('activity/getActivityListAction')
	}
}

</script>

<style lang="less" scoped>
img {
	width: 100px;
	height: 100px;
}
</style>