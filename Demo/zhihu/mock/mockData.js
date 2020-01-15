import Mock from 'mock.js';
const analogData = require('analogData.js');

export default class MockData {
  constructor() {
    let self = this;
  }

  /* 模拟首页问题列表 */
  getProblemList() {
    let self = this;
    let data = Mock.mock({
      'problems|10-100': [{
        'id|+1': 1,
        'title|1': analogData.title,
        'replier|1': analogData.replier,
        'answer|1': analogData.answer,
        'answerCount|1-100': 100,
        'followCount|1-100': 100
      }]
    });
    return self.mockApi(data, 2000);
  }

  /* 模拟首页关注列表 */
  getFollowList() {
    let self = this;
    let data = Mock.mock({
      'follows|10-100': [{
        'id|+1': 1,
        'title|1': analogData.title,
        'replier|1': analogData.replier,
        'answer|1': analogData.answer,
        'answerCount|1-100': 100,
        'followCount|1-100': 100,
        'avatar|1': analogData.image,
        'imgSrc|1': analogData.image,
        'follower|1': analogData.replier,
        'message|1': analogData.message,
        'time|1': analogData.time
      }]
    });
    return self.mockApi(data, 2000);
  }

  /* 模拟首页关分类列表 */
  getClassifyList() {
    let self = this;
    let data = Mock.mock({
      'classifyList|10-100': [{
        'id|+1': 1,
        'title|1': analogData.classifyTitle,
        'imgSrc|1': analogData.image,
        'problemCount|100-200': 200
      }]
    });
    return self.mockApi(data, 2000);
  }

  /* 模拟API真实请求 */
  mockApi(data, delayTime, code, msg) {
    let result = {
      data: {
        code: code || 200,
        msg: msg || '请求成功!',
        data: data || {}
      },
      errMsg: 'request:ok',
      header: {
        'Content-Type': 'text/html; charset=utf-8',
        'Date': new Date()
      },
      statusCode: 200
    };
    switch (result.data.code) {
      case 200:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(result);
          }, delayTime || 1000);
        });
        break;
      case 500:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Object.assign(result.data, {
              msg: '请求失败！',
              data: null
            });
            reject(result);
          }, delayTime || 1000);
        });
        break;
      default:
        return new Promise((resolve, reject) => {
          reject('未识别的code！');
        });
    }
  }
}