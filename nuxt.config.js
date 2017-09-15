const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const resolve = require('path').resolve
const isVueRule = (rule) => {
  return rule.test.toString() === '/\\.vue$/'
}
const isSASSRule = (rule) => {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}

const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve(__dirname, 'assets/sass/global/main.scss')
    ]
  }
}

const redisOptions = {
  host: '127.0.0.1',
  port: '6379',
  pass: 'test123'
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '前端切图小分队',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'qteam 博客SSR版本'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//at.alicdn.com/t/font_j9qxmkf2j9u7syvi.css'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#FF9933', height: '3px'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.forEach((rule) => {
          if (isVueRule(rule)) {
            rule.options.loaders.sass.push(sassResourcesLoader)
            rule.options.loaders.scss.push(sassResourcesLoader)
          }
          if (isSASSRule(rule)) {
            rule.use.push(sassResourcesLoader)
          }
        })
      }
    },
    vendor: ['particles.js', 'axios', 'element-ui']
  },
  css: [
    'element-ui/lib/theme-default/index.css',
    'github-markdown-css/github-markdown.css',
    'simplemde-theme-base/dist/simplemde-theme-base.min.css',
    {src: '~assets/sass/qwui_base.scss', lang: 'scss'},
    {src: '~assets/sass/qwui_ui.scss', lang: 'scss'}
  ],
  babel: {
    plugins: [['component', [{
      libraryName: 'element-ui',
      styleLibraryName: 'theme-default'
    }]]]
  },
  plugins: ['~plugins/element-ui', {
    src: '~plugins/axios',
    ssr: false
  }, {
    src: '~plugins/VueSimplemde',
    ssr: false
  }],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  router: {
    middleware: 'auth'
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: true,
      saveUninitialized: true,
      cookie: {maxAge: 60000 * 5 * 20}
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/exapi'
  ]
}
