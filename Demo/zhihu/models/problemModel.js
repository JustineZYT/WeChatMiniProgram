import { Security } from '../utils/security.js'

class Problem extends Security {
  createQuestion(data) { // 创建问题
    let url = `/question/create`
    return this.security({ url, data, method: 'POST' })
  }

  questionAddContent(data) { // 追加问题描述
    let url = '/question/addcontent'
    return this.security({ url, data, method: 'PUT' })
  }
}

export const problemModel = new Problem()