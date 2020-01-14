//index.js
//获取应用实例
const app = getApp();

Page({
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
    height:0,
    menuItems: [],
    hiddenType:true,
    tabIndex: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },
 setContainerHeght:function(e){
   //image auto width
   var imgWidth=e.detail.width;
   //image auto height
  //  var imgHeight=e.detail.height;
  //time  get setting width
  var sysInfo= wx.getSystemInfoSync();
  console.log("sysInfo",sysInfo);

  //获取屏幕的宽度
  var screenWidth =sysInfo.screenWidth;

  var scale=screenWidth*scale;
  //  this.setData({
  //     height:imgHeight*scale
  //  })
 },

 tabTitle:function(e){
  // console.log(e);
  console.log(e.currentTarget.dataset.index);
  this.setData({
    tabIndex: e.currentTarget.dataset.index
  });
 },
 
 shareShow:function(){   
   this.setData({
    hiddenType:!this.data.hiddenType
  })
 },
 closeHidden:function(){
  this.setData({
    hiddenType:!this.data.hiddenType
  })
 },

 goSearch:function(){
  wx.navigateTo({
    url: "/pages/search/search"
  })
 },
 moreTutor:function(e){
   console.log(e);    
    // wx.switchTab({
    //   url: "/pages/tutor-list/tutor-list"
    // });
    wx.navigateTo({
      url: "/pages/tutor-list/tutor-list"
    })
 },

 goTutorDetail:function(){
    wx.navigateTo({
      url: "/pages/tutor/tutor"
    });
},
moreCourse:function(){
    wx.switchTab({
      url: "/pages/course/course"
    });
},
goBotany:function(){
  console.log("111");
  wx.navigateTo({
    url: "/pages/botany/botany"
  });
},
goBotanyDetail:function(){
  wx.navigateTo({
    url: "/pages/botany-detail/botany-detail"
  });
},
goSniff:function(){
  console.log("sniff");
  wx.navigateTo({
    url: "/pages/sniff/sniff"
  })
},
goSniffDetail:function(){
  console.log("sniffdetail");
  wx.navigateTo({
    url: "/pages/sniff-detail/sniff-detail"
  })
},
goMyNyr:function(){
  wx.navigateTo({
    url:'/pages/my-nyr/my-nyr'
  })
},
goCyclopediaDetail:function(){
  wx.navigateTo({
    url:'/pages/cyclopedia-detail/cyclopedia-detail'
  })
},
test0(){
  //todo 跳到有赞
  wx.navigateToMiniProgram({
    appId:'wx171c65dfb960c596',
  })
},
test1(){
  //todo 跳到有赞
},
test2(){
  //todo 跳到有赞
},



})
