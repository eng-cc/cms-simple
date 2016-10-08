var Article = require('../models').Article

exports.addArticle = (data) => Article.create(data)

exports.getArticleByBelongs = (belongs) => Article.find({'belongs': belongs}).exec()

// 根据话题id获取对应评论
exports.getCommentsByTopicId = (id) => Comment.find({topic_id: id})
                                              .sort('updated_at')
                                              .exec()
