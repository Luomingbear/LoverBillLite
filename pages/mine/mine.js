// pages/mine/mine.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: "",
      nickname: "点点",
      uid: "0000"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          that.setData({
            userInfo: res.data
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            userInfo: res.data
          })
        }
      },
    })

  },

  bindTap: function (e) {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {

          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          wx.navigateTo({
            url: '../bind/bind',
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  myTagTap: function () {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          wx.navigateTo({
            url: '../mytag/mytag',
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  // 退出登陆
  logoutTap: function (e) {
    var that = this;
    wx.showModal({
      title: '退出登陆',
      content: '确定退出登陆吗？点击确定将清除用户在本地保留的数据',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
          wx.showToast({
            title: '退出成功',
          })
          var that = this
          that.setData({
            userInfo: {
              avatar: "https://image.storyshu.com/storyshu_avatar.jpg",
              nickname: "点点",
              uid: "0000"
            }
          })
        }

      }
    })
    wx.navigateTo({
      url: '../setting/setting',
    })
  }
})