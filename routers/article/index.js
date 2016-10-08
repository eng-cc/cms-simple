var Router = require('koa-router')
var Crypto = require('crypto')
var jwt = require('jsonwebtoken')
var articleListOprt = require('../../lib/article_list.js')
var articleOprt = require('../../lib/article.js')
var article = new Router()

article.get('/title', async (ctx, next) => {
  try {
    let articleList = await articleListOprt.getTitleList().then()
    ctx.body = JSON.stringify({
      status: 1,
      content: articleList
    })
  } catch (e)  {
    console.log(e)
  }
})

article.post('/title/add', async (ctx, next) => {
  try {
    if (ctx.request.body.level === '1') {
      let queryMsg = await articleListOprt.getTitleList().then()
      console.log(queryMsg)
      for (var i = queryMsg.length - 1; i >= 0; i--) {
        if (queryMsg[i].name === ctx.request.body.title) {
          ctx.body = JSON.stringify({
            status: 0,
            message: 'have name'
          })
          ctx.close = true
        }
      }
      if (!ctx.close) {
        let title = {
          name: ctx.request.body.title,
          id: queryMsg.length,
          author: ctx.request.jwt.username,
          sequence: 0,
          subTitlt: []
        }
        console.log(title)
        let addMsg = await articleListOprt.addTitle(title).then()
        ctx.body = JSON.stringify({
          status: 1,
          level: 1
        })
      }
    } else if (ctx.request.body.level === '2') {
      let firTitleMsg = await articleListOprt
                                .getTitleById(ctx.request.body.firTitle)
                                .then()
      console.log(firTitleMsg)
      if (firTitleMsg[0].subTitle.length > 0) {
        for (var i = firTitleMsg[0].subTitle.length - 1; i >= 0; i--) {
          if (firTitleMsg[0].subTitle[i].name === ctx.request.body.subTitle) {
            console.log('have name')
            firTitleMsg.close = true
            ctx.body = JSON.stringify({
              status: 0,
              message: 'name have use',
              level:2
            })
            break
          }
        }
      }
      if (!firTitleMsg.close) {
        firTitleMsg[0].subTitle.push({
          name: ctx.request.body.subTitle,
          id: firTitleMsg[0].subTitle.length,
          sequence: 0,
          author: ctx.request.jwt.username,
        })
        console.log(firTitleMsg)
        let addedSubTitle = await articleListOprt
                                    .getTitleByIdAndUpdate(ctx.request.body.firTitle,
                                      firTitleMsg[0].subTitle)
                                    .then()
        console.log(addedSubTitle)
        if (addedSubTitle.ok) {
          ctx.body = JSON.stringify({
            status: 1,
            message: 'success'
          })
        } else {
          ctx.body = JSON.stringify({
            status: 0,
            message: 'false'
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
})

article.post('/article/add', async (ctx, next) => {
  try {
    let articleMsg = {
      title: ctx.request.body.title,
      author: ctx.request.jwt.username,
      belongs: ctx.request.body.belongs,
      content: ctx.request.body.content,
    }
    console.log(articleMsg)
    let saveMsg = await articleOprt.addArticle(articleMsg).then()
    console.log(saveMsg)
    if (saveMsg.title === articleMsg.title) {
      ctx.body = JSON.stringify({
        status: 1,
        message: 'succ'
      })
    }
  } catch(e) {
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
