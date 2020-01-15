const app = getApp()

Page({
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight,
    containerHeight: wx.getSystemInfoSync().windowHeight + 50,
    intro: ''
  },

  onLoad(options) {
    this.setData({
      intro: options.intro
    })
  },

  onShareAppMessage() {

  },

  // 监听键盘弹出
  keyboardFocus(event) {
    const { value, height } = event.detail;
    this.setData({
      containerHeight: this.data.windowHeight - (height || 0) + 50
    });
  },

  // 监听键盘隐藏
  keyboardBlur(event) {
    const { value, height } = event.detail;
    this.setData({
      containerHeight: this.data.windowHeight
    });
  },

  /* 个人简介修改 */
  introEdit(e) {
    let { intro } = e.detail.value
    if (!intro) {
      app.qx.showToast({ title: '请输入个人简介', icon: 'none' })
      return
    }
    if (intro.length > 20) {
      app.qx.showToast({ title: '个人简介不能超过20个字', icon: 'none' })
      return
    }
    app.userModel.changeUserInfo({ desc: intro }).then(() => {
      app.qx.showToast({ title: '保存成功' }).then(() => {
        app.qx.navigateBack()
      })
    })
  }
})