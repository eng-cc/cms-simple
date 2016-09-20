var User = require('../models').User

exports.addUser = (data) => User.create(data)

exports.getUserById = (id) => User.findbyid(id).exec()

exports.getUserByName = (name) => User.findOne({name: name}).exec()
