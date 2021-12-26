import request from './request'

export function getArchiveList() {
	return request({
		url: '/archive',
	})
}

export function addArchiveApi(data) {
	return request({
		url: '/archive',
		method: 'POST',
		data
	})
}

export function editArchiveApi(id, data) {
	return request({
		url: `/archive/${id}`,
		method: 'PATCH',
		data
	})
}

export function delArchiveApi(id) {
	return request({
		url: `/archive/${id}`,
		method: 'DELETE'
	})
}