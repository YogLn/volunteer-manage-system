export const tableContentConfig = {
  propList: [
    { prop: 'comment', label: '评论内容', minWidth: '130' },
    {
      prop: 'createDate',
      label: '日期',
      minWidth: '150',
      slotName: 'createDate'
    },
    { label: '操作', slotName: 'handler' }
  ]
}
