<template>
  <div class="mytable">
    <el-table :data="listData"
              border
              style="width: 100%">
      <el-table-column label="#"
                       type="index"
                       align="center"
                       width="80"></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
				<el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
					<template #default="scope">
						<slot :name="propItem.slotName" :row="scope.row">
							{{scope.row[propItem.prop]}}
						</slot>
					</template>
				</el-table-column>
			</template>
    </el-table>
    <div v-if="isShow" class="footer">
      <slot name="footer">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
         </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      required: true
    },
		propList: {
			type: Array,
			required: true
		},
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    listCount: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:page'],
  setup(props,{ emit }) {
    const handleSizeChange = (pageSize) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage) => {
      emit('update:page', { ...props.page, currentPage})
    }

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>