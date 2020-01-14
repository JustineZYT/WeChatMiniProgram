// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    listData:[
      {
        name:"收藏",
        img:"../../images/icon/icon-d-sc.png",
        url:"/pages/my-collect/my-collect",
        type:"tab"
      },
      {
        name:"足迹",
        img:"../../images/mine/icon-m-zj.png",
        url:"/pages/my-spoor/my-spoor",
        type:"tab"
      },
      {
        name:"已购商品",
        img:"../../images/mine/icon-m-shopping.png",
        url:"/pages/my-shopping/my-shopping",
        type:"list"
      },
      {
        name:"我的课程",
        img:"../../images/mine/icon-m-kc.png",
        url:"/pages/my-course/my-course"
      }
    ],
    arrData:[
      {
        name:"芳香百科",
        img:"../../images/mine/icon-m-qs.png",
        url:"/pages/my-nyr/my-nyr"
      },
      {
        name:"每日海报",
        img:"../../images/mine/icon-m-hb.png",
        url:"/pages/my-poster/my-poster"
      },
      {
        name:"意见反馈",
        img:"../../images/mine/icon-m-fk.png",
        url:"/pages/bussback/bussback"
      },
      {
        name:"联系客服",
        img:"../../images/mine/icon-m-tel.png",
        url:""
      },
      {
        name:"关于我们",
        img:"../../images/mine/icon-m-us.png",
        url:"/pages/my-about/my-about"
      }
    ],
    signType:'0',
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
  //我的积分
  goMyIntegral:function(){
    wx.navigateTo({
      url:"/pages/my-integral/my-integral"
    })
  },
  goInterface:function(e){
    var url=e.currentTarget.dataset.path;
    wx.navigateTo({
      url: url
    });
  },
  goOtherInterface:function(e){
    var url=e.currentTarget.dataset.path;
    wx.navigateTo({
      url: url
    });
  },
  goSign:function(e){
    this.setData({
      signType:e.currentTarget.dataset.type
    })
  },
  goMessage:function(){
    wx.navigateTo({
      url: '/pages/my-message/my-message'
    });
  }

})