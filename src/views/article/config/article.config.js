export const tableContentConfig = {
	propList: [
		{ prop: 'title', label: '文章标题', minWidth: '130' },
		{ prop: 'source', label: '文章来源', minWidth: '150' },
		{ prop: 'publishby', label: '文章分类', minWidth: '80',slotName: 'publishby' },
		{ prop: 'createDate', label: '发布时间', minWidth: '120', slotName: 'createDate'},
		{ label: '操作', minWidth: '120', slotName: 'handler'}
	]
}