    const baseUrl = '/api'
    // 信息提示框
    const alertBox = function (msg, isSucc) {
      msg = typeof msg !== undefined ? msg : '操作失败'
      if (msg.indexOf('permission') >= 0) {
        router.go('/index')
      }
      let color, icon
      if (isSucc || msg.indexOf('成功') >= 0) {
        color = 'btn-success'
        icon = 'fa-check-circle'
      } else {
        color = 'btn-danger'
        icon = 'fa-times-circle'
      }
      console.log(color, icon, msg)
      if (q('.alertBox').innerHTML === ' ' || q('.alertBox').innerHTML.length < 1) {
        var span = document.createElement('span')
        q('.alertBox').setAttribute('class', 'btn alertBox ' + color)
        var i = document.createElement('i')
        i.setAttribute('class', 'fa ' + icon)
        span.innerText = ' ' + msg
        q('.alertBox').appendChild(i)
        q('.alertBox').appendChild(span)
      }
      setTimeout(function () {
        q('.alertBox').innerHTML = ''
        q('.alertBox').setAttribute('class', 'alertBox')
      }, 4500)
    }
    // 各种状态码处理
    const resOpt = {
      code500: function (res, cb) {
        alertBox('操作失败')
        cb({status: 0})
      },
      code502: function (res, cb) {
        alertBox('操作失败')
        cb({status: 0})
      },
      code404: function (res, cb) {

      },
      code400: function (res, cb) {
        console.log('400')
        let data = JSON.parse(res)
        let msg = ''
        for (let prototype in data.message) {
          console.log(prototype)
          msg += data.message[prototype] + ','
        }
        alertBox(msg.slice(0, msg.length - 1))
        cb({status: 0})
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
            alertBox(data.message)
            if (router._currentRoute.path !== 'loginBox/login') {
              localStorage.setItem('url401back', router._currentRoute.path)
              alertBox('重新登录')
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
            alertBox('重新登录')
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
    // 选择器，因为有jq准备弃用
    const q = function (css) {
      return document.querySelector(css)
    }
    const qa = function (css) {
      return document.querySelectorAll(css)
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
      let ajaxData
      if (url !== '/user/token') {
        ajaxData = {
          method, url, cb, data, dataType
        }
      }
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP')
      xhr.open(method.toUpperCase(), baseUrl + url, true)
      if (tokenOperate.takeToken() && tokenOperate.takeToken().length > 0) {
        let token = tokenOperate.takeToken()
        xhr.setRequestHeader('Authorization', 'passport ' + token)
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
          resOpt[`code${xhr.status}`](res, cb, ajaxData)
        }
      }
    }
    // fetch
    // var fetch = function(method, url, cb, body) {
    //   let token = new String;
    //   token = tokenOperate.takeToken() ? tokenOperate.takeToken() : '';
    //   fetch(url, {
    //     method: method,
    //     headers: {
    //        'Content-Type ':  'application/json ',
    //        'Authorization ': 'passport ' + token
    //     },
    //     body: body
    //   }).then(function(res) {
    //     switch (res.status) {
    //       case 500:
    //         resOpt.code500(res, cb);
    //         break;
    //       case 404:
    //         resOpt.code404(res, cb);
    //         break;
    //       case 401:
    //         resOpt.code401(res, cb);
    //         break;
    //       case 403:
    //         resOpt.code403(res, cb);
    //         break;
    //       case 200:
    //         resOpt.code200(res, cb);
    //         break;
    //     }
    //   })
    // }

    // make nianjiList
    var generateNianjiList = function (xueqi) {
      var list = []
      for (var i = xueqi.length - 1; i >= 0; i--) {
        if (list.indexOf(xueqi[i]) === -1) {
          list.push({ dm: xueqi[i].dm.split('-')[0] })
        }
      }
      list = list.reverse()
      list = JSON.stringify(list)
      localStorage.setItem('nianji', list)
    }

    // url: /info/code_name/list
    const codeList = [
      'pyfs', 'xslb', 'xb', 'xx', 'mz', 'gatq', 'gb',
      'hkxz', 'zzmm', 'jtgx', 'hyzk', 'yxsbb',
      'yxslb', 'xggblb', 'xzjb', 'xw', 'grsf', 'xiaoqu', 'pycc', 'xueqi'
    ]

    const getCodeList = function () {
      for (var i = codeList.length - 1; i >= 0; i--) {
        codeNameOperate(codeList[i])
      }
    }
    var codeNameOperate = function (codeName) {
      // console.log(codeName);
      var setCodeNameLists = function (data) {
        // console.log(data);
        if (data.status) {
          if (codeName === 'xueqi') {
            data.code = data.code.reverse()
            console.log(data.code)
            generateNianjiList(data.code)
          }
          localStorage.setItem(codeName, JSON.stringify(data.code))
        }
      }
      var getCodeNameList = function () {
        ajax('get', '/info/code_name/' + codeName, setCodeNameLists, {}, 'json')
      }
      if (localStorage.getItem(codeName)) {

      } else {
        getCodeNameList()
      }
    }
    const autoChangeTitle = function () {
      if ($('.breadcrumb .active')[0]) {
        let title = $('.breadcrumb .active')[0].innerText
        console.log(title)
        document.title = '云家园-' + title
      } else {
        document.title = '云家园'
      }
    }

    const datepickerInit = function (...types) {
      // docs http://www.bootcss.com/p/bootstrap-datetimepicker/
      this.dataView1 = function () {
        $('.datetimepicker').each(function () {
          var opt = {
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            minView: 2,
            autoclose: true
          }
          $(this).datetimepicker(opt)
        })
      }
      this.dataView2 = function () {
        $('.daterange').each(function () {
          var elm = this
          $(this).daterangepicker({
            startDate: $(elm).prev().prev().val(),
            endDate: $(elm).prev().val(),
            format: 'YYYY-MM-DD'
          }, function (start, end) {
            $(elm).find('.date-title ').html(start.toDateStr() + '至' + end.toDateStr())
            $(elm).prev().prev().val(start.toDateStr())
            $(elm).prev().val(end.toDateStr())
          })
        })
      }
      this.dataView3 = function () {
        $('.datetimepicker3').each(function () {
          var opt = {
            language: 'zh-CN',
            format: 'yyyy-mm',
            startView: 3,
            minView: 3,
            autoclose: true
          }
          $(this).datetimepicker(opt)
        })
      }
      this.dataView4 = function () {
        $('.datetimepicker2').each(function () {
          var opt = {
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true
          }
          $(this).datetimepicker(opt)
        })
      }
      console.log(types)
      if (types.length > 0) {
        for (let type of types) {
          this[`dataView${type}`]()
        }
      } else {
        this.dataView1()
        this.dataView2()
        this.dataView3()
        this.dataView4()
      }
      // $(function () {
      //   let opt = {
      //     language: 'zh-CN',
      //     weekStart: 1,
      //     todayBtn: 1,
      //     autoclose: 1,
      //     minView: 2,
      //     maxView: 4,
      //     format: 'yyyy-mm-dd',
      //     todayHighlight: 1,
      //     startView: 2,
      //     forceParse: 0,
      //     showMeridian: 1
      //   }
      //   $('.datetimepicker').datetimepicker(opt)
      // })
    }

    export default {
      tokenOperate,
      ajax,
      q,
      qa,
      // fetch,
      alertBox,
      getCodeList,
      autoChangeTitle,
      datepickerInit
    }
