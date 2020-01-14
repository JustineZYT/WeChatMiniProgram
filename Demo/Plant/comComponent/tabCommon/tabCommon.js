// comComponent/tabCommon/tabCommon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      //这里定义了innerText属性,属性值可以在组件使用时指定
      tabList:Array,
      type:{
        value:0,
        type:Number
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex: 0, //当前选中的tab
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里是一个自定义方法
    tabDetail(e) {
      console.log(e.currentTarget.dataset.index);
      this.setData({
        tabIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('clickTab', e.currentTarget.dataset.index)
    },
  }
})
