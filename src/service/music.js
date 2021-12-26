import request from './request'

export function addMusicAPI(data) {
	return request({
		url: '/music',
		method: 'POST',
		data
	})
}

export function editMusicAPI(id, data) {
	return request({
		url: `/music/${id}`,
		method: 'PATCH',
		data
	})
}

export function removeMusicAPI(id) {
	return request({
		url: `/music/${id}`,
		method: 'DELETE'
	})
}

export function getMusicListAPI () {
	return request({
		url: '/music'
	})
}

export function getMusicListDetailAPI (id) {
	return request({
		url: `/music/${id}`
	})
}