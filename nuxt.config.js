const { cacheAndCopy } = require('./cache-me')
const mockRoutes = require('./route-mock')
const { initialRoutes, additionalRoutes, initialTotalRoutes, additionalTotalRoutes } = mockRoutes

const routesToGenerate = initialRoutes
const routesList = initialTotalRoutes
const isDev = process.env.DEPLOY_ENV === 'DEV'

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'my-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  },
  env: {
    isDev: isDev,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiBaseUrl: process.env.DEPLOY_ENV === 'PROD' ? 'REPLACE_PROD_API' : 'REPLACE_DEV_API',
    MAPBOX_TOKEN: 'REPLACE_MAPBOX_TOKEN'
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#0055aa' },
  /*
   ** Plugins
   */
  plugins: [],
  /*
   ** Modules
   */
  modules: ['@nuxtjs/axios', 'nuxt-purgecss'],
  /*
   ** axios module config
   */
  axios: {
    debug: isDev
  },
  /*
   ** CSS
   */
  css: [{ src: 'assets/scss/bulma-overrides.scss', lang: 'scss' }, { src: 'assets/scss/main.scss', lang: 'scss' }],
  /*
   ** PurgeCSS config
   */
  purgeCSS: {
    enabled: true
  },
  /*
   ** Generate configuration
   ** Define routes used for building static pages
   */
  generate: {
    fallback: true,
    routes: function(callback) {
      const routes = routesToGenerate.concat({
        route: '/',
        payload: {
          routesList: routesList
        }
      })
      callback(null, routes)
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Analyze build files
     */
    analyze: {
      analyzerMode: isDev ? 'static' : 'disabled'
    },
    /*
     ** Extract CSS in main chunk to separate cachaeble CSS file
     ** per https://github.com/nuxt/nuxt.js/issues/3166#issuecomment-409004911
     */
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(s?css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    // Set babel plugin per
    // https://stackoverflow.com/questions/53922898/nuxt-js-client-fails-in-production-but-works-during-development
    babel: {
      plugins: ['dynamic-import-node']
    },
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  hooks: {
    generate: {
      // async before() {
      //   console.log('this bef  orehook..')
      //   await putNuxtClientBack()
      // },
      async done() {
        await cacheAndCopy()
        console.log('done')
      }
    }
  }
}
