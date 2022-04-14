import { getActivityListReq } from '@/services/activity'

const activityModel = {
  namespaced: true,
  state() {
    return {
      activityList: []
    }
  },
  getters: {},
  mutations: {
    changeActivityList(state, activityList) {
      state.activityList = activityList
    }
  },
  actions: {
    async getActivityListAction({ commit }) {
      const { data } = await getActivityListReq()
      commit('changeActivityList', data)
    }
  }
}

export default activityModel
