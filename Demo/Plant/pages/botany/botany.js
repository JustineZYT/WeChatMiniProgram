// pages/botany/botany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      listData:[
        {
          name:'柏科',
          url:'../../images/default-01.png',
          href:''
        },
        {
          name:'松科',
          url:'../../images/default-02.png',
          href:''
        },
        {
          name:'橄榄科',
          url:'../../images/default-03.png',
          href:''
        },
        {
          name:'樟科',
          url:'../../images/default-04.png',
          href:''
        },
        {
          name:'桃金娘科',
          url:'../../images/default-05.png',
          href:''
        },
        {
          name:'菊科',
          url:'../../images/default-01.png',
          href:''
        },
        {
          name:'唇形科',
          url:'../../images/default-02.png',
          href:''
        },
        {
          name:'伞形科',
          url:'../../images/default-03.png',
          href:''
        },
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
  goBotanyDetail:function(){
    wx.navigateTo({
      url: "/pages/botany-detail/botany-detail"
    });
  }
})