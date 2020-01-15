const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images: { // 图片
      type: Array,
      value: []
    },
    video: String // 视频
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
    /* 预览图片 */
    _previewImage(e) {
      let { csrc } = e.target.dataset
      wx.previewImage({
        current: csrc,
        urls: this.data.images
      })
    },

    // 点击播放 全屏
    startPlay() {
      console.log('startPlay this.videoContext:', this.videoContext);
      if (!this.videoContext) {
        this.videoContext = wx.createVideoContext('problem-detail-video', this);
      }
      this.videoContext.requestFullScreen();
    }
  }
})