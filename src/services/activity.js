import request from './request'

export function getActivityListReq() {
  return request({
    url: '/activity/list',
  })
}

export function getActivityDetailReq(activityId){
  return request({
    url: '/activity/get/'+activityId,
  })
}

export function deleteActivityReq(activityId) {
  return request({
    url: `/activity/delete/${activityId}`,
    method: 'DELETE'
  })
}

export function updateActivityReq(data) {
  return request({
    url: `/activity/update`,
    method: 'PUT',
    data
  })
}