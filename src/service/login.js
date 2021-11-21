import request from './request'

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export function getUserInfo(id) {
  return request({
    url: `/users/${id}`,
  })
}
