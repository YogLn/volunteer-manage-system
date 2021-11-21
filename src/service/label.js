import request from './request'

export function getLabelList() {
	return request({
		url: '/label'
	})
}

export function deleLabelById(id) {
	return request({
		url: `/label/${id}`,
		method: 'DELETE'
	})
}

export function addLabel(data) {
	return request({
		url: '/label',
		method: 'POST',
		data
	})
}

