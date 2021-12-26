<template>
  <div>
    <el-form :model="musicForm"
             label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="歌曲名称">
            <el-input v-model="musicForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="歌手名称">
            <el-input v-model="musicForm.artist"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="歌曲id">
            <el-input v-model="musicForm.url"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="封面地址">
            <el-input v-model="musicForm.cover"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="歌词id">
            <el-input v-model="musicForm.lrc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主题颜色">
            <el-input v-model="musicForm.theme"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary"
               @click="addMusic">添加歌曲</el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addMusicAPI } from '@/service/music'
import emitter from '@/utils/eventBus'
export default {
  setup() {
    const musicForm = ref({
      name: '',
      artist: '',
      url: '',
      cover: '',
      lrc: '',
      theme: ''
    })
    const addMusic = async () => {
      try {
        // 歌词
        musicForm.value.lrc = `http://123.207.32.32:9001/lyric?id=${musicForm.value.lrc}`
        // 歌曲
        musicForm.value.url = `https://music.163.com/song/media/outer/url?id=${musicForm.value.url}.mp3`
        await addMusicAPI(musicForm.value)
        ElMessage.success('发布成功')
        emitter.emit('addSuccess')
        musicForm.value.name = ''
        musicForm.value.artist = ''
        musicForm.value.url = ''
        musicForm.value.cover = ''
        musicForm.value.lrc = ''
        musicForm.value.theme = ''
      } catch (error) {
        ElMessage.error('发布失败')
      }
    }
    return {
      musicForm,
      addMusic,
    }
  }
}
</script>

<style scoped>
</style>