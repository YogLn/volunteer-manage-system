export const tableContentConfig = {
	propList: [
		{ prop: 'title', label: '标题', minWidth: '100' },
		{ prop: 'image', label: '标题图片', minWidth: '150', slotName: 'titleImg' },
		{ prop: 'content', label: '归档描述', minWidth: '250'},
		{ prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt'},
		{ prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt'},
		{ label: '操作', minWidth: '150', slotName: 'handler'}
	]
}