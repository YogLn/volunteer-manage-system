<template>
	<div class="container">
		<el-form :model="user" label-width="120px" ref="FormRef">
			<el-form-item label="id" prop="id" disabled="true">
				<el-input v-model="user.id"></el-input>
			</el-form-item>
			<el-form-item label="账号" prop="account" disabled="true">
				<el-input v-model="user.account"></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item label="身份证" prop="identity">
				<el-input v-model="user.identity"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio v-model="user.sex" :label="1" size="large">
					男
				</el-radio>
				<el-radio v-model="user.sex" :label="0" size="large">
					女
				</el-radio>
			</el-form-item>
			<el-form-item label="学校" prop="school">
				<el-input v-model="user.school" />
			</el-form-item>
			<el-form-item label="服务区域" prop="serveArea">
				<el-cascader :options="provinces" v-model="user.serveArea" clearable />
			</el-form-item>
			<el-form-item label="服务类型" prop="serveType">
				<el-checkbox-group v-model="user.serveType" v-for="(item, index) in serveType" :key="index">
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
import { getUserDetailReq } from '@/services/user';
import { provinces } from '@/utils/provinces'
import { serveType } from '@/utils/serveType'

const { userId } = defineProps({ userId: { type: String } });
const emit = defineEmits(['senduser', 'edituser'])

const FormRef = ref(null)
let user = reactive({
	id: '',
	account: '',
	username: '',
	identity: '',
	sex: '',
	school: '',
	serveArea: [],
	serveType: []
})

// 获取用户详细信息
if (userId) {
	const getuserDetail = async () => {
		const { data } = await getUserDetailReq(userId)
		console.log(data);
		user.id = data.id
		user.account = data.account
		user.username = data.username
		user.identity = data.identity
		user.sex = data.sex
		user.school = data.school
		user.serveArea = data.serveArea
		user.serveType = data.serveType
	}
	getuserDetail()
}
const handlePublish = async () => {
	console.log(userId);
	if (userId) {
		// 修改
		emit('editUser', user)
	} else {
		// 新增
		emit('senduser', user)
		FormRef.value.resetFields()
	}

}
</script>

<style lang="less" scoped>
</style>