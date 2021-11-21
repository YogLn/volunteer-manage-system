import request from './request'

export function getArticleList(offset = 0, size = 10) {
	return request({
		url: '/article',
		params: {
			offset,
			size
		}
	})
}

export function getArticleDetail(id) {
	return request({
		url: `/article/${id}`
	})
}

export function publishArticle(data) {
	return request({
		url: '/article',
		method: 'POST',
		data
	})
}

export function addLabelToArticle(id, data) {
	return request({
		url: `article/${id}/label`,
		method: 'POST',
		data
	})
}

export function deleteArticle(id) {
	return request({
		url: `article/${id}`,
		method: 'DELETE'
	})
}

export function updateArticle(id, data) {
	return request({
		url: `article/${id}`,
		method: 'PATCH',
		data
	})
}

export function updateArticleLabel(id, data) {
	return request({
		url: `article/${id}/label`,
		method: 'PATCH',
		data
	})
}

export function getCommentListById(id) {
	return request({
		url: `comment/${id}`
	})
}

export function deleteCommentById(id) {
	return request({
		url: `comment/${id}`,
		method: 'DELETE'
	})
}