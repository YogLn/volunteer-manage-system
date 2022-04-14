import { getCommentListReq } from '@/services/comment'

const loginModel = {
  namespaced: true,
  state() {
    return {
      commentList: []
    }
  },
  getters: {},
  mutations: {
    changeCommentList(state, commentList) {
      state.commentList = commentList
    }
  },
  actions: {
    async getCommentListAction({ commit }, payload) {
      const { data } = await getCommentListReq()
      commit('changeCommentList', data)
    }
  }
}

export default loginModel
