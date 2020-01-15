import MockData from '/mock/mockData.js'
const mockData = new MockData()
import { config } from 'config.js'
import { indexModel } from '/models/indexModel.js'
import { questionModel } from '/models/questionModel.js'
import { searchModel } from '/models/searchModel.js'
import { userModel } from '/models/userModel.js'
import { answerModel } from '/models/answerModel.js'
import commonModel from '/models/common.js'
import Util from '/utils/util.js'

App({
  onLaunch() {
    this.qx = Util.promisic()
  },
  onHide() {
    wx.removeStorageSync('token')
  },
  globalData: {
    userInfo: null
  },
  mockData: mockData,
  page: config.page,
  indexModel: indexModel,
  questionModel: questionModel,
  userModel: userModel,
  searchModel: searchModel,
  answerModel: answerModel,
  commonModel: commonModel
})