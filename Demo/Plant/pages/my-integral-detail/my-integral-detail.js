// pages/my-integral-detail/my-integral-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:['积分收入','积分支出'],
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
  tabData:function(e){
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
  },


})