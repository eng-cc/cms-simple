var Router = require('koa-router')
var api = new Router()
import commonArticle from './common/article/index'
var admin = require('./admin/index.js')
api.use('/api', admin.routes())
api.use('/api', commonArticle.routes())
module.exports = api
