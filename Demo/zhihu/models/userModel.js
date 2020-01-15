import { Security } from '../utils/security.js'

class UserModel extends Security {
  attentionUser(a_u_id, status) { // 关注或取关用户
    let url = '/user/attention'
    return this.security({ url: url, data: { a_u_id: a_u_id, status: status }, method: 'POST' })
  }

  getMyAttentionUserList({ user_id, page_index = 1, page_size = 99 }) { // 我关注的用户列表
    let url = '/user/attentionUserList'
    return this.security({ url: url, data: { user_id: user_id, page_index: page_index, page_size: page_size } })
  }

  getMyHomePage() { // 我的主态
    let url = '/user/myHomePage'
    return this.security({ url: url })
  }

  getOtherHomePage(user_id) { // 我的客态
    let url = '/user/otherHomePage'
    return this.security({ url: url, data: { user_id: user_id } })
  }

  getUserAttentionQuestionList({ user_id, page_index = 1, page_size = 99 }) { // 用户关注的问题列表
    let url = '/user/attentionQuestionList'
    return this.security({ url: url, data: { user_id: user_id, page_index: page_index, page_size: page_size } })
  }

  getFollowMeUserList({ user_id, page_index = 1, page_size = 99 }) { // 关注我的人列表
    let url = '/user/myFollow'
    return this.security({ url: url, data: { user_id: user_id, page_index: page_index, page_size: page_size } })
  }

  getUserAnswerList({ user_id, page_index = 1, page_size = 10 }) { // 用户的回答列表
    let url = '/user/myAnswers'
    return this.security({ url: url, data: { user_id: user_id, page_index: page_index, page_size: page_size } })
  }

  getUserQuestionList({ user_id, page_index = 1, page_size = 10 }) { // 用户提问列表
    let url = '/user/myQuestions'
    return this.security({ url: url, data: { user_id: user_id, page_index: page_index, page_size: page_size } })
  }

  getMyMessageList(query) { // 我的消息列表
    let url = '/user/message'
    return this.security({ url: url, data: query })
  }

  getFullUserInfo() { // 获取用户所有信息
    let url = '/user/getFullUserInfo'
    return this.security({ url: url })
  }

  authSetUserInfo(userInfo) { // 微信授权并保存用户信息
    let url = '/user/authSetUserInfo'
    let postData = {
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      gender: userInfo.gender,
      city: userInfo.city
    }
    return this.security({ url: url, data: postData, method: 'POST' })
  }

  changeUserInfo(userInfo) { // 修改用户信息
    let url = '/user/changeUserInfo'
    let postData = {}
    if (userInfo.avatar) Object.assign(postData, { avatar: userInfo.avatar })
    if (userInfo.nickname) Object.assign(postData, { nickname: userInfo.nickname })
    if (userInfo.desc) Object.assign(postData, { desc: userInfo.desc })
    if (userInfo.gender) Object.assign(postData, { gender: userInfo.gender })
    if (userInfo.area) Object.assign(postData, { area: userInfo.area })
    return this.security({ url: url, data: postData, method: 'POST' })
  }

  realNameAuth({ real_name, company, confirm_image }) { // 实名认证
    let url = '/user/confirm'
    let postData = { real_name: real_name, company: company, confirm_image: confirm_image }
    return this.security({ url: url, data: postData, method: 'POST' })
  }

  setMessageRead(m_id) { // 设置消息已读
    let url = '/user/setMessageRead'
    return this.security({ url: url, data: { m_id: m_id } })
  }

  sendSms(tel) { // 短信验证码发送
    let url = '/user/sendSms'
    return this.security({ url, data: { tel: tel }, method: 'POST' })
  }

  bindTel(tel, code) { // 用户手机号绑定
    let url = '/user/bindTel'
    return this.security({ url, data: { tel: tel, code: code }, method: 'POST' })
  }
}

export const userModel = new UserModel()