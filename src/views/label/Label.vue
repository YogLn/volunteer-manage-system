<template>
  <el-card>
    <div class="add-label">
      <el-row :gutter="15">
        <el-col :span="5">
          <el-input v-model="name"
                    placeholder="标签名称"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="color"
                    placeholder="标签颜色"></el-input>
        </el-col>
        <el-col :span="3">
          <el-color-picker v-model="color" />
        </el-col>
        <el-col :span="5">
          <el-button type="primary"
                     @click="addLabelAction">添加标签</el-button>
        </el-col>
      </el-row>
    </div>
    <my-table :listData="labelList"
              :="contentTableConfig">
      <template #handleColor="scoped">
        <el-color-picker v-model="scoped.row.color"
                         size="medium" />
      </template>
      <template #handler="scope">
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="mini"
                   @click="deleLabel(scope.row.labelId)"></el-button>
      </template>
    </my-table>
  </el-card>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { contentTableConfig } from './config/label.config';
import { getLabelList, deleLabelById, addLabel } from '@/service/label';
import MyTable from '@/components/MyTable.vue';
export default {
  components: {
    MyTable
  },
  setup(props) {
    const labelList = ref([])
    const name = ref('')
    const color = ref('')
    const getLabelListAction = async () => {
      const res = await getLabelList()
      labelList.value = res
    }
    getLabelListAction()

    const deleLabel = async (id) => {
      await deleLabelById(id)
      getLabelListAction()
    }

    const addLabelAction = async () => {
      if(!name.value || !color.value) return
      await addLabel({ name: name.value, color: color.value })
      ElMessage({
        message: '创建成功~',
        type: 'success',
      })
      name.value = ''
      color.value = ''
      getLabelListAction()
    }

    return {
      labelList,
      contentTableConfig,
      deleLabel,
      name,
      color,
      addLabelAction
    }
  }
}
</script>

<style lang="less" scoped>
.add-label {
  margin-bottom: 20px;
}
</style>