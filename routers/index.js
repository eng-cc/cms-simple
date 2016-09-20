var Router = require('koa-router')
var api = new Router()
var user = require('./user/index.js')
api.use('/api', user.routes())
module.exports = api
