var Router = require('koa-router')
import articleListOprt from '../../../lib/title_list'
var articleOprt = require('../../../lib/article.js')
var article = new Router()

article.get('/title', async (ctx, next) => {
  try {
    let articleList = await articleListOprt.getTitleList().then()
    ctx.body = JSON.stringify({
      status: 1,
      content: articleList
    })
  } catch (e) {
    console.log(e)
  }
})

article.get('/article/:belongs', async (ctx, next) => {
  let queryMsg = await articleOprt
                        .getArticleByBelongs(ctx.params.belongs)
                        .then()
  console.log(queryMsg)
  ctx.body = JSON.stringify({
    status: 1,
    content: queryMsg
  })
})

module.exports = article
