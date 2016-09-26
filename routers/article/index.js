 var Router = require('koa-router')
var Crypto = require('crypto')
var jwt = require('jsonwebtoken')
var articleOprt = require('../../lib/article_list.js')
var article = new Router()

article.get('/article', async (ctx, next) => {
  try {
    let articleList = await articleOprt.getTitleList().then()
    ctx.body = JSON.stringify({
      status: 1,
      content: articleList
    })
  } catch (e) => {console.log(e)}
})

article.post('/article/add', async (ctx, next) => {
  try {
    console.log(articleOprt.getTitleLength)
    let queryMsg = await articleOprt.getTitleLength().then()
    if (queryMsg) {
      ctx.request.body.title_id = queryMsg
    } else {
      ctx.request.body.title_id = 0
    }
    let title = {
      title: {
        name: ctx.request.body.title,
        id: ctx.request.body.title_id
      },
      author: ctx.request.jwt.username,
      sequence: 0,
      subTitlt: []
    }
    console.log(title)
    let addMsg = await articleOprt.addTitle(title).then()
    ctx.body = JSON.stringify({
      status: 1
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = article
