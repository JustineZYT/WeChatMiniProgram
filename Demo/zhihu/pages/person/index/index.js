const app = getApp()
const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWxAuth: false,
    myDetail: {}
  },

  async onShow() {
    await Util.getFullUserInfo()
    let { user_type } = app.globalData.userInfo
    this.setData({
      showWxAuth: user_type == '0' ? true : false
    })
    this.getMyHomePage()
  },

  onShareAppMessage() {

  },

  /* 我的主态 */
  getMyHomePage() {
    app.userModel.getMyHomePage().then(res => {
      this.setData({
        myDetail: res.data
      })
    })
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

  /* 跳转至我的消息页 */
  jumptoMyMessage() {
    app.qx.navigateTo({ url: app.page.person_message })
  },

  /* 跳转至我的提问页 */
  jumptoMyQuestion() {
    let { id } = this.data.myDetail
    app.qx.navigateTo({ url: `${app.page.person_question}?uid=${id}` })
  },

  /* 跳转至我的回答页 */
  jumptoMyAnswer() {
    let { id } = this.data.myDetail
    app.qx.navigateTo({ url: `${app.page.person_answer}?uid=${id}` })
  },

  /* 跳转至实名认证页 */
  jumptoUserAuth() {
    app.qx.navigateTo({ url: app.page.person_auth })
  },

  /* 跳转至手机号绑定页 */
  jumptoPhoneBind() {
    app.qx.navigateTo({ url: app.page.person_phoneBind })
  }
})