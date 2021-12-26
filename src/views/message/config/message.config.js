export const contentTableConfig = {
	propList: [
		{  label: '用户名', minWidth: '100', slotName: 'username'},
		{ label: '用户头像', minWidth: '150', slotName: 'avatar' },
		{ prop: 'content', label: '内容', minWidth: '220'},
		{ prop: 'createAt', label: '时间', minWidth: '120', slotName: "createAt" },
		{ label: '操作', minWidth: '50', slotName: 'handler'}
	]
}