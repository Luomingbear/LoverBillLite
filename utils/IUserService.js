var SUCCEED = 200
var FAILED = 1000
var EMPTY = 700
var ERROR = 500

/***
 * 微信登录
 */
function weixinLogin(userInfo, cb) {
  wxLogin(userInfo, function(res) {
    if (res == null || res.data == null || res.data == "") {
      return;
    }
    var parse = JSON.parse(res.data)
    console.log(parse);
    if (parse.code == SUCCEED) {
      wx.setStorage({
        key: 'uid',
        data: parse.data.uid,
      });

      wx.setStorageSync("userInfo", {
        nickname: parse.data.nickname,
        avatar: parse.data.avatar,
        uid: parse.data.uid
      });

      //返回刚才的页面
      wx.navigateBack({
        delta: 1
      })
    } else {
      getApp().wxToast({
        title: parse.message
      })
    }
  });
}

/**
 * 将用户的信息上传到服务器换取openId等 注册
 */
function wxLogin(userInfo, cb) {
  if (userInfo == null) {
    return;
  }

  console.debug(userInfo);
  wx.login({
    success: function(res) {
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
        success: function(e) {
          typeof cb == 'function' && cb(e);
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
    success: function(res) {
      console.log(res);
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        typeof cb == 'function' && cb();
      } else {
        getApp().wxToast({
          title: parse.message
        })
      }
    }
  });
}

/***
 * 我的页面的初始化
 */
function mineInit(cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/mineInit.php",
    data: {
      uid: wx.getStorageSync("uid")
    },
    success: function(res) {
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        typeof cb == 'function' && cb(parse);
      } else {
        getApp().wxToast({
          title: parse.message
        })
      }
    }
  });
}


/**
 * 邮箱登录
 */
function emailLogin(email, password, avatar, nickname, that) {
  var md5Util = require("md5.js");
  var passwordMd5 = md5Util.hexMD5(password);

  var data = {
    email: email,
    password: passwordMd5,
    avatar: avatar,
    nickname: nickname,
  };
  console.log(data);
  wx.request({
    method: "POST",
    url: getApp().baseUrl + "api/registerOrLogin.php",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: function(res) {
      if (res.data == null || res.data == "")
        return;

      var result = JSON.parse(res.data);
      console.log(result);
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
        getApp().wxToast({
          title: result.message
        })
      }
    }
  })
}

function setBudget(data, that) {
  wx.request({
    method: "POST",
    url: getApp().baseUrl + "api/setBudget.php",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: function(res) {
      if (res.data == null || res.data == "")
        return;

      var result = JSON.parse(res.data);
      console.log(result);
      if (result.code == SUCCEED) {
        //返回刚才的页面
        wx.navigateBack({
          delta: 1
        })

      } else {
        getApp().wxToast({
          title: result.message
        })
      }
    }
  })
}

module.exports = {
  emailLogin: emailLogin,
  weixinLogin: weixinLogin,
  mineInit: mineInit,
  bindLover: bindLover,
  setBudget: setBudget
}