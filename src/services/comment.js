import request from './request'

export function getCommentListReq() {
  return request({
    url: '/comment/all'
  })
}
export function deleteCommentReq(commentId) {
  return request({
    url: `/comment/delete/${commentId}`,
    method: 'DELETE'
  })
}
