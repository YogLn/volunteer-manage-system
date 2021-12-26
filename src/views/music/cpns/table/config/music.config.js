export const tableContentConfig = {
	propList: [
		{  label: '歌曲名称', minWidth: '100', prop: 'name'},
		{ label: '歌手名', minWidth: '150', prop: 'artist' },
		{ label: '歌曲链接', minWidth: '150', prop: 'url' },
		{ label: '封面地址', minWidth: '150', prop: 'cover' },
		{ label: '歌词地址', minWidth: '150', prop: 'lrc' },
		{ label: '主题颜色', minWidth: '50', prop: 'theme', slotName: 'theme' },
		{ label: '操作', minWidth: '50', slotName: 'handler'}
	]
}