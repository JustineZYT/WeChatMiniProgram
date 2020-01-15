import { Security } from '../utils/security.js'

class SearchModel extends Security {
  searchQuestion(keyword) { // 搜索问题
    let url = '/search/question'
    return this.security({ url: url, data: { keyword: keyword } })
  }

  searchUser(keyword) { // 搜索用户
    let url = '/search/user'
    return this.security({ url: url, data: { keyword: keyword } })
  }
}

export const searchModel = new SearchModel()