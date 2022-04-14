import request from './request'

export function getReportListReq() {
  return request({
    url: '/report/all'
  })
}
export function auditReportReq(data) {
  return request({
    url: `/report/update`,
    method: 'PUT',
    data
  })
}
export function deleteReportReq(reportId) {
  return request({
    url: `/report/delete/${reportId}`,
    method: 'DELETE'
  })
}
