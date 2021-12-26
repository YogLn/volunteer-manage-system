<template>
  <el-card>
    <el-form :model="photo">
      <el-form-item label="图片描述">
        <el-input v-model="photo.desc"
                  placeholder="请输入图片描述"></el-input>
      </el-form-item>
      <el-form-item label="选择图片">
        <upload-img @imgUrl="handleImgUrl"></upload-img>
      </el-form-item>
    </el-form>

    <el-button type="primary"
               @click="cerate"
               size="medium">发表图片</el-button>
    <my-table :listData="tableList"
              :="contentTableConfig"
              :listCount="total"
              v-model:page="pageInfo">
      <template #showImg="scope">
        <template v-if="scope.row.imgUrl">
          <img :src="scope.row.imgUrl"
               alt="" />
        </template>
        <template v-else>
          <h4>无</h4>
        </template>
      </template>
      <template #createAt="scope">
        <strong>{{$filter.formatTime(scope.row.createAt)}}</strong>
      </template>
      <template #handler="scope">
        <el-button icon="el-icon-edit"
                   size="mini"
                   type="primary"
                   @click="eidtImg(scope.row)"></el-button>
        <el-button icon="el-icon-delete"
                   size="mini"
                   type="danger"
                   @click="deleteImg(scope.row.id)"></el-button>
      </template>
    </my-table>

    <el-dialog v-model="editDialogVisible"
               title="修改图片信息"
               width="30%">
      <el-form :model="editImgForm"
               label-width="120px">
        <el-form-item label="图片描述">
          <el-input v-model="editImgForm.description"
                    type="textarea"
                    :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <img :src="editImgForm.imgUrl"
               alt="图片">
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { reactive, ref, watch } from 'vue';

import { ElMessage } from 'element-plus';
import MyTable from '@/components/MyTable.vue';
import UploadImg from '../../components/UploadImg.vue';

import { addPhoto, getPhotoList, deletePhoto, editPhotoDetails } from '@/service/photo';
import { deepCopy } from '@/utils/deepcopy.js'
import { contentTableConfig } from './config/photo.config';
export default {
  components: {
    MyTable,
    UploadImg
  },
  setup() {
    const tableList = ref([])
    const total = ref(0)
    const photo = reactive({
      imgUrl: '',
      desc: ''
    })
    const handleImgUrl = (imgUrl) => {
      photo.imgUrl = imgUrl
    }
    const cerate = async () => {
      if(!photo.imgUrl || !photo.desc) return
      await addPhoto(photo)
      photo.imgUrl = ''
      photo.desc = ''
      ElMessage({
        message: '发布成功~',
        type: 'success',
      })
      getPhotoListAction(0, 10)
    }

    const getPhotoListAction = async (offset = 0, size = 10) => {
      const res = await getPhotoList(offset, size)
      tableList.value = res
      total.value = res[0].total
    }
    getPhotoListAction()
    const pageInfo = ref({
      currentPage: 1, pageSize: 10
    })

    watch(pageInfo, () => {
      const offset = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
      const size = pageInfo.value.pageSize
      getPhotoListAction(offset, size)
    })

    const deleteImg = async (id) => {
      await deletePhoto(id)
      getPhotoListAction(pageInfo.value.currentPage - 1, pageInfo.value.pageSize)
    }

    // 修改图片信息
    let editDialogVisible = ref(false)
    const editImgForm = ref({})
    const eidtImg = row => {
      editDialogVisible.value = true
      editImgForm.value = deepCopy(row)
    }

    return {
      photo,
      cerate,
      contentTableConfig,
      tableList,
      deleteImg,
      total,
      pageInfo,
      editDialogVisible,
      editImgForm,
      eidtImg,
      handleImgUrl
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}
.el-button {
  margin-bottom: 10px;
}
</style>