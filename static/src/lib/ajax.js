const resOpt = {
  code500: function (res) {
    console.log('500')
  },
  code502: function (res) {
    console.log('502')
  },
  code404: function (res) {
    console.log('404')
  },
  code400: function (res) {
    console.log('400')
  },
  code401: function (res, cb, ajaxData) {
    console.log('401')
    router.push('/admin/login')
  },
  code403: function (res, cb) {
    console.log('403')
  }
}

/**
 * @desc promise 封装的ajax， 配合async await使用
 * @param method {str} http请求方式
 * @param url {str} 请求地址
 * @param data {str} 请求体数据
 * @param dataType {str} 数据格式，默认application/json
 */
const ajax = (method, url, data, dataType) => {
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open(method.toUpperCase(), url, true)
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 0) {
      xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
    }
    if (method.toLowerCase() === 'get') {
      xhr.send(null)
    } else {
      var contentType = 'application/json'
      if (dataType) {
        if (dataType.toLowerCase() === 'form') {
          contentType = 'application/x-www-form-urlencoded'
        };
      };
      xhr.setRequestHeader('Content-type', contentType)
      xhr.send(data)
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText)
          resolve(res)
          if (res.status) {
          }
        } else {
          resOpt[`code${xhr.status}`](xhr.responseText) // eslint-disable-lin
          // reject(xhr.status)
        }
      }
    }
  })
}

module.exports = ajax

// exports.ajax = ajax
