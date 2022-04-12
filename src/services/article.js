import request from './request'

export function publishArticleReq(data) {
  return request({
    url: '/article/register',
    method: 'POST',
    data
  })
}

export function getArticleListReq(publishby) {
  return request({
    url: '/article/list',
    params: {
      publishby
    }
  })
}

export function deleteArticleReq(articleId) {
  return request({
    url: `/article/delete/${articleId}`,
    method: 'DELETE'
  })
}

export function getArticleDetailReq(articleId) {
  return request({
    url: `/article/get/${articleId}`
  })
}

export function updateArticleReq(data) {
  return request({
    url: `/article/update`,
    method: 'PUT',
    data
  })
}
