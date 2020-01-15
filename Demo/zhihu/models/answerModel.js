import { Security } from '../utils/security.js'

class AnswerModel extends Security {
  getAnswerDetail(a_id) { // 回答详情
    let url = `/answer/detail/${a_id}`
    return this.security({ url: url })
  }

  answerSupport(aid) { // 回答点赞/取消
    let url = '/answer/support'
    return this.security({ url: url, data: { aid: aid }, method: 'POST' })
  }

  answerInform(a_id) { // 回答举报
    let url = `/answer/inform/${a_id}`
    return this.security({ url: url, method: 'POST' })
  }

  getAnswerCommentList({ a_id, page_index = 1, page_size = 10 }) { // 获取回答评论列表
    let url = `/answer/comment/${a_id}`
    return this.security({ url: url, data: { page_index: page_index, page_size: page_size } })
  }

  answerCommentAdd(commentData) { // 回答添加评论
    let url = '/answer/commentadd'
    return this.security({ url: url, data: commentData, method: 'POST' })
  }

  answerAdd(data) { // 添加回答
    let url = '/answer/add'
    return this.security({ url: url, data: data, method: 'POST' })
  }
}

export const answerModel = new AnswerModel()