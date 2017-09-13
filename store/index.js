export const state = () => ({
  authUser: null,
  isLogin: false,
  userInfo: {
    name: ''
  }
})

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user
  },
  SET_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
}
