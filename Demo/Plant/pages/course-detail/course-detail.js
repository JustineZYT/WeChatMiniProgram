// pages/course-detail/course-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listCourse:['介绍','课程','评论'],
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