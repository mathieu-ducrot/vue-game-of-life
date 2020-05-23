/*
 * nuxt.config.js
 * https://nuxtjs.org/faq/github-pages/#deploying-to-github-pages-for-repository
 */
// only add `router.base = '/game-of-life/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/game-of-life/'
        }
      }
    : {}

export default {
  mode: 'universal',
  ...routerBase,
  generate: {
    fallback: '404.html'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Game of Life with Vue.js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The Game of Life from John Conway implemented with Vue.js and render using the canvas html element.'
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://game-of-life-in-vue-mathieu-ducrot.netlify.app'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Game of Life with Vue.js'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Game of Life with Vue.js'
      },
      { hid: 'og:locale', name: 'og:locale', content: 'en' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Game of Life with Vue.js'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'The Game of Life from John Conway implemented with Vue.js and render using the canvas html element.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  noscript: [
    { innerHTML: 'This website requires JavaScript to work properly.' }
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2e334a' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' },
    // be sure to load the fontawesome-svg-core last or you could have loading font issue
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' },
    '~/plugins/fontawesome.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma' instead we load our main.scss in css config and override some values
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  sitemap: {
    path: '/sitemap.xml', // sitemap location
    hostname: 'https://game-of-life-in-vue-mathieu-ducrot.netlify.app/',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Generate a static version of the sitemap
    routes: ['/', '/game', '/rules'].map((route) => ({
      url: route,
      changefreq: 'monthly',
      priority: 1,
      lastmodISO: new Date().toISOString().split('T')[0]
    }))
  },
  robots: {
    Sitemap: `https://game-of-life-in-vue-mathieu-ducrot.netlify.app/sitemap.xml`
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    filenames: {
      img: 'img/[name]-[contenthash:7].[ext]'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
