// pages/sniff/sniff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flowerList:[
      {
        name:'花香调',
        url:''
      },
      {
        name:'果香调',
        url:''
      },
      {
        name:'叶香调',
        url:''
      },
      {
        name:'木质调',
        url:''
      },
      {
        name:'树脂调',
        url:''
      },
      {
        name:'辛香调',
        url:''
      }
    ]
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
  goSniffDetail:function(){
    wx.navigateTo({
      url: "/pages/sniff-detail/sniff-detail"
    })
  }
})