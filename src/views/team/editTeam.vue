<template>
    <div class="container">
        <TeamForm @editTeam="handleEditTeam" :teamId="teamId" />
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { updateTeamReq } from '@/services/team';
import TeamForm from './cpns/teamForm.vue';

const route = useRoute()
const router = useRouter()
const teamId = route.params.id
const handleEditTeam = async (team) => {
	const res = await updateTeamReq(team)
	if (res.code === 200) {
		ElMessage.success('修改成功~')
		router.push('/teamList')
	}
}
</script>

<style lang="less" scoped>

</style>