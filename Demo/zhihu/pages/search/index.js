import Util from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    tabnum: 1,
    searchValue: '',
    searchHistory: [],
    questionList: [],
    userList: []
  },

  onLoad() {
    let searchHistory = Util.getSearchHistory(this.data.tabnum.toString())
    this.setData({
      searchHistory: searchHistory
    })
  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },

  /* 搜索切换 */
  tabSwitch(e) {
    let { tabnum } = e.currentTarget.dataset
    let searchHistory = Util.getSearchHistory(tabnum.toString())
    this.setData({
      tabnum: tabnum,
      searchHistory: searchHistory
    })
  },

  /* 搜索问题 */
  searchQuestion(keyword) {
    app.searchModel.searchQuestion(keyword).then(res => {
      this.setData({
        questionList: res.data.data
      })
    })
  },

  /* 搜索用户 */
  searchUser(keyword) {
    app.searchModel.searchUser(keyword).then(res => {
      this.setData({
        userList: res.data.data
      })
    })
  },

  /* 搜索输入执行 */
  searchKeyword(e) {
    let keyword = e.detail.value
    app.keyword = keyword
    this.setData({
      searchValue: keyword
    })
    if (!keyword) return
    let { tabnum } = this.data
    if (tabnum == 1) {
      this.searchQuestion(keyword)
    } else {
      this.searchUser(keyword)
    }
  },

  /* 点击搜索记录搜索 */
  searchHistoryItem(e) {
    let { keyword } = e.currentTarget.dataset
    let { tabnum } = this.data
    this.setData({
      searchValue: keyword
    })
    if (tabnum == 1) {
      this.searchQuestion(keyword)
    } else {
      this.searchUser(keyword)
    }
  },

  /* 清除搜索词 */
  clearSearchValue() {
    this.setData({
      searchValue: ''
    })
  },

  /* 删除单个搜索历史记录 */
  removeSearchItem(e) {
    let { guid } = e.currentTarget.dataset
    let { tabnum } = this.data
    Util.removeSearchHistory({ searchType: tabnum.toString(), guid: guid })
    this.setData({
      searchHistory: Util.getSearchHistory(tabnum.toString())
    })
  },

  /* 清空搜索历史记录 */
  clearSearchHistory() {
    let { tabnum } = this.data
    Util.showModal({ title: '确定清除所有搜索历史记录吗？' }).then(() => {
      Util.clearSearchHistory(tabnum.toString())
      this.setData({
        searchHistory: Util.getSearchHistory(tabnum.toString())
      })
    })
  }
})