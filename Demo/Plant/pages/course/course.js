// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    imgUrls: [
      "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
      "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
      "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    listCourse:['名师专栏','主题教学','芳疗考证','其他'],
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
  moreCourse:function(){
    console.log("123");
    wx.navigateTo({
      url: "/pages/course-list/course-list"
    });
  },
  goCourseDetail:function(){
    wx.navigateTo({
      url: "/pages/course-detail/course-detail"
    });
  }
})