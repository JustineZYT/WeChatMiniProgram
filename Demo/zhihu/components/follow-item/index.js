import Util from '../../utils/util.js'
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actionType: { // 操作类型：1->关注,2->邀请
      type: Number,
      value: 1
    },
    itemStatus: { // 关注人状态：0->未关注,1->已关注,2->互相关注;0->未邀请,1->已邀请
      type: Number,
      value: 0
    },
    userId: Number, // 用户ID
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
    userType: { // 用户类型：0->未授权,1->已授权,2->已实名认证
      type: String,
      value: '0'
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
    /* 跳转至个人中心页面 */
    _jumptoUserCenter() {
      app.qx.navigateTo({
        url: `${app.page.person_others}?uid=${this.data.userId}`
      }).then(() => {
        let { actionType } = this.data
        actionType == 1 && Util.saveSearchHistory({ searchType: '2', keyword: app.keyword })
      })
    },

    /* 关注用户 */
    _attentionUser() {
      let { userId, itemStatus } = this.data
      if (itemStatus == 0) {
        itemStatus = 1
      } else {
        itemStatus = 0
      }
      app.userModel.attentionUser(userId, itemStatus).then(res => {
        this.setData({
          itemStatus: res.data.status
        })
      })
    },

    /* 邀请回答问题 */
    _questionInvite() {
      let { userId, itemStatus } = this.data
      if (itemStatus == 0) {
        itemStatus = 1
      } else {
        itemStatus = 0
      }
      app.questionModel.questionInvite(app.qid, userId).then(() => {
        this.setData({
          itemStatus: itemStatus
        })
      })
    }
  }
})