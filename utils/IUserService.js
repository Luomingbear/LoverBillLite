var SUCCEED = 200
var FAILED = 1000
var EMPTY = 700
var ERROR = 500

/***
 * 微信登录
 */
function weixinLogin(userInfo, that) {
  wx.login({
    success: function (res) {
      wx.request({
        url: getApp().baseUrl + 'api/weixinLogin.php',
        data: {
          code: res.code,
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          grant: 1
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        dataType: "JSON",
        success: function (res) {
          // {"session_key":"r97uXNiejogjb38Sqk601A==","expires_in":7200,"openid":"odezs0GNoeMm_T6mVCbfIVdHOkYw"}
          console.log(res.data)
          var parse = JSON.parse(res.data)
          wx.setStorage({
            key: 'dId',
            data: parse.data.userId,
          })
          var userInfo = {
            userId: parse.data.userId,
            nickname: parse.data.nickname,
            avatar: parse.data.avatar
          }
          wx.setStorage({
            key: 'userInfo',
            data: userInfo,
          })

          //关闭当前页面，返回
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  })
}
/**
 * 绑定对象
 */
function bindLover(data, cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/bindLover.php",
    data: data,
    success: function (res) {
      console.log(res);
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        typeof cb == 'function' && cb();
      } else {
        wx.showToast({
          title: parse.message,
        })
      }
    }
  });
}

/***
 * 获取用户信息
 */
function getIUserInfo() {

}


/**
 * 邮箱登录
 */
function emailLogin(email, password, avatar, nickname, that) {
  var md5Util = require("md5.js");
  var passwordMd5 = md5Util.hexMD5(password);

  wx.request({
    method: "POST",
    url: getApp().baseUrl + "api/registerOrLogin.php",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      email: email,
      password: passwordMd5,
      avatar: avatar,
      nickname: nickname,
    },
    // dataType: "JSON",
    success: function (res) {
      var result = JSON.parse(res.data);
      console.log(res.data);
      if (result.code == SUCCEED) {
        wx.setStorage({
          key: 'uid',
          data: result.data.uid,
        });

        wx.setStorageSync("userInfo", {
          nickname: nickname,
          avatar: avatar,
          uid: result.data.uid
        });
        //返回刚才的页面
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: result.message,
        });
      }
    }
  })
}

module.exports = {
  emailLogin: emailLogin,
  weixinLogin: weixinLogin,
  getIUserInfo: getIUserInfo,
  bindLover: bindLover,
}