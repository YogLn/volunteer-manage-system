<template>
  <div>
    <el-form :model="photo">
      <el-form-item label="图片地址">
        <el-input v-model="photo.imgUrl"
                  placeholder="请输入图片地址"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="photo">
      <el-form-item label="图片描述">
        <el-input v-model="photo.desc"
                  placeholder="请输入图片描述"></el-input>

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
        <el-button type="danger"
                   size="mini"
                   @click="deleteImg(scope.row.id)">删除</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { reactive, ref, watch  } from 'vue';
import { addPhoto, getPhotoList, deletePhoto } from '@/service/photo';
import MyTable from '@/components/MyTable.vue';
import { contentTableConfig } from './config/photo.config';
export default {
  components: {
    MyTable
  },
  setup() {
    const tableList = ref([])
    const total = ref(0)
    const photo = reactive({
      imgUrl: '',
      desc: ''
    })

    const cerate = async () => {
      await addPhoto(photo)
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

    return {
      photo,
      cerate,
      contentTableConfig,
      tableList,
      deleteImg,
			total,
			pageInfo
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100px;
  height: 100px;
}
.el-button {
  margin-bottom: 10px;
}
</style>