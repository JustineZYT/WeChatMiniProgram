import Util from '../../../utils/util.js';
import commonModel from '../../../models/common.js';
const regeneratorRuntime = require('../../../utils/runtime.js')
const app = getApp()

Page({
  data: {
    user_id: '',
    showAddContent: false,
    questionDetail: {},
    answerList: [],
    total: 0,
    page_index: 1,
    page_size: 10,
    q_id: '',
    isShowQRCode: false,
    isShowGoHome: false
  },

  async onLoad(options) {
    await Util.getFullUserInfo()
    let { id } = app.globalData.userInfo
    let scene = decodeURIComponent(options.scene)
    this.setData({
      user_id: id,
      q_id: options.q_id || scene,
    })
    this.getQuestionDetail(options.q_id || scene)
    this.getQuestionAnswerList(options.q_id || scene)
    const canvas = wx.createCanvasContext('qr-code');
    this.canvas = canvas;
    if (wx.getStorageSync('success-release-question')) {
      this.setData({
        isShowGoHome: true
      })
    }
  },

  onShareAppMessage() {

  },

  onReachBottom() {
    this.getMoreAnswers();
  },

  /* 获取问题详情 */
  getQuestionDetail(q_id) {
    app.questionModel.getQuestionDetail(q_id).then(res => {
      this.setData({
        questionDetail: res.data
      })
    })
  },

  /* 获取问题对应回答列表 */
  getQuestionAnswerList(q_id) {
    app.questionModel.getQuestionAnswerList(q_id, { page_size: 10, page_index: 1 })
    .then(res => {
      const { total, page_index, page_size, list } = res.data;
      this.setData({
        answerList: list,
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
    });
  },

  /* 展开描述 */
  showAddContent() {
    this.setData({
      showAddContent: true
    })
  },

  /* 收起描述 */
  hideAddContent() {
    this.setData({
      showAddContent: false
    })
  },

  /* 邀请回答 */
  inviteAnswer() {
    let { id } = this.data.questionDetail.question
    app.qx.navigateTo({ url: `${app.page.problem_invite}?q_id=${id}` })
  },

  /* 关注问题 */
  async attentionQuestion(e) {
    let isAuth = Util.checkIsAuthorized(e)
    if (isAuth == 0) return
    if (isAuth == 1) {
      await app.userModel.authSetUserInfo(e.detail.userInfo)
      app.globalData.userInfo.user_type = '1'
    }
    let { id, is_attention } = this.data.questionDetail.question
    app.questionModel.attentionQuestion(id).then(res => {
      this.setData({
        'questionDetail.question.is_attention': is_attention == 1 ? 0 : 1
      })
    })
  },

  /* 取消关注问题 */
  cancelAttentionQuestion() {
    let { id, is_attention } = this.data.questionDetail.question
    app.questionModel.attentionQuestion(id).then(res => {
      this.setData({
        'questionDetail.question.is_attention': is_attention == 1 ? 0 : 1
      })
    })
  },

  /* 跳转至回答页 */
  jumptoAnswerIndex() {
    let { id } = this.data.questionDetail.question
    app.qx.navigateTo({ url: `${app.page.answer_index}?q_id=${id}` })
  },

  /* 跳转至追加描述页 */
  jumptoProblemAppend() {
    let { id } = this.data.questionDetail.question
    app.qx.navigateTo({ url: `${app.page.problem_append}?q_id=${id}` })
  },

  /* 跳转至相似问题 */
  jumptoSimilarProblem() {
    let { r_q_id } = this.data.questionDetail.question
    app.qx.navigateTo({ url: `${app.page.problem_detail}?q_id=${r_q_id}` })
  },

  /* 跳转至首页 */
  jumptoHome() {
    app.qx.switchTab({ url: app.page.home })
  },

  createQrCode() {
    wx.showLoading();
    let question = this.data.questionDetail.question;
    commonModel.createQRCode({
      page: `${app.page.problem_detail}`.slice(1),
      scene: question.id,
      is_hyaline: true
    })
    .then(qrcodeUrl => {
      wx.downloadFile({
        url: qrcodeUrl,
        success: imgSuc => {
          let data = {
            title: question.title,
            desc: question.content.text,
            imgUrl: imgSuc.tempFilePath,
          };
          this.drawImage(data);
          this.canvas.draw(true);
          this.setData({ isShowQRCode: true });
          wx.hideLoading(); 
        },
        fail: err => {
          console.log('wx.downloadFile err:', err);
          wx.hideLoading();
          console.log(err);
        }
      });
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err);
    });
  },

  drawImage(data) {
    let ctx = this.canvas;
    let title = data.title;
    let content = data.desc || '';

    let canvasWidth = 300, canvasHeight = 300, padLeft = 10, padRight = 10;
    let questionTitleFontSize = 18, questionTitleTop = 30, questionTitleLineHeight = 22;
    let titleTextNumPerLine = (canvasWidth - padLeft - padRight) / questionTitleFontSize - 1;

    let descTextFontSize = 15, descTextLineHeight = 18, descToTitle = 10;   // 回答内容行高

    let imageToDesc = 30;

    let y = questionTitleTop;

    // 背景色设置为白色
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 写入title
    ctx.setFillStyle('#000000');
    ctx.setTextAlign('left');
    ctx.setFontSize(18);
    
    if (title.length > titleTextNumPerLine) {
      let firstline = title.slice(0, titleTextNumPerLine);
      ctx.fillText(firstline, padLeft, questionTitleTop);
      let secondLine = '';
      if (title.length > 2 * titleTextNumPerLine) {
        secondLine = title.slice(titleTextNumPerLine, 2 * titleTextNumPerLine) + '...';
      } else {
        secondLine = title.slice(titleTextNumPerLine);
      }
      y += questionTitleLineHeight;
      ctx.fillText(secondLine, padLeft, y);
    } else {
      ctx.fillText(title, padLeft, y);
    }
    y += questionTitleLineHeight;

    // 写入描述
    ctx.setFillStyle('#888888');
    ctx.setFontSize(15);
    
    y += descToTitle;
      
    // 回答的内容每行有多少个字数
    let descTextNumPerLine = (canvasWidth - padLeft - padRight) / descTextFontSize - 2;
    if (content.length > descTextNumPerLine) {
      let firstLine = content.slice(0, descTextNumPerLine);
      ctx.fillText(firstLine, padLeft, y);
      y += descTextLineHeight;
      let secondLine = '';
      if (content.length > 2 * descTextNumPerLine) {
        secondLine = content.slice(descTextNumPerLine, 2 * descTextNumPerLine);
        ctx.fillText(secondLine, padLeft, y);
        y += descTextLineHeight;
        let thirdLine = '';
        if (content.length > 3 * descTextNumPerLine) {
          thirdLine = content.slice(descTextNumPerLine * 2, 3 * descTextNumPerLine);
          ctx.fillText(thirdLine, padLeft, y);
          y += descTextLineHeight;
          let fourthLine = '';
          if (content.length > 4 * descTextNumPerLine) {
            fourthLine = content.slice(descTextNumPerLine * 3, 4 * descTextNumPerLine) + '...';
            ctx.fillText(fourthLine, padLeft, y);
            y += descTextLineHeight;
          } else {
            fourthLine = content.slice(descTextNumPerLine);
            ctx.fillText(fourthLine, padLeft, y);
            y += descTextLineHeight;
          }
        } else {
          thirdLine = content.slice(descTextNumPerLine);
          ctx.fillText(thirdLine, padLeft, y);
          y += descTextLineHeight;
        }
      } else {
        secondLine = content.slice(descTextNumPerLine);
        ctx.fillText(secondLine, padLeft, y);
        y += descTextLineHeight;
      }
    } else {
      ctx.fillText(content, padLeft, y);
      y += descTextLineHeight;
    }
    
    y += imageToDesc;
    ctx.drawImage(data.imgUrl, 100, y, 100, 100);
  },

  cancelSave() {
    this.setData({ isShowQRCode: false });
  },

  clickSave() {
    wx.getSetting({
      success: res => {
        console.log('res.authSetting:', res.authSetting);
        if (res.authSetting['scope.writePhotosAlbum']) {
          this.saveToAlbum();
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: response => {
              console.log('wx.authorize:scope.writePhotosAlbum success', response);
              this.saveToAlbum();
            },
            fail: err => {
              console.log('wx.authorize:scope.writePhotosAlbum err', err);
            }
          });
        }
      },
      fail(f) {
        console.log('wx.getSetting fail:', f);
        wx.showToast({
          icon: 'none',
          title: '保存失败 ' + f.errMsg,
        });
      },
    });
  },

  saveToAlbum() {
    wx.canvasToTempFilePath({
      canvasId: 'qr-code',
      quality: 1,
      success: suc => {
        console.log('wx.canvasToTempFilePath success:', suc);
        wx.saveImageToPhotosAlbum({
          filePath: suc.tempFilePath,
          success: res => {
            wx.showToast({ title: '保存成功' });
            console.log('wx.saveImageToPhotosAlbum success:', res.savedFilePath);
            this.setData({ savedFilePath: res.savedFilePath });
            setTimeout(() => {
              this.cancelSave();
            }, 500);
          },
          fail: err => {
            console.log('wx.saveImageToPhotosAlbum err:', err);
            wx.showToast({
              icon: 'none',
              title: '保存失败' + err.errMsg,
            });
          }
        });
      },
      fail(f) {
        console.log('wx.canvasToTempFilePath fail:', f);
      },
    });
  },

  // 获取更多回答
  getMoreAnswers() {
    let { total, page_index, page_size, answerList, q_id } = this.data;
    if (answerList.length >= total) { return; }
    wx.showLoading();
    app.questionModel.getQuestionAnswerList(q_id, {
      page_size,
      page_index: page_index + 1,
    })
    .then(res => {
      let { total, page_index, page_size, list } = res.data;
      this.setData({
        answerList: answerList.concat(list),
        total,
        page_size: parseInt(page_size, 10),
        page_index: parseInt(page_index, 10),
      });
      wx.hideLoading();
    })
    .catch(err => {
      wx.hideLoading();
    });
  },
})