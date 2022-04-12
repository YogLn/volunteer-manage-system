import { loginReq } from '@/services/user'
import router from '@/router'
import { ElMessage } from 'element-plus'

const loginModel = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      const { data: res } = await loginReq(payload)
      commit('changeToken', res.token)
      commit('changeUserInfo', res.userinfo)
      let obj = {
        data: res.token,
        time: Date.now(),
        expire: 86400000 * 2
      }
      window.localStorage.setItem('token', JSON.stringify(obj))
      window.localStorage.setItem('userInfo', JSON.stringify(res.userinfo))
      ElMessage({
        message: '登录成功~',
        type: 'success'
      })
      router.push('/main')
    },

    loadDataAction({ commit }) {
      const token = JSON.parse(window.localStorage.getItem('token'))
      if (!token) return
      if (Date.now() - token.time > token.expire) {
        window.localStorage.clear()
        return
      }
      commit('changeToken', token.data)
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      if (userInfo) commit('changeUserInfo', userInfo)
    }
  }
}

export default loginModel
