<template>
	<div class="container">
		<el-form :model="activity" label-width="120px" ref="FormRef">
			<el-form-item label="id" prop="activityId" disabled>
				<el-input v-model="activity.activityId"></el-input>
			</el-form-item>
			<el-form-item label="团队名称" prop="activityName" disabled="true">
				<el-input v-model="activity.activityName"></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="account">
				<el-input v-model="activity.account"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio v-model="activity.status" :label="0" size="large">
					审批中
				</el-radio>
				<el-radio v-model="activity.status" :label="1" size="large">
					通过
				</el-radio>
				<el-radio v-model="activity.status" :label="2" size="large">
					不通过
				</el-radio>
			</el-form-item>
			<el-form-item label="服务区域" prop="serveArea">
				<el-cascader :options="provinces" v-model="activity.serveArea" clearable />
			</el-form-item>
			<el-form-item label="服务类型" prop="serveType">
				<el-checkbox-group v-model="activity.serveType" v-for="(item, index) in serveType" :key="index">
					<el-checkbox :label="item" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button @click="handlePublish()" type="primary">确认修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { getActivityDetailReq } from '@/services/activity';
import { provinces } from '@/utils/provinces'
import { serveType } from '@/utils/serveType'

const { activityId } = defineProps({ activityId: { type: String } });
const emit = defineEmits(['sendActivity', 'editActivity'])

const FormRef = ref(null)
let activity = reactive({
	activityId: '',
	activityName: '',
	account: '',
	introduce: '',
	status: 0,
	communityCreatedate:'',
	serveArea: [],
	serveType: [],
})

// 获取团队详细信息
if (activityId) {
	const getActivityDetail = async () => {
		const { data } = await getActivityDetailReq(activityId)
		console.log(data);
		activity.activityId = data.activityId
		activity.activityName = data.activityName
		activity.communityCreatedate = data.communityCreatedate
		activity.account = data.userVo.account
		activity.introduce = data.introduce
		activity.status = data.status
		activity.serveArea = data.serveArea
		activity.serveType = data.serveType
	}
	getActivityDetail()
}
const handlePublish = async () => {
	if (activityId) {
		// 修改
		emit('editActivity', activity)
	} else {
		// 新增
		emit('sendActivity', activity)
		FormRef.value.resetFields()
	}

}
</script>

<style lang="less" scoped>
</style>