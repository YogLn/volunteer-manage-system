<template>
	<div class="container">
		<el-form :model="activity" label-width="120px" ref="FormRef">
			<el-form-item label="id" prop="id" disabled>
				<el-input v-model="activity.id"></el-input>
			</el-form-item>
			<el-form-item label="活动名称" prop="name" disabled="true">
				<el-input v-model="activity.name"></el-input>
			</el-form-item>
			<el-form-item label="活动时长" prop="length" disabled="true">
				<el-input v-model="activity.length"></el-input>
			</el-form-item>
			<el-form-item label="团队ID" prop="teamId">
				<el-input v-model="activity.teamId"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="desc">
				<el-input v-model="activity.desc"></el-input>
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
			<el-form-item label="服务地点" prop="address">
				<el-input v-model="activity.address"></el-input>
			</el-form-item>
			<el-form-item label="开始时间" prop="startDatetime">
				<el-input v-model="activity.startDatetime"></el-input>
			</el-form-item>
			<el-form-item label="结束时间" prop="endDatetime">
				<el-input v-model="activity.endDatetime"></el-input>
			</el-form-item>
			<el-form-item label="招募人数" prop="recruitNumber">
				<el-input v-model="activity.recruitNumber"></el-input>
			</el-form-item>
			<el-form-item label="服务类型" prop="type">
				<el-checkbox-group v-model="activity.type" v-for="(item, index) in serveType" :key="index">
					<el-checkbox :label="item" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="修改意见" prop="modifyDesc">
				<el-input v-model="activity.modifyDesc"></el-input>
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
	id: 0,
	name: '',
	teamId: 0,
	desc: '',
	status: 0,
	address: '',
	startDatetime: '',
	endDatetime: '',
	recruitNumber: 0,
	createDate:'',
	modifyDesc: '',
	length: 0,
	type: []

})

// 获取团队详细信息
if (activityId) {
	const getActivityDetail = async () => {
		const { data } = await getActivityDetailReq(activityId)
		console.log(data);
		activity.id = data.id
		activity.name = data.name
		activity.activityId = data.activityId
		activity.desc = data.desc
		activity.status = data.status
		activity.address = data.address
		activity.startDatetime = data.startDatetime
		activity.endDatetime = data.endDatetime
		activity.recruitNumber = data.recruitNumber
		activity.modifyDesc = data.modifyDesc
		activity.length = data.length
		activity.createDate = data.createDate
		activity.type = data.type
	}
	getActivityDetail()
}
const handlePublish = async () => {
	if (activity.id) {
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