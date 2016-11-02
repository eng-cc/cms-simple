import Router from 'koa-router'
import user from './user/index'
import article from './article/index'
var admin = new Router()
admin.use('/admin', user.routes())
admin.use('/admin', article.routes())
module.exports = admin
