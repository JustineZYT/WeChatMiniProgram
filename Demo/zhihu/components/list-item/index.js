import Util from '../../utils/util.js'
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemType: { // 列表项类型 1->无图，2->有图
      type: Number,
      value: 1
    },
    showFollowerInfo: { // 是否显示关注人动态
      type: Boolean,
      value: false
    },
    q_id: Number, // 问题id
    u_id: Number, // 回答者id
    avatar: { // 头像
      type: String,
      value: '/images/avatar_default.png',
      observer: function (newVal, oldVal) {
        if (!newVal) {
          this.setData({
            avatar: '/images/avatar_default.png'
          })
        }
      }
    },
    follower: { // 关注人
      type: String,
      value: '匿名',
      observer: function (newVal, oldVal) {
        if (!newVal) {
          this.setData({
            follower: '匿名'
          })
        }
      }
    },
    message: String, // 消息
    rtime: String, // 时间
    title: String, // 标题
    replier: { // 回答人
      type: String,
      value: '匿名',
      observer: function (newVal, oldVal) {
        if (!newVal) {
          this.setData({
            replier: '匿名'
          })
        }
      }
    },
    a_id: Number, // 回答id
    answer: String, // 回答
    imgSrc: String, // 图片路径
    followCount: { // 关注数
      type: Number,
      value: 0
    },
    answerCount: { // 回答数
      type: Number,
      value: 0
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
    /* 跳转至问题详情页 */
    _jumptoQuestionDetail() {
      let { q_id } = this.data
      if (!q_id) return
      app.qx.navigateTo({
        url: `${app.page.problem_detail}?q_id=${q_id}`
      }).then(() => {
        Util.saveSearchHistory({
          keyword: app.keyword
        })
      })
    },

    /* 跳转至回答详情页 */
    _jumptoAnswerDetail() {
      let { a_id, q_id } = this.data
      if (!a_id || !q_id) return
      app.qx.navigateTo({ url: `${app.page.answer_detail}?a_id=${a_id}&q_id=${q_id}` })
    },

    /* 跳转至用户个人中心页 */
    _jumptoUserCenter() {
      let { u_id } = this.data
      if (!u_id) return
      app.qx.navigateTo({
        url: `${app.page.person_others}?uid=${u_id}`
      })
    }
  }
})