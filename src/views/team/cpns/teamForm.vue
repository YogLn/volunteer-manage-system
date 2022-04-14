<template>
	<div class="container">
		<el-form :model="team" label-width="120px" ref="FormRef">
			<el-form-item label="id" prop="teamId" disabled>
				<el-input v-model="team.teamId"></el-input>
			</el-form-item>
			<el-form-item label="团队名称" prop="teamName" disabled="true">
				<el-input v-model="team.teamName"></el-input>
			</el-form-item>
			<el-form-item label="团队logo" prop="logo">
				<el-image :src="team.logo"></el-image>
			</el-form-item>
			<el-form-item label="负责人" prop="account">
				<el-input v-model="team.account"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio v-model="team.status" :label="0" size="large">
					审批中
				</el-radio>
				<el-radio v-model="team.status" :label="1" size="large">
					通过
				</el-radio>
				<el-radio v-model="team.status" :label="2" size="large">
					不通过
				</el-radio>
			</el-form-item>
			<el-form-item label="服务区域" prop="serveArea">
				<el-cascader :options="provinces" v-model="team.serveArea" clearable />
			</el-form-item>
			<el-form-item label="服务类型" prop="serveType">
				<el-checkbox-group v-model="team.serveType" v-for="(item, index) in serveType" :key="index">
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
import { getTeamDetailReq } from '@/services/team';
import { provinces } from '@/utils/provinces'
import { serveType } from '@/utils/serveType'

const { teamId } = defineProps({ teamId: { type: String } });
const emit = defineEmits(['sendTeam', 'editTeam'])

const FormRef = ref(null)
let team = reactive({
	teamId: '',
	teamName: '',
	account: '',
	introduce: '',
	status: 0,
	communityCreatedate:'',
	logo: '',
	serveArea: [],
	serveType: [],
})

// 获取团队详细信息
if (teamId) {
	const getTeamDetail = async () => {
		const { data } = await getTeamDetailReq(teamId)
		console.log(data);
		team.teamId = data.teamId
		team.teamName = data.teamName
		team.communityCreatedate = data.communityCreatedate
		team.account = data.userVo.account
		team.introduce = data.introduce
		team.status = data.status
		team.logo = data.logo
		team.serveArea = data.serveArea
		team.serveType = data.serveType
	}
	getTeamDetail()
}
const handlePublish = async () => {
	if (teamId) {
		// 修改
		emit('editTeam', team)
	} else {
		// 新增
		emit('sendTeam', team)
		FormRef.value.resetFields()
	}

}
</script>

<style lang="less" scoped>
</style>