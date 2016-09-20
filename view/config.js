// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// noinspection Eslint
module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/', // dev
    assetsPublicPath_build: '/static/',  // build
    // 生产环境下的assetsPublicPath被重写为assetsPublicPath_build
    productionSourceMap: false
  },
  baseUrl: 'http://www.ncuos.com:8087',
  dev: {
    port: 8080
  }
}
