import commonModel from '../../../models/common.js';
import { problemModel } from '../../../models/problemModel.js';
import Util from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    tags: [],
    choosedTagIds: [],
    is_anony: false,         // 是否匿名

  },

  onLoad(options) {
    commonModel.getTags()
      .then(res => {
        console.log('tags:', res);
        this.setData({ tags: res.data || [] });
      })
  },

  // 选择/取消选择 分类
  toggleChooseTag(event) {
    const { tagIndex, tagId } = event.target.dataset;
    let choosedTagIds = [...this.data.choosedTagIds];
    let tags = [...this.data.tags];
    if (choosedTagIds.includes(tagId)) {
      tags[tagIndex].active = false;
      choosedTagIds.splice(choosedTagIds.indexOf(tagId), 1);
      this.setData({ choosedTagIds, tags });
    } else {
      if (choosedTagIds.length >= 3) {
        wx.showToast({
          icon: 'none',
          title: '最多只能选择三个分类',
          duration: 500
        });
      } else {
        tags[tagIndex].active = true;
        choosedTagIds.push(tagId);
        this.setData({ choosedTagIds, tags });
      }
    }
  },

  // 是否匿名
  toggleAnony(event) {
    let { user_type } = app.globalData.userInfo;
    if (user_type != '2') {
      Util.showModal({
        content: '完成实名认证可匿名提问',
        confirmText: '前往认证',
        cancelText: '取消'
      }).then(() => {
        app.qx.navigateTo({ url: app.page.person_auth });
      });
      return this.setData({ is_anony: false });
    }
    this.setData({ is_anony: event.detail.value });
  },

  submit(e) {
    let { formId } = e.detail
    let { choosedTagIds, is_anony } = this.data;
    if (choosedTagIds.length == 0) {
      return app.qx.showToast({ title: '必须选择问题分类', icon: 'none' })
    }
    let data = wx.getStorageSync('problem-index-api-data');
    data.tags = choosedTagIds.join(',');
    data.is_anony = is_anony ? '1' : '0';
    app.qx.showLoading({ title: '正在发布...' });
    problemModel.createQuestion(data)
      .then(res => {
        app.qx.hideLoading().then(() => {
          app.qx.showToast({ title: '发布成功' }).then(() => {
            wx.removeStorageSync('problem-index-data');
            wx.removeStorageSync('problem-index-api-data');
            wx.setStorageSync('clear-problem-index-data', true);
            wx.setStorageSync('success-release-question', true);
            app.qx.reLaunch({ url: `${app.page.problem_detail}?q_id=${res.data.q_id}` }).then(() => {
              commonModel.writeForm(formId)
            })
          });
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
})