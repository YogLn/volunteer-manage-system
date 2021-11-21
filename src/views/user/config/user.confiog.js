export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'avatar_url', label: '头像', minWidth: '200', slotName: 'avatar' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
		{ label: '操作', minWidth: '120', slotName: 'handler'}
  ]
}
