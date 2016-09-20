var Koa = require('koa')
var convert = require('koa-convert')
var logger = require('koa-logger')
// var jwt = require('jsonwebtoken')
var bodyparser = require('koa-bodyparser')
var errorhandler = require('koa-errorhandler')
var config = require('config-lite')
// var scheme = require('koa-scheme')
var routerCache = require('koa-router-cache')
var gzip = require('koa-gzip')
// var router = require('koa-router')()
var routerApi = require('./routers/index.js')

var app = new Koa()

// var token = jwt.sign({foo: 'aaa'}, 'ddd')

// console.log(token)
// console.log(jwt.verify(token, 'ddd'))

app.use(convert(errorhandler()))
app.use(convert(bodyparser()))
app.use(convert(logger()))
// app.use(scheme(config.schemeConfig))
app.use(convert(routerCache(config.routerCacheConfig)))
app.use(convert(gzip()))
app.use(convert(routerApi.routes()))

app.listen(config.port, function () {
  console.log('listening' + config.port)
})
