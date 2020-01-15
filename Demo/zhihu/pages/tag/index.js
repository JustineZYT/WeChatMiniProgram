const app = getApp()

Page({
  data: {
    tagQustionList: []
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getQuestionListByTagId(options.tag_id)
  },

  onShareAppMessage() {

  },

  /* 获取分类问题列表 */
  getQuestionListByTagId(tag_id) {
    app.indexModel.getQuestionListByTagId(tag_id).then(res => {
      this.setData({
        tagQustionList: res.data.data
      })
    })
  }
})