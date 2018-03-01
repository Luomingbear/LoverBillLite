// pages/login/login.js
var email = "";
var password = "";
var md5Util = require('../../utils/md5.js')
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

  dLogin: function (event) {
    if (email == null || email == "") {
      wx.showToast({
        title: '请输入邮箱',
        image: "../../image/warming.png"
      })
    } else if (password == null || password == "") {
      wx.showToast({
        title: '请输入密码',
        image: "../../image/warming.png"
      })
    }

    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var userinfo = res.userInfo;
        wx.setStorage({
          key: 'userInfo',
          data: {
            nickname: userinfo.nickName,
            avatar: userinfo.avatarUrl
          },
        })
        var iuserService = require("../../utils/IUserService.js");
        iuserService.emailLogin(email, password, userinfo.avatarUrl, userinfo.nickname, this);
      }
    })

  },

  emailInput: function (event) {
    email = event.detail.value
  },

  passwordInput: function (event) {
    password = event.detail.value
  },

  dRegister: function (e) {

  },

  /**
   * 微信登陆
   */
  weixinLoginTap: function () {
    wx.getUserInfo({
      success: function (res) {
        var util = require("../../utils/util.js")
        var that = this
        util.weixinLogin(res.userInfo, that)
      }
    })

  }
})