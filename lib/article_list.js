var Article_list = require('../models').Article_list
var cache = require('co-cache')({
  expire: 10000
})

exports.addTitle = (data) => Article_list.create(data)

// exports.addSecTitle = (data) => Article_list.create(data)

// 通过id获取一个话题,并增加pv 1
exports.getTitleByName = (name) => Article_list.find({'title.name': name}).exec()

exports.getTitleLength = () => Article_list.count().exec()

// 通过id获取一个话题,并增加pv 1
exports.getTopicById = (id) => Article_list.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec()

// 通过标签和页码获取10个话题
exports.getTopicsByTab = cache((tab, p) => {
  let query = {}
  if (tab) {
    query.tab = tab
  }
  return Article_list.find(query)
              .skip((p - 1) * 10)
              .sort('-update_at')
              .limit(10)
              .select('-ccontent')
              .exec()
}, {
  key (tab, p) {
    tab = tab || 'all'
    return this.name + ':' + tab + ':' + p
  }
})

// 获取用户所有话题
exports.getTopicsByName = (name) => Article_list.find({'user.name': name}).sort('-updated_at').exec()

// 通过id增加一个话题的评论数
exports.incCommentById = (id) => Article_list.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec()

// 获取5条最新未评论的话题
// exports.getNoReplyTopics = cache(() => Article_list.find({comment: 0})
//                                             .sort('-updated_at')
//                                             .limit(5)
//                                             .select('title')
//                                             .exec())

// 获取不同标签的话题数
exports.getTopicsCount = cache((tab) => {
  let query = {}
  if (tab) { query.tab = tab }
  return Article_list.count(query).exec()
}, {
  key: function (tab) {
    tab = tab || 'all'
    return this.name + ':' + tab
  }
})
