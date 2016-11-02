var Router = require('koa-router')
var Crypto = require('crypto')
var jwt = require('jsonwebtoken')
var userOprt = require('../../../lib/user.js')
var user = new Router()

user.post('/adduser', async (ctx, next) => {
  // console.log('adduser')
  try {
    let queryMsg = await userOprt.getUserByName(ctx.request.body.username).then()
    console.log(queryMsg)
    if (queryMsg && queryMsg.username === ctx.request.body.username) {
      ctx.body = JSON.stringify({
        status: 0,
        message: 'username err'
      })
      console.log(ctx.body)
    } else {
      ctx.request.body.password = Crypto.createHmac('sha256', ctx.request.body.password)
                                        .update('qwer')
                                        .digest('hex')
      let createMsg = await userOprt.addUser(ctx.request.body).then()
      console.log(createMsg)
      if (createMsg && createMsg.username === ctx.request.body.username) {
        console.log('1')
        ctx.body = JSON.stringify({
          status: 1,
          message: '添加成功'
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
})

user.post('/token', async (ctx, next) => {
  try {
    let queryMsg = await userOprt.getUserByName(ctx.request.body.username).then()
    if (queryMsg) {
      // console.log('+++')
      ctx.request.body.password = Crypto.createHmac('sha256', ctx.request.body.password)
                                        .update('qwer')
                                        .digest('hex')
      if (queryMsg.password === ctx.request.body.password) {
        ctx.body = JSON.stringify({
          status: 1,
          token: jwt.sign({username: ctx.request.body.username}, 'cms')
        })
      } else {
        ctx.body = JSON.stringify({
          status: 0,
          message: '密码错误'
        })
      }
    } else {
      ctx.body = JSON.stringify({
        status: 0,
        token: '用户名错误'
      })
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = user
