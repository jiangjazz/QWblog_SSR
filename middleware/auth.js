import axios from 'axios'

axios.interceptors.response.use(response => {
  if (response.data.status_code !== '200') {
    if (response.data.hasOwnProperty('error')) {
      for (let item in response.data.error) {
        response.data.message += ' ' + response.data.error[item][0] + ' '
      }
      return response
    } else {
      return response
    }
  } else {
    return response
  }
}, error => {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const token = localStorage.getItem('access_token')
    if (token && token !== '') {
      return axios.post('/api/token', {token})
        .then(({data}) => {
          localStorage.setItem('access_token', data.access_token)
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token
          // retry request
          originalRequest.headers.Authorization = 'Bearer ' + data.access_token
          return axios(originalRequest)
        })
    }
  }
  return Promise.reject(error)
})

export default async ({ isServer, store, req }) => {
  if (isServer && !req) return
  const token = isServer ? store.state.authUser : localStorage.getItem('access_token')
  let config = {
    headers: {'Authorization': 'Bearer ' + token}
  }
  if (token && token !== '') {
    let {data} = await axios.get('/api/me', config)
    store.commit('SET_USERINFO', data.user)
    store.commit('SET_LOGIN', true)
  } else {
    store.commit('SET_LOGIN', false)
  }
}
