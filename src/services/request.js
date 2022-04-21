import axios from 'axios'
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: 'http://volunteer.sherlockouo.top', //线上地址
  // baseURL: 'http://localhost:8088/',
  timeout: 10000, //请求时间5s，超过5s停止请求
  loading: null //加载背景
})
// 请求拦截
service.interceptors.request.use(
  config => {
    // 请求的时候添加token
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (token) config.headers.authorization = token.data
    config.loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)
//响应拦截
service.interceptors.response.use(
  response => {
    response.config.loading.close()
    if (response.status === 200) {
      return response.data
    } else {
      Promise.reject()
    }
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
