// pages/bind/bind.js
var loverB;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputLover: function (res) {
    loverB = res.detail.value;
  },

  bindLover: function (res) {
    if (loverB == null || loverB == "") {
      getApp().wxToast({
        title: "请输入对方的ID"
      })
      return;
    }

    var util = require("../../utils/IUserService.js");
    var bindData = {
      loverA: wx.getStorageSync("uid"),
      loverB: loverB
    };

    wx.showModal({
      title: "绑定恋人",
      content: '确定要与ID为' + loverB + "的用户绑定吗？",
      confirmColor: "#ff7073",
      success: function (res) {
        if (res.confirm) {
          util.bindLover(bindData, function (res) {
            getApp().wxToast({
              title: "绑定成功"
            });
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
  },

})