// pages/bill/bill.js
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList: [],
  },

  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        if (that.data.billList.length > 0) {
          console.log("不刷新");
          return;
        }
        var ibillService = require("../../utils/IBillService.js");
        ibillService.getBillList(res.data, 1, that);
      },
      fail: function (res) {
        wx.showModal({
          title: '是否前往登录',
          content: '',
          confirmColor: "#ff7073",
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var ibillService = require("../../utils/IBillService.js")
    var that = this;
    var uid = wx.getStorageSync("uid");
    page = 1;
    ibillService.getBillList(uid, 1, this);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        var ibillService = require("../../utils/IBillService.js");

        page++;
        ibillService.getBillList(res.data, page, that);
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转到记账界面
   */
  createBill: function () {
    var uid = wx.getStorage({
      key: 'uid',
      success: function (res) {
        wx.navigateTo({
          url: '../create/create',
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '是否前往登录',
          content: '',
          confirmColor: "#ff7073",
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    })

  },

  /**
   * 点击删除的按钮
   */
  onDeleteClick: function (res) {
    console.log("点击" + res);
    var data = {
      'bid': res.currentTarget.id,
      'uid': wx.getStorageSync("uid")
    };
    console.log(data);
    var that = this;
    wx.showModal({
      title: '确定删除该条记账吗？',
      content: '',
      confirmColor: '#ff7073',
      success: function (res) {
        if (res.confirm) {
          var ibillService = require("../../utils/IBillService.js");
          ibillService.deleteBill(data, function () {
            that.onPullDownRefresh();
          });
        }
      }
    })
  },
})