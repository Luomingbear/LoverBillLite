// pages/mine/mine.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickname: "暂未登录",
      avatar: "../../image/logo.png",
      uid: "0000"
    },
    bindLoverText: "绑定对象",
    loginText: "立即登录",
    hasBudget: false
  },

  onShow: function() {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        //获取本地的数据
        if (res.data != null) {
          that.setData({
            userInfo: res.data,
            loginText: "退出登录",
          })
        }

        //先判断本地是否有恋人的数据,有的话直接使用，否则请求网络
        if (getApp().globalData.loverInfo == null) {
          //初始化数据
          mineInit(that);
        } else {
          that.setData({
            loverInfo: getApp().globalData.loverInfo
          })
        }

      },
      fail: function(res) {
        wx.showModal({
          title: '您暂未登录',
          confirmColor: "#ff7073",
          confirmText: "登录",
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login'
              })
            }
          }
        })
      }
    });

    wx.getStorage({
      key: 'budget',
      success: function(res) {
        that.setData({
          hasBudget: res.data > 0,
          budget: res.data
        })
      },
    })
  },

  /**
   * 绑定对象
   */
  bindTap: function(e) {
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
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
      },
      fail: function(res) {
        wx.showModal({
          title: '您当前暂未登录',
          content: '',
          confirmText: "登录",
          confirmColor: "#ff7073",
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login'
              })
            }
          }
        })
      }
    })
  },

  myTagTap: function() {
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
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
      },
      fail: function(res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  // 退出登录
  logoutTap: function(e) {
    var that = this;

    wx.getStorage({
      key: 'uid',
      success: function(res) {
        logout(that);
      },
      fail: function() {
        login(that);
      }
    })
  },

  budgetTap: function(e) {
    wx.navigateTo({
      url: '../setBudget/setBudget'
    })
  }
})

function logout(that) {
  wx.showModal({
    title: '确定退出登录吗？',
    confirmColor: "#ff7073",
    success: function(res) {
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
          },
          loginText: "立即登录",
          bindLoverText: "绑定对象",
          loverInfo: null,

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

/**
 * 初始化我界面数据
 */
function mineInit(that) {
  var util = require("../../utils/IUserService.js");
  util.mineInit(function(res) {
    showMineUi(res.data, that);
  });
}

/**
 * 显示ui
 */
function showMineUi(list, that) {
  if (list == null) {
    return;
  }

  if (list['lover'] != null) {
    //绑定了对象
    that.setData({
      userInfo: list['user'],
      loverInfo: list['lover'],
      bindLoverText: "更改绑定"
    });
    getApp().globalData.loverInfo = list['lover'];
  } else {
    that.setData({
      userInfo: list['user'],
      bindLoverText: "绑定对象"
    });
  }
}