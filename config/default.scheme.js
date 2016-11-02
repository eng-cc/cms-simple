var validator = require('validator')
// var crypto = require('coyrto')

module.exports = {
  '(POST) /api/adduser': {
    'request': {
      'body': {
        'username': validator.isEmail
      }
    }
  }
}
