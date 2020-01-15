import { Security } from '../utils/security.js'

class QuestionModel extends Security {
  getQuestionDetail(q_id) { // 问题详情
    let url = `/question/detail/${q_id}`
    return this.security({ url: url })
  }

  getQuestionAnswerList(q_id, query) { // 问题对应回答列表
    let url = `/question/answerlist/${q_id}`
    return this.security({ url: url, data: query })
  }

  attentionQuestion(qid) { // 关注或取关问题
    let url = '/question/attention'
    return this.security({ url: url, data: { qid: qid }, method: 'POST' })
  }

  getInviteAttentionUserList(qid) { // 获取邀请我已关注的人列表
    let url = `/question/attention/${qid}`
    return this.security({ url: url })
  }

  searchQuestionUserList({ qid, name, page_index = 1, page_size = 99 }) { // 搜索问题邀请用户列表
    let url = '/question/userlist'
    return this.security({ url: url, data: { qid: qid, name: name, page_index: page_index, page_size: page_size } })
  }

  questionInvite(qid, uid) { // 邀请回答问题
    let url = '/question/invite'
    return this.security({ url: url, data: { qid: qid, uid: uid }, method: 'POST' })
  }
}

export const questionModel = new QuestionModel()