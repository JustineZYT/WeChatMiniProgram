// pages/oil/oil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  goOil:function(){
    // pages/oil-detail/oil-detail
    wx.navigateTo({
      url: '/pages/oil-detail/oil-detail'
    });
  }
})