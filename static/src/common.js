    const baseUrl = '/api'
    // 各种状态码处理
    const resOpt = {
      code500: function (res, cb) {
        cb({status: 0})
      },
      code502: function (res, cb) {
        cb({status: 0})
      },
      code404: function (res, cb) {
      },
      code400: function (res, cb) {
        console.log('400')
      },
      code401: function (res, cb, ajaxData) {
        console.log('401')
        let logined = (data) => {
          if (data.status) {
            localStorage.setItem('token', data.token)
            console.log(ajaxData)
            ajax(ajaxData.method,
              ajaxData.url,
              ajaxData.cb,
              ajaxData.data,
              ajaxData.datatype)
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            if (router._currentRoute.path !== 'loginBox/login') {
              localStorage.setItem('url401back', router._currentRoute.path)
            }
            router.go('/loginBox/login')
          }
        }
        if (localStorage.getItem('username') && localStorage.getItem('userid')) {
          let jsonData = JSON.stringify({
            username: localStorage.getItem('username'),
            password: atob(localStorage.getItem('userid'))
          })
          ajax('post', '/user/token', logined, jsonData, 'json')
        } else {
          if (router._currentRoute.path !== 'loginBox/login') {
            localStorage.setItem('url401back', router._currentRoute.path)
          }
          router.go('/loginBox/login')
        }
      },
      code403: function (res, cb) {
        res = JSON.parse(res)
        router.go('/index')
        cb('403')
        // alertBox(res.message)
      },
      code200: function (res, cb) {
        // console.log(cb)
        // console.log(res);
        res = JSON.parse(res)
        cb(res)
      }
    }
    // token操作
    const tokenOperate = {
      // 获取token后
      afterGetToken: function (data) {
        tokenOperate.saveToken(data.token)
        router.go('/')
      },
      // 写入token
      saveToken: function (token) {
        var date = new Date()
        localStorage.setItem('token', token)
        localStorage.setItem('time', date.getTime())
      },

      // 读取token
      takeToken: function () {
        var token = ''
        token = localStorage.getItem('token')
        return token
      },
      // 清除tooken
      clearToken: function () {
        localStorage.clear()
        console.log('out')
      }
    }
    const ajax = function (method, url, cb, data, dataType) {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP')
      xhr.open(method.toUpperCase(), baseUrl + url, true)
      if (tokenOperate.takeToken() && tokenOperate.takeToken().length > 0) {
        let token = tokenOperate.takeToken()
        xhr.setRequestHeader('Authorization', token)
      }
      if (method.toLowerCase() === 'get') {
        xhr.send(null)
      } else {
        var contentType = 'application/x-www-form-urlencoded'
        if (dataType) {
          if (dataType.toLowerCase() === 'json') {
            contentType = 'application/json'
          };
        };
        xhr.setRequestHeader('Content-type', contentType)
        xhr.send(data)
      };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          let res = unescape(xhr.responseText.replace(/\\u/g, '%u'))
          resOpt[`code${xhr.status}`](res, cb) //eslint-disable-line
        }
      }
    }

    export default {
      ajax
    }
