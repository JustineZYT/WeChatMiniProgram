const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    questionList: []
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { id } = app.globalData.userInfo
    if (id != options.uid) {
      app.qx.setNavigationBarTitle({ title: `${options.nickname || '匿名'}关注的问题` })
    }
    this.getUserAttentionQuestionList(options.uid)
  },

  onShareAppMessage() {

  },

  /* 获取用户关注的问题列表 */
  getUserAttentionQuestionList(user_id) {
    app.userModel.getUserAttentionQuestionList({ user_id: user_id }).then(res => {
      this.setData({
        questionList: res.data.data
      })
    })
  }
})