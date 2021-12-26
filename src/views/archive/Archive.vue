<template>
  <el-card>
    <el-form :model="archiveForm">
      <el-form-item label="归档标题">
        <el-input v-model="archiveForm.title"></el-input>
      </el-form-item>
      <el-form-item label="归档内容">
        <el-input v-model="archiveForm.content"></el-input>
      </el-form-item>
      <el-form-item label="归档图片">
        <!-- <el-input v-model="archiveForm.image"></el-input> -->
        <upload-img @imgUrl="handleImgUrl"></upload-img>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               @click="addArchive"
               size="medium">添加归档</el-button>
    <my-table :listData="archiveList"
              :isShow="false"
              :=tableContentConfig
              class="my-table">
      <template #titleImg="scope">
        <template v-if="scope.row.image">
          <img :src="scope.row.image"
               alt="" />
        </template>
        <template v-else>
          <h4>无</h4>
        </template>
      </template>
      <template #createAt="scope">
        <strong>{{$filter.formatTime(scope.row.createAt)}}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{$filter.formatTime(scope.row.updateAt)}}</strong>
      </template>
      <template #handler="scope">
        <el-button icon="el-icon-edit"
                   size="mini"
                   type="primary"
                   @click="handleEditClick(scope.row)">
        </el-button>
        <el-button icon="el-icon-delete"
                   size="mini"
                   type="danger"
                   @click="handleDeleteClick(scope.row)">
        </el-button>
      </template>
    </my-table>

    <el-drawer v-model="drawerVisible"
               title="修改归档"
               direction="ltr"
               :before-close="handleClose">
      <el-form :model="editArchiveForm">
        <el-form-item label="归档标题">
          <el-input v-model="editArchiveForm.title"></el-input>
        </el-form-item>
        <el-form-item label="归档内容">
          <el-input v-model="editArchiveForm.content"></el-input>
        </el-form-item>
        <el-form-item label="归档图片">
          <upload-img @imgUrl="handleImgUrl"
                      :image="editArchiveForm.image"></upload-img>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 @click="editClick">
        修改
      </el-button>
    </el-drawer>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from "element-plus";
import UploadImg from '@/components/UploadImg.vue'
import MyTable from '@/components/MyTable.vue';
import { tableContentConfig } from './config/archive'
import { deepCopy } from '@/utils/deepcopy.js'
import { getArchiveList, editArchiveApi, addArchiveApi, delArchiveApi } from '@/service/archive'
export default {
  components: {
    MyTable,
    UploadImg
  },
  setup() {
    // 表格数据显示
    const archiveList = ref([])
    // 判断是否是修改图片
    let isEditImg = ref(false)
    const getArchiveListAction = async () => {
      const res = await getArchiveList()
      archiveList.value = res
    }
    getArchiveListAction()
    // 添加

    const archiveForm = ref({
      title: '',
      image: '',
      content: ''
    })
    const addArchive = async () => {
      try {
        const res = await addArchiveApi(archiveForm.value)
        ElMessage.success('上传成功')
        getArchiveListAction()
        archiveForm.value.title = ''
        archiveForm.value.image = ''
        archiveForm.value.content = ''
      } catch (error) {
        ElMessage.error('上传失败')
      }
    }

    // 修改
    const drawerVisible = ref(false)
    let archiveId = ref(null)
    const editArchiveForm = ref({
      title: '',
      image: '',
      content: ''
    })
    const handleEditClick = (row) => {
      row = deepCopy(row)
      isEditImg.value = true
      drawerVisible.value = true
      archiveId.value = row.id
      editArchiveForm.value.title = row.title
      editArchiveForm.value.image = row.image
      editArchiveForm.value.content = row.content
    }
    const editClick = async () => {
      try {
        await editArchiveApi(archiveId.value, editArchiveForm.value)
        ElMessage.success('修改成功')
        getArchiveListAction()
      } catch (error) {
        ElMessage.error('修改失败')
      }
    }
    const handleClose = (done) => {
      isEditImg.value = false
      done()
    }

    // 删除
    const handleDeleteClick = async (row) => {
      await delArchiveApi(id)
    }

    // 获取图片url
    const handleImgUrl = (url) => {
      if (isEditImg.value) {
        editArchiveForm.value.image = url
      } else {
        archiveForm.value.image = url
      }
    }

    return {
      archiveList,
      tableContentConfig,
      archiveForm,
      handleImgUrl,
      addArchive,
      handleEditClick,
      handleDeleteClick,

      // 修改
      drawerVisible,
      editArchiveForm,
      handleClose,
      editClick
    }
  }
}
</script>

<style scoped>
img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}
.my-table {
  margin-top: 20px;
}
</style>