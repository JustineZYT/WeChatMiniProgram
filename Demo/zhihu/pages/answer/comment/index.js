const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    showWxAuth: false,
    commentList: [],
    total: 0,
    page_index: 1,
    page_size: 10,
    comment: '',
    a_id: '',
    inputToBottom: 0,
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { user_type } = app.globalData.userInfo
    if (user_type == '0') {
      this.setData({
        showWxAuth: true
      })
    }
    this.a_id = options.a_id;
    this.setData({ a_id: options.a_id });
    this.getAnswerCommentList(options.a_id);
  },

  onShareAppMessage() {

  },

  onReachBottom() {
    this.getMoreComments();
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

  /* 获取回答评论列表 */
  getAnswerCommentList(a_id) {
    app.answerModel.getAnswerCommentList({ a_id: a_id }).then(res => {
      let { total, page_index, page_size } = res.data;
      this.setData({
        commentList: res.data.list,
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
    });
  },

  /* 回答添加评论 */
  answerCommentAdd(e) {
    if (app.globalData.userInfo.is_ban == '1') {
      return app.qx.showToast({ title: '已被禁言，不能评论！', icon: 'none' })
    }
    let { content } = e.detail.value
    let commentData = {
      aid: this.a_id,
      content: content
    }
    if (content.indexOf('@') > -1 && this.r_uid) {
      Object.assign(commentData, { r_uid: this.r_uid })
    }
    if (commentData.content.startsWith('@')) {
      try {
        commentData.content = commentData.content.split(' ')[1]
      } catch (e) {
        console.warn(e)
      }
    }
    app.answerModel.answerCommentAdd(commentData).then(() => {
      this.getAnswerCommentList(this.a_id)
      app.qx.showToast({ title: '评论成功' })
      this.setData({
        comment: ''
      })
    })
  },

  /* 评论回复 */
  commentReply(e) {
    let { uid, nickname } = e.currentTarget.dataset
    if (!nickname) nickname = '@匿名 '
    else nickname = `@${nickname} `
    this.r_uid = uid
    this.setData({
      comment: nickname
    })
  },

  // 加载更多评论
  getMoreComments() {
    let { total, page_index, page_size, commentList, a_id } = this.data;
    if (commentList.length >= total) { return; }
    wx.showLoading();
    app.answerModel.getAnswerCommentList({
      a_id,
      page_size,
      page_index: page_index + 1,
    })
    .then(res => {
      let { total, page_index, page_size, list } = res.data;
      this.setData({
        commentList: commentList.concat(list),
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
      wx.hideLoading();
    })
    .catch(err => {
      wx.hideLoading();
    });
  },

  inputFocus(event) {
    console.log('inputFocus event:', event);
    this.setData({ inputToBottom: 12 });
  },

  inputBlur(event) {
    console.log('inputBlur event:', event);
    this.setData({ inputToBottom: 0 });
  },
})