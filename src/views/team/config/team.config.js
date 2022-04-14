export const tableContentConfig = {
  propList: [
    { prop: 'teamName', label: '团队名称', minWidth: '130' },
    { prop: 'logo', label: '团队logo', minWidth: '130', slotName: 'logo' },
    {
      prop: 'username',
      label: '负责人',
      minWidth: '150',
      slotName: 'username'
    },
    { prop: 'status', label: '状态', minWidth: '150', slotName: 'status' },
    { prop: 'logo', label: '状态', minWidth: '150', slotName: 'logo' },
    {
      prop: 'serveArea',
      label: '服务地区',
      minWidth: '150',
      slotName: 'serveArea'
    },
    {
      prop: 'serveType',
      label: '服务类型',
      minWidth: '250',
      slotName: 'serveType'
    },
    { label: '操作', slotName: 'handler', minWidth: '150' }
  ]
}
