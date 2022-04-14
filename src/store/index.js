import { createStore, useStore as useVuexStore } from 'vuex'
import login from './login'
import article from './article'
import team from './team'
import user from './user'

const store = createStore({
  state: {
    tagsList: [],
    collapse: false
  },
  mutations: {
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1)
    },
    setTagsItem(state, data) {
      state.tagsList.push(data)
    },
    clearTags(state) {
      state.tagsList = []
    },
    closeTagsOther(state, data) {
      state.tagsList = data
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i]
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path)
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path)
          } else {
            data.$router.push('/')
          }
          state.tagsList.splice(i, 1)
          break
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(state, data) {
      state.collapse = data
    }
  },
  actions: {},
  modules: {
    login,
    article,
    team,
    user
  }
})

export function setupStore() {
  store.dispatch('login/loadDataAction')
}

export function useStore() {
  return useVuexStore()
}

export default store
