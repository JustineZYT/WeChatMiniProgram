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
    topInfoType: { // 顶部栏类型 1->显示头像昵称 2->显示标题
      type: Number,
      value: 1
    },
    title: String, // 标题
    u_id: Number, // 用户id
    userType: String, // 用户身份状态
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
    nickName: { // 昵称
      type: String,
      value: '匿名',
      observer: function (newVal, oldVal) {
        if (!newVal) {
          this.setData({
            nickName: '匿名'
          })
        }
      }
    },
    a_id: Number, // 回答id
    q_id: Number, // 问题id
    answer: String, // 回答
    imgSrc: String, // 图片地址
    supportCount: { // 点赞数
      type: Number,
      value: 0
    },
    commentCount: { // 评论数
      type: Number,
      value: 0
    },
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