export const tableContentConfig = {
  propList: [
    { prop: 'teamName', label: '团队名称', minWidth: '130' },
    { prop: 'source', label: '负责人', minWidth: '150' },
    {
      prop: 'serveArea',
      label: '服务地区',
      minWidth: '80',
      slotName: 'serveArea'
    },
    {
      prop: 'serveType',
      label: '服务类型',
      minWidth: '120',
      slotName: 'serveType'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
