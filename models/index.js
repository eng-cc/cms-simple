var mongoose = require('mongoose')
var config = require('config-lite').mongodb

mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message)
    process.exit(1)
  }
})

exports.User = require('./user.js')
exports.Topic = require('./topic.js')
exports.Comment = require('./comment.js')
