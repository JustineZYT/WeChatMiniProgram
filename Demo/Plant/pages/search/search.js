// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      '全部',
      '名师专栏',
      '主题教学',
      '芳疗考证',
      '其他'
    ],
    tabIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  clickTab(e) {
    console.log(e);
    this.setData({
      tabIndex: e.detail
    });
  },
})