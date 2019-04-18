export default function ({ $axios, store }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if ([401, 403].includes(code)) {
      console.log('penis')
      store.$router.push('/logout')
    }

    return Promise.reject(error)
  })

  $axios.onRequest((config) => {
    if (store.state.auth) {
      config.headers.common.Authorization = store.state.auth.accessToken
    }
  })
}
