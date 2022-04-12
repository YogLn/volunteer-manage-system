import { getArticleListReq } from '@/services/article'

const articleModel = {
  namespaced: true,
  state() {
    return {
      articleUserList: [],
      articleTeamList: []
    }
  },
  getters: {},
  mutations: {
    changeArticleUserList(state, articleUserList) {
      state.articleUserList = articleUserList
    },
    changeArticleTeamList(state, articleTeamList) {
      state.articleTeamList = articleTeamList
    }
  },
  actions: {
    async getArticleListAction({ commit }, payload) {
      const { data } = await getArticleListReq(payload)
      if (payload === 1) {
        commit('changeArticleUserList', data)
      } else {
        commit('changeArticleTeamList', data)
      }
    }
  }
}

export default articleModel
