const app = getApp()

Page({
  data: {
    user_id: -1,
    answerList: [],
    total: 0,
    page_index: 1,
    page_size: 10,
  },

  onLoad(options) {
    this.setData({ user_id: options.uid });
    this.getUserAnswerList(options.uid)
  },

  onShareAppMessage() {

  },

  onReachBottom() {
    this.getMoreAnswers();
  },

  /* 获取用户回答列表 */
  getUserAnswerList(user_id) {
    app.userModel.getUserAnswerList({ user_id })
    .then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        answerList: data,
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
    })
  },


  // 获取更多回答
  getMoreAnswers() {
    let { total, page_index, page_size, answerList, user_id } = this.data;
    if (answerList.length >= total) { return; }
    wx.showLoading();
    app.userModel.getUserAnswerList({
      user_id,
      page_index: page_index + 1,
      page_size,
    })
    .then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        answerList: answerList.concat(data),
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