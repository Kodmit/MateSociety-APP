const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Mate Society',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '/js/fontawesome.js' }
    ]
  },

  router: {
    middleware: 'i18n'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0079C2' },

  /*
   ** Global CSS
   */
  css: [
    '~/static/css/bulma.css',
    '@/assets/css/main.css',
    '@/assets/css/main.scss',
    '~/static/css/jqvmap.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/vuelidate.js',
    '~/plugins/axios.js',
    '~/plugins/datetime.js',
    '~/plugins/vue2-filters.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: "http://localhost:8000/api",
    headers: { 'content-type': 'application/json' }
    // See https://github.com/nuxt-community/axios-module#options
  },
  toast: {
    position: 'top-right',
    duration: 5000
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['vue-i18n', 'jqvmap'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
    }
  }
}
