import request from './request'

export function getUsersList(offset = 0, size = 10) {
	return request({
		url: '/users',
		params: {
			offset,
			size
		}
	})
}

export function deleUserById(id) {
	return request({
		url: `users/${id}`,
		method: 'DELETE'
	})
}