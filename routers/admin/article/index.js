var Router = require('koa-router')
var articleListOprt = require('../../../lib/title_list.js')
var articleOprt = require('../../../lib/article.js')
var article = new Router()

article.post('/title/add', async (ctx, next) => {
  try {
    if (ctx.request.body.level === '1') {
      let queryMsg = await articleListOprt.getTitleByName(ctx.request.body.title).then()
      console.log(queryMsg)
      if (queryMsg.length > 0) {
        ctx.body = JSON.stringify({
          status: 0,
          message: '栏目已存在'
        })
      } else {
        let title = {
          name: ctx.request.body.title,
          id: queryMsg.length,
          author: ctx.request.jwt.username,
          sequence: 0,
          subTitlt: []
        }
        let addMsg = await articleListOprt.addTitle(title).then()
        if (addMsg) {
          ctx.body = JSON.stringify({
            status: 1,
            message: '添加成功'
          })
        }
      }
    } else if (ctx.request.body.level === '2') {
      let firTitleMsg = await articleListOprt.getTitleByName(ctx.request.body.firTitle).then()
      console.log(firTitleMsg)
      if (firTitleMsg[0].subTitle.length > 0) {
        for (let i = firTitleMsg[0].subTitle.length - 1; i >= 0; i--) {
          if (firTitleMsg[0].subTitle[i].name === ctx.request.body.subTitle) {
            firTitleMsg.close = true
            ctx.body = JSON.stringify({
              status: 0,
              message: '栏目已存在'
            })
            break
          }
        }
      }
      if (!firTitleMsg.close) {
        firTitleMsg[0].subTitle.push({
          name: ctx.request.body.subTitle,
          sequence: 0,
          author: ctx.request.jwt.username
        })
        let addedSubTitle = await articleListOprt.getTitleByNameAndUpdate(ctx.request.body.firTitle, firTitleMsg[0].subTitle).then()
        if (addedSubTitle.ok) {
          ctx.body = JSON.stringify({
            status: 1,
            message: '添加成功'
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
    ctx.body = JSON.stringify({
      status: 0,
      message: 'false'
    })
  }
})

article.post('/article/add', async (ctx, next) => {
  try {
    let articleMsg = {
      title: ctx.request.body.title,
      author: ctx.request.jwt.username,
      belongs: ctx.request.body.belongs,
      content: ctx.request.body.content
    }
    let saveMsg = await articleOprt.addArticle(articleMsg).then()
    if (saveMsg.title === articleMsg.title) {
      ctx.body = JSON.stringify({
        status: 1,
        message: '添加成功'
      })
    }
  } catch (e) {
    console.log(e)
    ctx.body = JSON.stringify({
      status: 0,
      message: '添加失败'
    })
  }
})

module.exports = article
