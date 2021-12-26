import request from './request'

export const addPhoto = data => {
  return request({
    url: '/photo',
    method: 'POST',
    data
  })
}

export function getPhotoList(offset, size) {
	return request({
		url: '/photo',
		params: {
			offset,
			size
		}
	})
}

export function deletePhoto(id) {
	return request({
		url: `/photo/${id}`,
		method: 'DELETE'
	})
}

export function editPhotoDetails(id, data) {
	return request({
		url: `/photo/${id}`,
		method: 'PATCH',
		data
	})
}
