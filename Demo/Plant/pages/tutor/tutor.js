// pages/tutor/tutor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfor:['介绍','课程'],
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
  goCourseDetail:function(){
    wx.navigateTo({
      url: "/pages/course-detail/course-detail"
    });
  }


})