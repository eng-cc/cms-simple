var Koa = require('koa')
var convert = require('koa-convert')
var logger = require('koa-logger')
var jwt = require('jsonwebtoken')
var bodyparser = require('koa-bodyparser')
var errorhandler = require('koa-errorhandler')
var config = require('config-lite')
// var scheme = require('koa-scheme')
// var routerCache = require('koa-router-cache')
var gzip = require('koa-gzip')
// var router = require('koa-router')()
var routerApi = require('./routers/index.js')

var app = new Koa()

// var token = jwt.sign({foo: 'aaa'}, 'ddd')

// console.log(token)
// console.log(jwt.verify(token, 'ddd'))

app.use(convert(errorhandler()))
app.use(convert(bodyparser()))
app.use(async (ctx, next) => {
  if (ctx.request.url !== '/api/token') {
    try {
      ctx.request.jwt = jwt.verify(ctx.request.header.authorization, 'cms')
      await next()
      console.log(ctx.request.jwt)
    } catch (err) {
      console.log(err)
      // ctx.body = '401'
    }
  } else {
    console.log('next')
    await next()
  }
})
app.use(convert(logger()))
// app.use(scheme(config.schemeConfig))
// app.use(convert(routerCache(config.routerCacheConfig)))
app.use(convert(gzip()))
app.use(convert(routerApi.routes()))

app.listen(config.port)
