import axios from 'axios'

export default ({ isServer, store, req }) => {
  if (isServer && !req) return
  const token = isServer ? store.state.authUser : localStorage.getItem('access_token')
  let config = {
    headers: {'Authorization': 'Bearer ' + token}
  }
  if (token && token !== '') {
    axios.get('/api/me', config)
      .then(response => {
        if (response.data.status_code === '200') {
          store.commit('SET_USERINFO', response.data.user)
          store.commit('SET_LOGIN', true)
        } else {
          store.commit('SET_LOGIN', false)
        }
      })
  } else {
    store.commit('SET_LOGIN', false)
  }
}
