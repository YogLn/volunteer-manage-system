import { getReportListReq } from '@/services/report'

const loginModel = {
  namespaced: true,
  state() {
    return {
      reportList: []
    }
  },
  getters: {},
  mutations: {
    changeReportList(state, reportList) {
      state.reportList = reportList
    }
  },
  actions: {
    async getReportListAction({ commit }, payload) {
      const { data } = await getReportListReq()
      commit('changeReportList', data)
    }
  }
}

export default loginModel
