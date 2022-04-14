import request from './request'

export function getTeamListReq() {
  return request({
    url: '/team/list',
  })
}

export function getTeamDetailReq(teamId){
  return request({
    url: '/team/get/'+teamId,
  })
}

export function deleteTeamReq(teamId) {
  return request({
    url: `/team/delete/${teamId}`,
    method: 'DELETE'
  })
}

export function updateTeamReq(data) {
  return request({
    url: `/team/update`,
    method: 'PUT',
    data
  })
}