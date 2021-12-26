<template>
  <div>
    <my-table :="tableContentConfig"
              :listData="musicList"
              :isShow="false">
      <template #theme="scoped">
        <el-color-picker v-model="scoped.row.theme"
                         size="medium" />
      </template>
      <template #handler="scoped">
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="mini"
                   @click="deleMusic(scoped.row.id)"></el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import MyTable from '@/components/MyTable.vue'
import { tableContentConfig } from './config/music.config'
import { getMusicListAPI, removeMusicAPI } from '@/service/music'
import emitter from '@/utils/eventBus'
export default {
  components: {
    MyTable
  },
  setup() {
    const musicList = ref([])
    const getMusicList = async () => {
      const res = await getMusicListAPI()
      musicList.value = res
    }
    getMusicList()
    const deleMusic = async (id) => {
      try {
        await removeMusicAPI(id)
        ElMessage.success('删除成功')
        getMusicList()
      } catch (error) {
        ElMessage.error('删除失败')
      }
    }
    emitter.on('addSuccess', () => {
      getMusicList()
    })
    return {
      musicList,
      tableContentConfig,
      deleMusic
    }
  }
}
</script>

<style scoped>
</style>