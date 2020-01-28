// pages/setBudget.js
var budget = 0.0;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 输入每月的预算
   */
  inputBudget: function(res) {
    budget = res.detail.value;
  },
  /**
   * 点击设置预算
   */
  setBudgetTap: function(e) {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        var data = {
          uid: res.data,
          budget: budget
        }

        var userUtil = require("../../utils/IUserService.js");
        var util = require("../../utils/util.js");

        userUtil.setBudget(data, that);
      },
      fail: function(res) {
        that.setData({
          billList: [],
          todayCost: "0.00"
        });
        wx.showModal({
          title: '是否前往登录',
          content: '',
          confirmColor: "#ff7073",
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    });
  }

})