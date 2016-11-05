import Router from 'koa-router'
var jwt = require('jsonwebtoken')
import user from './user/index'
import article from './article/index'
var admin = new Router()
admin.use('/admin', async (ctx, next) => {
  try {
    console.log(ctx.url)
    if (ctx.url === '/api/admin/token') {
      await next()
    } else {
      if (ctx.request.header.authorization) {
        ctx.request.jwt = jwt.verify(ctx.request.header.authorization, 'cms')
        if (ctx.request.jwt.username.length > 0) {
          await next()
        } else {
          throw new Error('token don\'t have username')
        }
      } else {
        throw new Error('no token')
      }
    }
  } catch (err) {
    console.error(err)
    ctx.status = 401
    ctx.body = 'unauthorized'
  }
})

admin.get('/admin', (ctx) => {
  ctx.body = JSON.stringify({
    admin: true
  })
})
admin.use('/admin', user.routes())
admin.use('/admin', article.routes())
module.exports = admin
