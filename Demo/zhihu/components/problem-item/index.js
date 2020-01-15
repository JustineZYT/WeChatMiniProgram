const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemType: { // 列表项类型 1->提问，2->关注的问题
      type: Number,
      value: 1
    },
    q_id: Number, // 问题id
    followCount: { // 关注数
      type: Number,
      value: 0
    },
    answerCount: { // 回答数
      type: Number,
      value: 0
    },
    title: String, // 标题
    rtime: String // 时间
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
    /* 跳转至问题详情页 */
    _jumptoQuestionDetail() {
      let { q_id } = this.data
      if (!q_id) return
      app.qx.navigateTo({ url: `${app.page.problem_detail}?q_id=${q_id}` })
    }
  }
})