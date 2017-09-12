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

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '前端切图小分队',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'qteam 博客SSR版本' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FF9933', height: '3px' },
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
    { src: '~assets/sass/qwui_base.scss', lang: 'scss' }
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
  }],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://admin.qteam.cc' // api主机
      }
    ]
  ]
}
