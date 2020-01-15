import commonModel from '../../../models/common.js';
const regeneratorRuntime = require('../../../utils/runtime.js')
import Util from '../../../utils/util.js'
const app = getApp();

Page({

  data: {
    showWxAuth: false,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    containerHeight: wx.getSystemInfoSync().windowHeight,
    title: '',
    content_text: '',
    content_images: '',
    content_video: '',
    imageCount: 0,
    imageServerUrls: [],   // 上传到服务端后的图片地址数组
    medias: [],        // 图片、视频合集数组
    tags: '',
    is_anony: false,
    nextStepEnabled: false,
    contentHeight: wx.getSystemInfoSync().windowHeight,
  },

  async onShow() {
    await Util.getFullUserInfo()
    let { user_type } = app.globalData.userInfo
    if (user_type == '0') {
      this.setData({
        showWxAuth: true
      })
    } else {
      this.setData({
        showWxAuth: false
      });
    }
    let data = wx.getStorageSync('problem-index-data');
    let clearDataFlag = wx.getStorageSync('clear-problem-index-data');
    if (clearDataFlag) {
      this.resetData();
      wx.removeStorageSync('clear-problem-index-data');
    } else {
      if (data) {
        this.setData(data);
      }
    }
    this.setData({
      containerHeight: wx.getSystemInfoSync().windowHeight,
    });
    this.setTextAreaHeight(0);
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

  // 设置textarea的高度
  setTextAreaHeight(keyboardHeight) {
    const query = wx.createSelectorQuery();
    query.select('#input-title').boundingClientRect();
    if (!keyboardHeight) { keyboardHeight = 0; }
    let h = wx.getSystemInfoSync().windowHeight - keyboardHeight;
    query.select('#image-container').boundingClientRect();
    query.select('#bottom-container').boundingClientRect();
    h -= 40;
    query.exec(res => {
      res.forEach(r => h -= r.height);
      this.setData({ contentHeight: h });
    });
  },

  // 输入问题标题
  inputTitle(event) {
    let { value, cursor, keyCode } = event.detail;
    this.setData({
      title: value,
      nextStepEnabled: !!value,
    });
  },

  // 输入问题描述
  inputContent(event) {
    const { value, cursor, keyCode } = event.detail;
    this.setData({ content_text: value });
  },

  // 监听键盘弹出
  keyboardFocus(event) {
    let { value, height } = event.detail;
    this.setData({
      containerHeight: wx.getSystemInfoSync().windowHeight - (height > 0 ? height - 50: 0),
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
    this.setTextAreaHeight(20);
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
          imageCount: imageCount + res.tempFilePaths.length,
          medias: medias.concat(newMedias),
          nextStepEnabled: false,
        });
        this.setTextAreaHeight(0);
        wx.showLoading({ title: '上传中...' });
        let imgArr = res.tempFilePaths.map(path => commonModel.uploadFile(path));
        Promise.all(imgArr)
        .then(uploadRes => {
          let urls = imageServerUrls.concat(uploadRes);
          newMedias.forEach((m, ind) => m.serverUrl = uploadRes[ind]);
          this.setData({
            imageServerUrls: urls,
            content_images: urls.join(','),
            nextStepEnabled: true,
          });
          wx.hideLoading();
          this.setTextAreaHeight(0);
        })
        .catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败',
            icon: 'none',
          });
          this.setData({
            imageCount,
            medias,
            nextStepEnabled: true,
          });
          this.setTextAreaHeight(0);
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
          nextStepEnabled: false,
          medias: [...this.data.medias, newMediaPath],
        });
        wx.showLoading({ title: '上传中...' });
        this.setTextAreaHeight(0);
        commonModel.uploadFile(res.tempFilePath)
          .then(res => {
            this.setData({
              nextStepEnabled: true,
              content_video: res,
            });
            wx.hideLoading();
            this.setTextAreaHeight(0);
          })
          .catch(err => {
            console.log('uploadFile err:', res);
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            });
            let medias = [...this.data.medias];
            medias.shift();
            this.setData({
              medias,
              nextStepEnabled: true,
            });
            this.setTextAreaHeight(0);
          });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '选取失败',
        });
        this.setTextAreaHeight(0);
        this.setData({
          nextStepEnabled: true,
        });
      }
    });
  },

  // 删除图片或者视频
  deleteMediaItem(event) {
    let {item} = event.target.dataset;
    let { imageCount, medias } = this.data;
    let newMedias = [...medias];
    let ind = 0, media;
    for (let m of medias) {
      if(m.url === item.url) {
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
    this.setTextAreaHeight(0);
  },

  // 下一步
  nextStep() {
    if (!this.data.nextStepEnabled) { return; }
    let data = this.data;
    wx.setStorageSync('problem-index-data', this.data);
    wx.setStorageSync('problem-index-api-data', {
      title: data.title,
      content_text: data.content_text,
      content_images: data.content_images,
      content_video: data.content_video,
    });
    wx.navigateTo({
      url: app.page.problem_setting
    });
  },

  resetData() {
    let heigth = wx.getSystemInfoSync().windowHeight;
    this.setData({
      showWxAuth: false,
      windowHeight: heigth,
      containerHeight: heigth,
      title: '',
      content_text: '',
      content_images: '',
      content_video: '',
      imageCount: 0,        // 
      imageServerUrls: [],   // 上传到服务端后的图片地址数组
      medias: [],        // 图片、视频合集数组
      tags: '',
      is_anony: false,
      nextStepEnabled: false,
    });
  },

})