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

export function updateUserReq(data){
  return request({
    url: '/user/update',
    method: 'PUT',
    data
  })
}


export function getuserListReq(data) {
  return request({
    url: '/user/all',
    method: 'GET',
    data
  })
}

export function getUserDetailReq(userId){
  return request({
    url: '/user/get/'+userId,
    method: 'GET',
  })
}

export function deleteUserReq(userId){
  return request({
    url: '/user/delete/'+userId,
    method: 'DELETE',
  })
}

