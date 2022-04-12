export const tableContentConfig = {
  propList: [
    { prop: 'teamName', label: '团队名称', minWidth: '130' },
    { prop: 'user', label: '负责人', minWidth: '150', slotName: 'user' },
    {
      prop: 'serveArea',
      label: '服务地区',
      minWidth: '150',
      slotName: 'serveArea'
    },
    {
      prop: 'school',
      label: '学校',
      minWidth: '120',
      slotName: 'school'
    },
    {
      prop: 'serveType',
      label: '服务类型',
      minWidth: '150',
      slotName: 'serveType'
    },
    { label: '操作', slotName: 'handler' }
  ]
}
