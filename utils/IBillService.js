var SUCCEED = 200
var FAILED = 1000
var EMPTY = 700
var ERROR = 500

/**
 * 获取用户的账单列表
 */
function getBillList(uid, page, that) {

  wx.showLoading({
    title: '正在加载',
  })
  wx.request({
    method: "POST",
    url: getApp().baseUrl + "api/getBillList.php",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      uid: uid,
      page: page
    },
    success: function (res) {
      // console.log(res.data);
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        if (page != 1) {
          //加载更多
          console.log("加载更多")
          var list = that.data.billList;
          list = list.concat(parse.data);
          that.setData({
            billList: list
          });
        } else {
          //刷新
          console.log("刷新")
          that.setData({
            billList: parse.data
          });
        }

      } else {
        wx.showToast({
          title: parse.message,
        })
      }

    },
    complete: function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })

}

function getTags(that, cb) {
  wx.request({
    method: "GET",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/getTagList.php",
    success: function (res) {
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        var list = [];
        for (var j = 0, len = parse.data.length; j < len; j++) {
          var item = {
            name: parse.data[j].name,
            image: parse.data[j].image,
            tid: parse.data[j].tid,
            selected: j == 0 ? true : false
          }
          list.push(item);
        }

        that.setData({
          tag: {
            tags: list
          }
        })
        typeof cb == 'function' && cb()
      }
    },
    complete: function () {
      wx.hideLoading();
    }
  })
}

/**
 * 创建账单
 */
function createBill(data, cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/addBill.php",
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

/**
 * 删除账单
 */
function deleteBill(data, cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/deleteBill.php",
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

/**
 * 分析
 */
function analysis(data, cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/analysis.php",
    data: data,
    success: function (res) {
      // console.log(res);
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        typeof cb == 'function' && cb(parse);
      } else {
        wx.showToast({
          title: parse.message,
        })
      }
    }
  });
}

module.exports = {
  getBillList: getBillList,
  getTags: getTags,
  createBill: createBill,
  deleteBill: deleteBill,
  analysis: analysis,
}