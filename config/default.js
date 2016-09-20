var path = require('path')

module.exports = {
  port: process.env.PORT || 3030,
  mongodb: {
    url: 'http://127.0.0.1:27017/'
  },
  schemeConfig: path.join(__dirname, './default.scheme.js'),
  routerConfig: 'routers',
  routerCacheConfig: {}
}
