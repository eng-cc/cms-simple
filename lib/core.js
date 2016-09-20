var Comment = require('./comment.js')
var Topic = require('./topic.js')
var User = require('./user.js')

module.exports = {
  get $User () {
    return User
  },
  get $Comment () {
    return Comment
  },
  get $Topic () {
    return Topic
  }
}
