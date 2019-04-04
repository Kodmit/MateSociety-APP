export const state = () => ({
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
  locale: 'fr'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
}
