import axios from 'axios'

const service = axios.create({
  baseURL: 'http://volunteer.sherlockouo.top',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (token) config.headers.authorization = token.data
    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  response => {
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
