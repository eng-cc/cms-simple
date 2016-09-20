var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
var app = express()
var compiler = webpack(webpackConfig)
// console.log(webpackConfig.output)
var devMiddleware = require('webpack-dev-middleware')(compiler, {

  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    hot: true
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// app.use('/',function(req,res,next){
//   console.log(req.path)
//   next()
// })

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = {target: options, changeOrigin: true}
//   }
//   console.log(context, options)
//   // app.use(proxyMiddleware(context, options))
//   app.use(context, proxyMiddleware(options))
// })

app.use('/api', proxyMiddleware({ target: config.baseUrl, changeOrigin: true }))

// app.use('/user', proxyMiddleware({
//     target: 'http://localhost:5000',
//     changeOrigin: true
// }))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))
// 修改静态路由
app.use('/static', express.static(path.join(__dirname, '../static')))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
