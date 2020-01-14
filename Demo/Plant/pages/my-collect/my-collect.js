// pages/my-collect/my-collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listCollect:["课程","单方","配方"],
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