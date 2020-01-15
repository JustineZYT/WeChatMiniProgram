const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    showWxAuth: false,
    attentionUserList: [],
    searchUserList: [],
    searchValue: ''
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { user_type } = app.globalData.userInfo
    if (user_type == '0') {
      this.setData({
        showWxAuth: true
      })
    }
    this.q_id = options.q_id
    app.qid = options.q_id
    this.getInviteAttentionUserList()
  },

  onShareAppMessage() {

  },

  /* 微信授权 */
  wxAuthorize(e) {
    let userInfo = e.detail
    if (!userInfo) return
    app.userModel.authSetUserInfo(userInfo).then(() => {
      app.globalData.userInfo.user_type = '1'
      this.setData({
        showWxAuth: false
      })
      app.qx.navigateTo({ url: app.page.person_phoneBind })
      wx.setStorageSync('is_auth', 'yes')
    })
  },

  /* 获取邀请我已关注的人列表 */
  getInviteAttentionUserList() {
    app.questionModel.getInviteAttentionUserList(this.q_id).then(res => {
      this.setData({
        attentionUserList: res.data
      })
    })
  },

  /* 清除搜索词 */
  clearSearchValue() {
    this.setData({
      searchValue: ''
    })
  },

  /* 搜索输入行执行 */
  searchKeyword(e) {
    let keyword = e.detail.value
    app.keyword = keyword
    this.setData({
      searchValue: keyword
    })
    if (!keyword) return
    this.searchQuestionUserList(keyword)
  },

  /* 搜索问题邀请用户列表 */
  searchQuestionUserList(keyword) {
    app.questionModel.searchQuestionUserList({ qid: this.q_id, name: keyword }).then(res => {
      this.setData({
        searchUserList: res.data.userlist
      })
    })
  }
})