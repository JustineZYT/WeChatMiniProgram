Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showWxAuth: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _wxAuthorize(e) {
      let { userInfo } = e.detail
      this.triggerEvent('wxAuthorize', userInfo)
    }
  }
})