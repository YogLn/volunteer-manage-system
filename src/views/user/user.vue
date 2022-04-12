<template>
	<div class="container">
		<div class="top">
			<el-button type="primary" @click="dialogVisible = true">新增管理员</el-button>
		</div>
		<el-dialog v-model="dialogVisible" title="管理员信息" width="30%">
			<el-form :model="form" label-width="120px" :rules="rules">
				<el-form-item label="账号" prop="account">
					<el-input v-model="form.account" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" />
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleRegisterAdmin()">确 认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { rules } from './config/user.config'
import { registerReq } from '@/services/user'

const dialogVisible = ref(false)
const form = reactive({
	account: '',
	password: ''
})

const handleRegisterAdmin = async () => {
	const res = await registerReq(form)
	if (res.code === 200) {
		ElMessage.success('发布成功~')
		dialogVisible.value = false
	}
}
</script>

<style lang="less" scoped>
</style>