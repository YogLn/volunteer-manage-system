// import { login, getUserInfo } from '@/service/login'
import router from '@/router'

import LocalCache from '@/utils/cache'

const loginModel = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
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
      // 登录逻辑
      // const loginResult = await login(payload)
      // commit('changeToken', loginResult.token)
      // LocalCache.setCache('token', loginResult.token)

      // 获取头像
      // const userInfo = await getUserInfo(loginResult.id)
      // commit('changeUserInfo', userInfo[0])
      // LocalCache.setCache('userInfo', userInfo[0])
      router.push('/main')
    },

    loadDataAction({ commit }) {
      const token = LocalCache.getCache('token')
      if(token) commit('changeToken', token)

      const userInfo = LocalCache.getCache('userInfo')
      if(userInfo) commit('changeUserInfo', userInfo)
    }
  }
}

export default loginModel
