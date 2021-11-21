<template>
  <div class="article">
    <el-form :model="article"
             label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="标题图片">
        <el-input v-model="article.titleImg"></el-input>
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input v-model="article.description"></el-input>
      </el-form-item>
    </el-form>
    <v-md-editor v-model="text"
                 left-toolbar="undo redo | customToolbar1 customToolbar2 customToolbar3"
                 height="500px" />

    <!-- 多选框 -->
    <div class="checkbox">
      <h3>给文章添加标签</h3>
      <el-checkbox-group v-model="checkboxGroup">
        <template v-for="lable in labels"
                  :key="lable.labelName">
          <el-checkbox :label="lable.labelName"
                       border />
        </template>
      </el-checkbox-group>
    </div>

    <!-- 发布 -->
    <el-button type="primary"
               @click="submit">{{btnName}}</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getLabelList } from '@/service/label';
import { getArticleDetail } from '@/service/article';
export default {
  props: {
    btnName: {
      type: String,
      required: true
    },
    articleId: {
      type: String
    }
  },
  emits: ['publishArticle', 'editArticle'],
  setup(props, { emit }) {
    const text = ref('')
    const labels = ref([])
    const checkboxGroup = ref([])
    if (props.btnName === '修改') {
      const getArticleDetailAction = async (id) => {
        const res = await getArticleDetail(id)
				article.value.title = res[0].title
				article.value.titleImg = res[0].titleImg
				article.value.description = res[0].description
				text.value = res[0].content
				let newLabels = []
				if(res[0].labels) {
					newLabels	= res[0].labels?.map(item => item.name)
				}
				checkboxGroup.value = newLabels
      }
      getArticleDetailAction(props.articleId)
    }
    // 获取标签列表
    const getLabelListAction = async () => {
      const res = await getLabelList()
      labels.value = res
    }
    getLabelListAction()

    const article = ref({
      title: '',
      titleImg: '',
      description: '',
    })

    const submit = async () => {
      article.value.content = text.value
      if (props.btnName === '修改') {
        emit('editArticle', [article.value, { labels: [...checkboxGroup.value] }])
      } else {
        emit('publishArticle', [article.value, { labels: [...checkboxGroup.value] }])
      }
    }

    return {
      text,
      submit,
      article,
      labels,
      checkboxGroup
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  padding: 0 30px;
  .checkbox {
    display: flex;
    margin: 20px 0;
    align-items: center;
    h3 {
      margin-right: 30px;
    }
  }
}
</style>