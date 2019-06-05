// pages/setBudget.js
var budget= 0.0;

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
  inputBudget: function (res) {
    budget = res.detail.value;
  },
  /**
   * 点击设置预算
   */
  setBudgetTap: function(e) {
    //todo 点击设置预算
  }

})