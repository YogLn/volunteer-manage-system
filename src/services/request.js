import axios from 'axios'
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: 'http://volunteer.sherlockouo.top',
  timeout: 5000,
  loading: null
})

service.interceptors.request.use(
  config => {
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
