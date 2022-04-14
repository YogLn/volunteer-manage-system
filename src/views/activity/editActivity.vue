<template>
    <div class="container">
        <ActivityForm @editActivity="handleEditActivity" :activityId="activityId" />
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { updateActivityReq } from '@/services/activity';
import ActivityForm from './cpns/activityForm.vue';

const route = useRoute()
const router = useRouter()
const activityId = route.params.id
const handleEditActivity = async (activity) => {
	const res = await updateActivityReq(activity)
	if (res.code === 200) {
		ElMessage.success('修改成功~')
		router.push('/activityList')
	}
}
</script>

<style lang="less" scoped>

</style>