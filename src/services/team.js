import request from './request'

export function getTeamListReq() {
  return request({
    url: '/team/list'
  })
}

export function deleteTeamReq(teamId) {
  return request({
    url: `/team/delete/${teamId}`,
    method: 'DELETE'
  })
}
