export default async ({ isServer, isClient, store, req, app, redirect, env }) => {
  if (isServer && !req) return
  app.$axios.defaults.baseURL = env.baseUrl
  app.$axios.interceptors.response.use(
    undefined,
    (error) => {
      if (error.response && error.response.status === 401 && !error.response.config.isRetry) {
        const token = isServer ? store.state.authUser : localStorage.getItem('access_token')
        store.commit('SET_USER', null)
        store.commit('SET_USERINFO', null)
        redirect('/login')
      }
      return Promise.reject(error)
    }
  )
}
