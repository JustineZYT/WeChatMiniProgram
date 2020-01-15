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
      app.qx.setNavigationBarTitle({ title: `关注${options.nickname || '匿名'}的人` })
    }
    this.getFollowMeUserList(options.uid)
  },

  onShareAppMessage() {

  },

  /* 获取用户关注的人列表 */
  getFollowMeUserList(user_id) {
    app.userModel.getFollowMeUserList({ user_id: user_id }).then(res => {
      this.setData({
        userList: res.data.data
      })
    })
  }
})