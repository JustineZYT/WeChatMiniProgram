const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    showWxAuth: false,
    user_id: '',
    answerDetail: {}
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { id, user_type } = app.globalData.userInfo
    this.setData({
      user_id: id
    })
    if (user_type == '0') {
      this.setData({
        showWxAuth: true
      })
    }
    this.a_id = options.a_id
    this.q_id = options.q_id
    this.getAnswerDetail(options.a_id)
  },

  onShareAppMessage() {

  },

  /* 获取回答详情 */
  getAnswerDetail(a_id) {
    app.answerModel.getAnswerDetail(a_id).then(res => {
      this.setData({
        answerDetail: res.data
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

  /* 关注回答人 */
  attentionAnswerUser() {
    let { uid, is_attention } = this.data.answerDetail
    if (is_attention == 0) {
      is_attention = 1
    } else {
      is_attention = 0
    }
    app.userModel.attentionUser(uid, is_attention).then(res => {
      this.setData({
        'answerDetail.is_attention': res.data.status
      })
    })
  },

  /* 回答点赞/取消 */
  answerSupport() {
    let { is_support, support_num } = this.data.answerDetail
    if (is_support == 0) {
      is_support = 1
      support_num++
    } else {
      is_support = 0
      support_num--
    }
    app.answerModel.answerSupport(this.a_id).then(res => {
      this.setData({
        'answerDetail.is_support': is_support,
        'answerDetail.support_num': support_num
      })
    })
  },

  /* 跳转至回答页 */
  jumptoAnswerIndex() {
    app.qx.navigateTo({ url: `${app.page.answer_index}?q_id=${this.q_id}` })
  },

  /* 跳转至问题详情页 */
  jumptoQuestionDetail() {
    app.qx.navigateTo({ url: `${app.page.problem_detail}?q_id=${this.q_id}` })
  },

  /* 跳转至回答评论页 */
  jumptoAnswerComment() {
    app.qx.navigateTo({ url: `${app.page.comment}?a_id=${this.a_id}` })
  },

  /* 跳转至用户个人中心 */
  jumptoUserCenter() {
    app.qx.navigateTo({
      url: `${app.page.person_others}?uid=${this.data.answerDetail.uid}`
    })
  },

  /* 回答举报 */
  answerInform() {
    app.answerModel.answerInform(this.a_id).then(() => {
      app.qx.showToast({ title: '举报成功' })
    }, () => { app.qx.showToast({ title: '已举报过', icon: 'none' }) })
  }
})