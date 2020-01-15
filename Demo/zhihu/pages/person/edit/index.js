const app = getApp()

Page({
  data: {
    myDetail: {}
  },

  onShow() {
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

  /* 跳转至个人简介编辑页 */
  jumptoIntroEdit() {
    let { desc } = this.data.myDetail
    app.qx.navigateTo({ url: `${app.page.person_intro}?intro=${desc}` })
  }
})