import { getTeamListReq } from '@/services/team'

const articleModel = {
  namespaced: true,
  state() {
    return {
      teamList: []
    }
  },
  getters: {},
  mutations: {
    changeTeamList(state, teamList) {
      state.teamList = teamList
    }
  },
  actions: {
    async getTeamListAction({ commit }) {
      const { data } = await getTeamListReq()
      commit('changeTeamList', data)
    }
  }
}

export default articleModel
