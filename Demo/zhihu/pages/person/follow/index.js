const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    userList: []
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { id } = app.globalData.userInfo
    if (id != options.uid) {
      app.qx.setNavigationBarTitle({ title: `${options.nickname || '匿名'}关注的人` })
    }
    this.getMyAttentionUserList(options.uid)
  },

  onShareAppMessage() {

  },

  /* 获取用户关注的人列表 */
  getMyAttentionUserList(user_id) {
    app.userModel.getMyAttentionUserList({ user_id: user_id }).then(res => {
      this.setData({
        userList: res.data.data
      })
    })
  }
})