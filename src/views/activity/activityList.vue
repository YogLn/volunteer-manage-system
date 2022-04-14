<template>
    <div class="container">
        <my-table :listData="activityList" :="tableContentConfig" :isShow="false">
			<template #status="scope">
				<el-tag v-if="scope.row.status === 0" type="warning">审核中</el-tag>
				<el-tag v-else-if="scope.row.status === 1" type="success">通过</el-tag>
				<el-tag v-else type="danger">不通过</el-tag>
				
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
import { tableContentConfig } from './config/activity.config';
import {deleteActivityReq} from '@/services/activity'

const store = useStore();

store.dispatch('activity/getActivityListAction');

const activityList = computed(()=>store.state.activity.activityList)

const handleEditClick = ({id}) => {
	
	router.push(`/activity/${id}`)
}

const handleDeleteClick = async ({ id }) => {
	const res = await deleteActivityReq(id)
	if (res.code === 200) {
		ElMessage.success('删除成功~')
		store.dispatch('activity/getActivityListAction')
	}
}

</script>

<style lang="less" scoped>

</style>