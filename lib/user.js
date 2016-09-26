var User = require('../models').User
// var assert = require('assert')

exports.addUser = (data) => User.create(data)

exports.getUserById = (id) => User.findbyid(id).exec()

exports.getUserByName = (name) => User.findOne({username: name}).exec()
