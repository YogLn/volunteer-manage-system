import { getuserListReq } from '@/services/user'

const userModel = {
  namespaced: true,
  state() {
    return {
      userList: [],
    }
  },
  getters: {},
  mutations: {
    changeUserList(state, userList) {
      state.userList = userList
    },
  },
  actions: {
    async getUserListAction({ commit }) {
      const { data } = await getuserListReq()
      commit('changeUserList', data)
    }
  }
}

export default userModel
