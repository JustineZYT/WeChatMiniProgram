import commonModel from '../../../models/common.js'
const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    showWxAuth: false,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    containerHeight: '',
    content_text: '',
    content_images: '',
    content_video: '',
    imageCount: 0,
    imageServerUrls: [],   // 上传到服务端后的图片地址数组
    medias: [],        // 图片、视频合集数组
    submitEnabled: false,
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { user_type } = app.globalData.userInfo
    if (user_type == '0') {
      this.setData({
        showWxAuth: true
      })
    }
    this.q_id = options.q_id;
    this.setData({
      containerHeight: wx.getSystemInfoSync().windowHeight,
    })
  },

  onShareAppMessage() {

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

  // 输入问题描述
  inputContent(event) {
    let { value, cursor, keyCode } = event.detail;
    this.setData({
      submitEnabled: !!value,
      content_text: value
    });
  },

  // 设置textarea的高度
  setTextAreaHeight(keyboardHeight) {
    const query = wx.createSelectorQuery();
    if (!keyboardHeight) { keyboardHeight = 0; }
    let h = wx.getSystemInfoSync().windowHeight - keyboardHeight;
    query.select('#image-container2').boundingClientRect();
    query.select('#bottom-container2').boundingClientRect();
    h = h -  40;
    query.exec(res => {
      res.forEach(r => h -= r.height);
      this.setData({ contentHeight: h });
    });
  },

  // 监听键盘弹出
  keyboardFocus(event) {
    let { value, height } = event.detail;
    this.setData({
      containerHeight: wx.getSystemInfoSync().windowHeight - (height > 0 ? height : 0),
    });
    if (typeof height === 'number') {
      height -= 10;
    }
    this.setTextAreaHeight(height || 0);
  },

  // 监听键盘隐藏
  keyboardBlur(event) {
    const { value, height } = event.detail;
    this.setData({
      containerHeight: wx.getSystemInfoSync().windowHeight,
    });
    this.setTextAreaHeight();
  },

  // 点击选择文件图标 选择文件
  chooseImage() {
    let { imageCount, imageServerUrls, medias } = this.data;
    if (imageCount >= 9) { return; }

    wx.chooseImage({
      count: 9 - imageCount,
      success: res => {
        let now = Date.now() + '';
        let newMedias = res.tempFilePaths.map((url, index) => ({ id: now + index, url, type: 'image' }));
        this.setData({
          submitEnabled: false,
          imageCount: imageCount + res.tempFilePaths.length,
          medias: medias.concat(newMedias),
        });
        this.setTextAreaHeight();
        wx.showLoading({ title: '上传中...' });
        let imgArr = res.tempFilePaths.map(path => commonModel.uploadFile(path));
        Promise.all(imgArr)
          .then(uploadRes => {
            let urls = imageServerUrls.concat(uploadRes);
            newMedias.forEach((m, ind) => m.serverUrl = uploadRes[ind]);
            this.setData({
              imageServerUrls: urls,
              content_images: urls.join(','),
              submitEnabled: true,
            });
            this.setTextAreaHeight();
            wx.hideLoading();
          })
          .catch(err => {
            wx.hideLoading();
            wx.showToast({
              title: '上传失败',
              icon: 'none',
            });
            this.setTextAreaHeight();
            this.setData({
              submitEnabled: true,
              imageCount,
              medias,
            });
          });
      },
    })
  },

  // 选取视频
  chooseVideo() {
    if (this.data.content_video) { return; }
    wx.chooseVideo({
      maxDuration: 10,
      success: res => {
        let now = Date.now() + '';
        let newMediaPath = { id: now, url: res.tempFilePath, type: 'video' };
        this.setData({
          submitEnabled: false,
          medias: [...this.data.medias, newMediaPath],
        });
        this.setTextAreaHeight();
        wx.showLoading({ title: '上传中...' });
        this.setTextAreaHeight(0, true);
        commonModel.uploadFile(res.tempFilePath)
          .then(res => {
            this.setTextAreaHeight();
            this.setData({ submitEnabled: true, content_video: res });
            wx.hideLoading();
          })
          .catch(err => {
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            });
            this.setTextAreaHeight();
            let medias = [...this.data.medias];
            medias.shift();
            this.setData({
              medias,
              submitEnabled: true,
            });
          });
      },
      fail: err => {
        this.setTextAreaHeight();
        wx.showToast({
          icon: 'none',
          title: '选取失败',
        });
        this.setData({ submitEnabled: true,});
      }
    });
  },

  // 删除图片或者视频
  deleteMediaItem(event) {
    let { item } = event.target.dataset;
    let { imageCount, medias } = this.data;
    let newMedias = [...medias];
    let ind = 0, media;
    for (let m of medias) {
      if (m.url === item.url) {
        media = m;
        break;
      }
      ind++;
    }
    newMedias.splice(ind, 1);
    let data = { medias: newMedias };
    if (item.type === 'image') {
      data.imageCount = this.data.imageCount - 1;
      let imageServerUrls = [...this.data.imageServerUrls];
      imageServerUrls.splice(imageServerUrls.indexOf(media.serverUrl), 1);
      data.imageServerUrls = imageServerUrls;
      data.content_images = imageServerUrls.join(',');
    } else if (item.type === 'video') {
      data.content_video = '';
    }
    this.setData(data);
    this.setTextAreaHeight();
  },

  /* 回答提交 */
  async answerSubmit(e) {
    if (!this.data.submitEnabled) return
    let { formId } = e.detail
    let { content_text, content_images, content_video } = this.data
    let postData = {
      qid: this.q_id,
      content_text,
      content_images,
      content_video
    }
    app.qx.showLoading({ title: '正在提交...' })
    await app.answerModel.answerAdd(postData)
    await app.qx.hideLoading()
    await app.qx.showToast({ title: '提交成功' })
    app.qx.navigateTo({
      url: `${app.page.problem_detail}?q_id=${this.q_id}`
    }).then(() => {
      app.commonModel.writeForm(formId)
    })
  }
})