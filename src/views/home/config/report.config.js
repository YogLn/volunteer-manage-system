export const tableContentConfig = {
  propList: [
    { prop: 'content', label: '举报内容', minWidth: '130' },
    {
      prop: 'createDate',
      label: '日期',
      minWidth: '150',
      slotName: 'createDate'
    },
    {
      prop: 'reportStatus',
      label: '状态',
      minWidth: '150',
      slotName: 'reportStatus'
    },
    { label: '操作', slotName: 'handler' }
  ]
}
