var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleListSchema = new Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  author: {type: String, required: true},
  sequence: {type: Number, required: true},
  created_at: { type: Date, default: Date.now },
  subTitle: [
    {
      name: { type: String, required: true },
      id: { type: Number, required: true },
      author: {type: String, required: true},
      sequence: {type: Number, required: true},
      created_at: { type: Date, default: Date.now },
    }
  ]
})

ArticleListSchema.index({title: 1, sequence: -1})
ArticleListSchema.index({'subTitlt.title': 1, sequence: -1})

module.exports = mongoose.model('article_list', ArticleListSchema)
