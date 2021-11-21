export const contentTableConfig = {
	propList: [
		{ prop: 'content', label: '内容', minWidth: '200'},
		{ prop: 'createAt', label: '时间', minWidth: '120', slotName: "createAt" },
		{ label: '用户头像', minWidth: '150', slotName: 'avatar' },
		{  label: '用户名', minWidth: '150', slotName: 'username'},
		{ label: '操作', minWidth: '120', slotName: 'handler'}
	]
}