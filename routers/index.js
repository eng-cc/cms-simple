var Router = require('koa-router')
var api = new Router()
var user = require('./user/index.js')
var article = require('./article/index.js')
api.use('/api', user.routes())
api.use('/api', article.routes())
module.exports = api
