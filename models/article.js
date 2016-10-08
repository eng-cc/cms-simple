var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var ArticleSchema = new Schema({
	title: {type: String, required: true},
  author: {type: String, required: true},
  belongs: {type: String, required: true},
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

ArticleSchema.index({topic_id: 1, updated_at: 1})

module.exports = mongoose.model('Article', ArticleSchema)
