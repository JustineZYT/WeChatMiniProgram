const app = getApp()

Page({
  data: {
    messageList: [],
    total: 0,
    page_index: 1,
    page_size: 10,
  },

  onShow() {
    this.getMyMessageList()
  },

  onShareAppMessage() {

  },

  onReachBottom() {
    this.getMoreMessages();
  },

  /* 获取我的消息列表 */
  getMyMessageList() {
    app.userModel.getMyMessageList().then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        messageList: data,
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
    })
  },

  /* 跳转至消息详情页 */
  jumptoMessageDetail(e) {
    let { mid, read, uid, qid, aid, mtype } = e.currentTarget.dataset
    app.qx.navigateTo({ url: this.handleMessageJumpPage(uid, qid, aid, mtype) })
      .then(() => {
        if (read == "0") {
          app.userModel.setMessageRead(mid)
        }
      })
  },

  /* 处理消息跳转至哪个页面 */
  handleMessageJumpPage(uid, qid, aid, mtype) {
    const jumpUrl = {
      '0': `${app.page.problem_detail}?q_id=${qid}`,
      '1': `${app.page.person_others}?uid=${uid}`,
      '2': `${app.page.answer_detail}?a_id=${aid}&q_id=${qid}`,
      '3': `${app.page.answer_detail}?a_id=${aid}&q_id=${qid}`,
      '4': `${app.page.answer_detail}?a_id=${aid}&q_id=${qid}`
    }
    return jumpUrl[mtype]
  },

  // 获取更多消息
  getMoreMessages() {
    let { total, page_index, page_size, messageList } = this.data;
    if (messageList.length >= total) { return; }
    wx.showLoading();
    app.userModel.getMyMessageList({
      page_index: page_index + 1,
      page_size,
    })
    .then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        messageList: messageList.concat(data),
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
      wx.hideLoading();
    })
    .catch(err => {
      wx.hideLoading();
    });
  }
})