export const tableContentConfig = {
	propList: [
		{ prop: 'title', label: '标题', minWidth: '100' },
		{ prop: 'titleImg', label: '标题背景', minWidth: '150', slotName: 'titleImg' },
		{ prop: 'description', label: '文章描述', minWidth: '200'},
		{ prop: 'updateTime', label: '更新时间', minWidth: '120', slotName: 'updateTime'},
		{ prop: 'labels', label: '标签', minWidth: '150', slotName: 'labels'},
		{ label: '操作', minWidth: '200', slotName: 'handler'}
	]
}
export const tableCommentConfig = {
	propList: [
		{ prop: 'content', label: '评论内容', minWidth: '150' },
		{ prop: 'createTime', label: '评论时间', minWidth: '150', slotName: 'createTime' },
		{ label: '用户', minWidth: '200', slotName: 'userName'},
		{ label: '操作', minWidth: '200', slotName: 'handler'}
	],
	isShow: false
}