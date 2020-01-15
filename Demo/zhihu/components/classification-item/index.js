const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag_id: Number, // 分类id
    imgSrc: String, // 图片路径
    title: String, // 分类标题
    problemCount: { // 分类问题总数
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    jumpPath: app.page.tag
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _imageError() {
      this.setData({
        imgSrc: '/images/error.png'
      })
    }
  }
})