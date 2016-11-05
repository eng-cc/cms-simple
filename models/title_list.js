var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TitleListSchema = new Schema({
  name: { type: String, required: true },
  author: {type: String, required: true},
  sequence: {type: Number, required: true},
  created_at: { type: Date, default: Date.now },
  subTitle: [
    {
      name: { type: String, required: true },
      author: {type: String, required: true},
      sequence: {type: Number, required: true},
      created_at: { type: Date, default: Date.now }
    }
  ]
})

TitleListSchema.index({title: 1, sequence: -1})
TitleListSchema.index({'subTitlt.title': 1, sequence: -1})

module.exports = mongoose.model('title_list', TitleListSchema)
