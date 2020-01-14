// pages/sniff-detail/sniff-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      {
        name:'兰爱菊精油',
        url:'../../images/default-04.png',
        href:''
      },
      {
        name:'波维尼花原精',
        url:'../../images/default-05.png',
        href:''
      },
      {
        name:'岩蔷薇精油',
        url:'../../images/default-01.png',
        href:''
      },
      {
        name:'波旁天葵精油',
        url:'../../images/default-02.png',
        href:''
      },
      {
        name:'茉莉原精',
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
  goOilDetail:function(){
    //var url=e.currentTarget.dataset.path;
    wx.navigateTo({
      url: '/pages/oil-detail/oil-detail'
    });
  }
})