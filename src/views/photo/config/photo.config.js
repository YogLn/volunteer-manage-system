export const contentTableConfig = {
  propList: [
    { prop: 'description', label: '图片描述', minWidth: '200' },
    { prop: 'imgUrl', label: '图片地址', minWidth: '200', slotName: 'showImg' },
    { prop: 'createAt', label: '发布时间', minWidth: '200', slotName: 'createAt' },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ]
}
