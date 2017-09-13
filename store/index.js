import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    authUser: null,
    isLogin: false,
    userInfo: {
      name: ''
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.authUser = user
    },
    SET_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      console.log(req.session.authUser)
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    }
  }
})

export default store
