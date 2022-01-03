<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="userInfo.avatar_url" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ userInfo.name }}</div>
              <div>超级管理员</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2021-11-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>成都</span>
          </div>
        </el-card>
       
      </el-col>
      <el-col :span="8">
       <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="">
            文章总数11
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "@/store";
export default {
  name: 'dashboard',
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.login.userInfo)
    return {
      userInfo
    }
  },
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont .user-info-name {
  margin-bottom: 8px;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}
</style>
