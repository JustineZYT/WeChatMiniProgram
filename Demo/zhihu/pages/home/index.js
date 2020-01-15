import Util from '../../utils/util.js'
const regeneratorRuntime = require('../../utils/runtime.js')
const app = getApp();



Page({
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight - 119 - 55,
    userType: '',
    hotList: [],
    hotTotal: 0,
    hotPageIndex: 1,
    hotPageSize: 10,

    attentionList: [],
    attentionTotal: 0,
    attentionPageIndex: 1,
    attentionPageSize: 10,

    latestList: [],
    latestTotal: 0,
    latestPageIndex: 1,
    latestPageSize: 10,

    tagList: [],
    tabIndex: 0,
  },

  onShow() {
    let is_auth = wx.getStorageSync('is_auth')
    if (is_auth) {
      wx.removeStorageSync('is_auth')
      this.onLoad()
    }
    if (wx.getStorageSync('success-release-question')) {
      this.setData({
        tabIndex: 2
      })
      wx.removeStorageSync('success-release-question')
    }
  },

  async onLoad() {
    await Util.getFullUserInfo()
    this.getHotList()
    this.getAttentionList()
    this.getLatestList()
    this.getTagList()
  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },

  /* 获取热门问题列表 */
  getHotList() {
    wx.showLoading({ title: '加载中...' });
    return app.indexModel.getHotList().then(res => {
      wx.hideLoading();
      let { data, total, page_index, page_size } = res.data;
      this.setData({
        hotList: data,
        hotTotal: total,
        hotPageSize: parseInt(page_size),
        hotPageIndex: parseInt(page_index),
        userType: res.data.user_type
      });
    });
  },

  /* 获取最新问题列表 */
  getLatestList() {
    wx.showLoading({ title: '加载中...' });
    return app.indexModel.getLatestList().then(res => {
      wx.hideLoading();
      let { data, total, page_index, page_size } = res.data;
      this.setData({
        latestList: data,
        latestTotal: total,
        latestPageSize: parseInt(page_size),
        latestPageIndex: parseInt(page_index)
      });
    })
  },

  /* 获取关注列表 */
  getAttentionList() {
    wx.showLoading({ title: '加载中...' });
    return app.indexModel.getAttentionList().then(res => {
      wx.hideLoading();
      let { data, total, page_index, page_size } = res.data;
      this.setData({
        attentionList: data,
        attentionTotal: total,
        attentionPageSize: parseInt(page_size),
        attentionPageIndex: parseInt(page_index)
      });
    })
  },

  /* 模拟首页关分类列表 */
  getTagList() {
    wx.showLoading({ title: '加载中...' });
    return app.indexModel.getTagList().then(res => {
      wx.hideLoading();
      this.setData({
        tagList: res.data
      })
    })
  },

  /* 跳转至搜索页 */
  jumptoSearch() {
    wx.navigateTo({
      url: app.page.search
    })
  },

  /* 微信授权 */
  async wxAuthorize(e) {
    let isAuth = Util.checkIsAuthorized(e)
    if (isAuth == 0) return
    if (isAuth == 1) {
      await app.userModel.authSetUserInfo(e.detail.userInfo)
      app.globalData.userInfo.user_type = '1'
      app.qx.navigateTo({ url: app.page.person_phoneBind })
      this.onLoad()
    }
  },

  // 切换标签
  tabChange(event) {
    this.setData({
      tabIndex: event.target.dataset.tabIndex
    });
  },

  // 滑动
  swiperChange(event) {
    let current = event.detail.current;
    const currentFunc = {
      0: this.getHotList,
      1: this.getAttentionList,
      2: this.getLatestList,
      3: this.getTagList
    };
    this.setData({ tabIndex: current });
    currentFunc[current]();
  },

  // 热门 滑动到底部
  hotBottom() {
    console.log('hot bottom');
    let { hotTotal, hotPageSize, hotPageIndex, hotList, userType } = this.data;
    if (hotList.length >= hotTotal || userType == "0") { return; }
    wx.showLoading();
    app.indexModel.getHotList({ page_index: hotPageIndex + 1, page_size: hotPageSize })
      .then(res => {
        let { data, total, page_index, page_size } = res.data;
        this.setData({
          hotList: hotList.concat(data),
          hotTotal: total,
          hotPageSize: parseInt(page_size),
          hotPageIndex: parseInt(page_index),
          userType: res.data.user_type
        });
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
      });
  },

  // 关注 滑动到底部
  attentionBottom() {
    console.log('attention bottom');
    let { attentionTotal, attentionPageSize, attentionPageIndex, attentionList, userType } = this.data;
    if (attentionList.length >= attentionTotal || userType == "0") { return; }
    wx.showLoading({ title: '加载中...' });
    app.indexModel.getAttentionList({
      page_index: attentionPageIndex + 1,
      page_size: attentionPageSize,
    })
      .then(res => {
        let { data, total, page_index, page_size } = res.data;
        this.setData({
          attentionList: attentionList.concat(data),
          attentionTotal: total,
          attentionPageSize: parseInt(page_size),
          attentionPageIndex: parseInt(page_index)
        });
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
      });
  },

  // 热门 滑动到底部
  latestBottom() {
    console.log('latest bottom');
    let { latestTotal, latestPageSize, latestPageIndex, latestList, userType } = this.data;
    if (latestList.length >= latestTotal || userType == "0") { return; }
    wx.showLoading({ title: '加载中...' });
    app.indexModel.getLatestList({
      page_index: latestPageIndex + 1,
      page_size: latestPageSize,
    })
      .then(res => {
        let { data, total, page_index, page_size } = res.data;
        this.setData({
          latestList: latestList.concat(data),
          latestTotal: total,
          latestPageSize: parseInt(page_size),
          latestPageIndex: parseInt(page_index)
        });
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
      });
  },
})