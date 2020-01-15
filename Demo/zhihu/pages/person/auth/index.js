import Util from '../../../utils/util.js'
const regeneratorRuntime = require('../../../utils/runtime.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    image_preview: ''
  },

  onLoad(options) {
    this.getFullUserInfo()
  },

  onShareAppMessage: function () {

  },

  /* 获取用户所有信息 */
  getFullUserInfo() {
    app.userModel.getFullUserInfo().then(res => {
      this.setData({ userInfo: res.data })
      if (res.data.confirm_status == "2") {
        this.setData({
          image_preview: res.data.confirm_image
        })
      }
    })
  },

  /* 上传营业执照 */
  uploadConfirmImage() {
    let { user_type } = this.data.userInfo
    if (user_type == '2') return
    app.qx.chooseImage({ count: 1 }).then(res => {
      let filePath = res.tempFilePaths[0]
      app.qx.showLoading({ title: '正在上传中...' })
      app.commonModel.uploadFile(filePath).then(res => {
        this.setData({
          image_preview: res
        })
        app.qx.hideLoading().then(() => {
          app.qx.showToast({ title: '上传成功' })
        })
      })
    })
  },

  /* 更新用户所有信息 */
  updateFullUserInfo() {
    return app.userModel.getFullUserInfo().then(res => {
      app.globalData.userInfo = res.data
      this.setData({ userInfo: res.data })
    })
  },

  /* 提交实名认证 */
  async realNameAuth(e) {
    let { real_name, company } = e.detail.value
    let { image_preview } = this.data
    if (!real_name) return app.qx.showToast({ title: '请填写你的姓名', icon:'none' })
    if (!company) return app.qx.showToast({ title: '请填写你所在的公司', icon: 'none' })
    if (!image_preview) return app.qx.showToast({ title: '请上传名片/营业执照', icon: 'none' })
    let postData = {
      real_name: real_name,
      company: company,
      confirm_image: image_preview
    }
    app.qx.showLoading({ title: '正在提交...' })
    await app.userModel.realNameAuth(postData)
    await this.updateFullUserInfo()
    await app.qx.hideLoading()
    app.qx.showToast({ title: '提交成功' })
  }
})