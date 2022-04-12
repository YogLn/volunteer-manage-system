import request from './request'

export function registerReq(data) {
  return request({
    url: '/user/regadmin',
    method: 'POST',
    data
  })
}

export function loginReq(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
