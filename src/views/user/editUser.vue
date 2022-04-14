<template>
    <div class="container">
        <UserForm @editUser="handleEditUser" :userId="userId" />
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { updateUserReq } from '@/services/user';
import UserForm from './cpns/userForm.vue';

const route = useRoute()
const router = useRouter()
const userId = route.params.id
const handleEditUser = async (user) => {
	console.log(user);
	const res = await updateUserReq(user)
	if (res.code === 200) {
		ElMessage.success('修改成功~')
		router.push('/userList')
	}
}
</script>

<style lang="less" scoped>

</style>