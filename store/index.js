import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: [
        {
          code: 'fr',
          name: 'FR'
        },
        {
          code: 'en',
          name: 'EN'
        }
      ],
      locale: 'fr',
      auth: null
    },
    mutations: {
      SET_LANG(state, locale) {
        if (state.locales.find(el => el.code === locale)) {
          state.locale = locale
        }
      },
      update(state, data) {
        state.auth = data
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let accessToken = null
        if (req.headers.cookie) {
          if (req.headers.cookie !== 'locale=fr') {
            const parsed = cookieparser.parse(req.headers.cookie)
            accessToken = JSON.parse(parsed.auth)
          }
        }
        commit('update', accessToken)
      }
    }
  })
}

export default createStore
