const app = getApp()

Page({
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight - 190,
    myDetail: {},
    answerList: [],
    answerTotal: 0,
    questionList: [],
    questionTotal: 0,
    tabIndex: 0
  },

  onLoad(options) {
    this.getOtherHomePage(options.uid)
    this.getUserAnswerList(options.uid)
    this.getUserQuestionList(options.uid)
  },

  onShareAppMessage() {

  },

  // 切换标签
  tabChange(event) {
    this.setData({
      tabIndex: event.currentTarget.dataset.tabIndex
    });
  },

  // 滑动
  swiperChange(event) {
    this.setData({ tabIndex: event.detail.current });
  },

  /* 获取用户个人中心(客态) */
  getOtherHomePage(user_id) {
    app.userModel.getOtherHomePage(user_id).then(res => {
      this.setData({
        myDetail: res.data
      })
    })
  },

  /* 获取用户回答列表 */
  getUserAnswerList(user_id) {
    app.userModel.getUserAnswerList({ user_id: user_id }).then(res => {
      this.setData({
        answerList: res.data.data,
        answerTotal: res.data.total
      })
    })
  },

  /* 获取用户提问列表 */
  getUserQuestionList(user_id) {
    app.userModel.getUserQuestionList({ user_id: user_id }).then(res => {
      this.setData({
        questionList: res.data.data,
        questionTotal: res.data.total
      })
    })
  }
})