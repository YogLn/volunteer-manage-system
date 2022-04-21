<template>
	<div class="container">
		<ActivityForm @editActivity="handleEditActivity" @sendActivity="handleSendActivity" :activityId="activityId" />
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { updateActivityReq, registerActivityReq } from '@/services/activity';
import ActivityForm from './cpns/activityForm.vue';

const route = useRoute()
const router = useRouter()
// 拿到路由id
const activityId = route.params.id
// 编辑活动的处理逻辑
const handleEditActivity = async (activity) => {
	const res = await updateActivityReq(activity)
	if (res.code === 200) {
		ElMessage.success('修改成功~')
		// 路由跳转，跳转页面
		router.push('/activityList')
	}
}
// 添加活动处理
const handleSendActivity = async (activity) => {
	const res = await registerActivityReq(activity)
	if (res.code === 200) {
		ElMessage.success('新增成功~')
		router.push('/activityList')
	}
}
</script>

<style lang="less" scoped>
</style>