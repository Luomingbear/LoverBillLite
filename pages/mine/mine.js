// pages/mine/mine.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: "../../image/logo.png",
      nickname: "暂未登录",
      uid: "0000"
    },
    loginText: "立即登录"
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
            userInfo: res.data,
            loginText: "退出登录"
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

  // 退出登录
  logoutTap: function (e) {
    var that = this;

    wx.getStorage({
      key: 'uid',
      success: function (res) {
        logout(that);
      },
      fail: function () {
        login(that);
      }
    })
  }
})

function logout(that) {
  wx.showModal({
    title: '退出登录',
    confirmColor: "#ff7073",
    content: '确定退出登录吗？点击确定将清除用户在本地保留的数据',
    success: function (res) {
      if (res.confirm) {
        wx.clearStorage()

        getApp().wxToast({
          title: '退出成功'
        });

        that.setData({
          userInfo: {
            avatar: "../../image/logo.png",
            nickname: "暂未登录",
            uid: "0000"
          }
        })
      }

    }
  })
}

function login(that) {
  wx.navigateTo({
    url: '../login/login',
  })
}