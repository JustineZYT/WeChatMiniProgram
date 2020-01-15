const app = getApp()

Page({
  data: {
    user_id: -1,
    questionList: [],
    total: 0,
    page_index: 1,
    page_size: 10,
  },

  onLoad(options) {
    this.setData({ user_id: options.uid });
    this.getUserQuestionList(options.uid);
  },

  onShareAppMessage() {

  },

  onReachBottom() {
    this.getMoreQuestions();
  },

  /* 获取我的提问列表 */
  getUserQuestionList(user_id) {
    app.userModel.getUserQuestionList({ user_id })
    .then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        questionList: data,
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
    })
  },

  // 获取更多提问
  getMoreQuestions() {
    let { total, page_index, page_size, questionList, user_id } = this.data;
    if (questionList.length >= total) { return; }
    wx.showLoading();
    app.userModel.getUserQuestionList({
      user_id,
      page_index: page_index + 1,
      page_size,
    })
    .then(res => {
      let { total, page_index, page_size, data } = res.data;
      this.setData({
        questionList: questionList.concat(data),
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