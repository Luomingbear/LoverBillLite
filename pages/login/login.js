// pages/login/login.js
var email = "";
var password = "";
var hasGetUserInfo = false; //是否已经获取到了用户信息
var md5Util = require('../../utils/md5.js')
var emailUtil = require('../../utils/util.js')

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
      getApp().wxToast({
        title: '请输入邮箱'
      });
      return;
    } else if (password == null || password == "") {
      getApp().wxToast({
        title: '请输入密码'
      });
      return;
    }

    //判断是否是正确的邮箱地址
    if (!emailUtil.isEmail(email)) {
      getApp().wxToast({
        title: '请输入正确的邮箱地址'
      });
      return;
    }


    getApp().getUserInfo(function (res) {
      console.log(res);
      var iuserService = require("../../utils/IUserService.js");
      iuserService.emailLogin(email, password, res.avatarUrl, res.nickName, this);
    });
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
    //低版本兼容需要自行调用获取用户信息的接口
    if (wx.canIUse('button.open-type.getUserInfo')) {
      //版本较高，需要使用bindGetUserInfo方法
      return;
    }

    //判断用户是否曾经授权过
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              getApp().getUserInfo(function (res) {
                var util = require("../../utils/IUserService.js")
                var that = this
                if (res == null) {
                  return;
                } else {
                  hasGetUserInfo = true;
                }
                util.weixinLogin(res, that)
              });
            }
          })
        }
      }
    });    
  },

  /**
   * 高版本的获取用户信息，点击微信登录的时候执行
   */
  bindGetUserInfo: function (e) {
    if (e == null || hasGetUserInfo) {
      return;
    }
    var util = require("../../utils/IUserService.js")
    var that = this
    util.weixinLogin(e.detail.userInfo, that)
  }
})