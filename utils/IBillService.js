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
    success: function(res) {
      var parse = JSON.parse(res.data);
      console.log(parse);
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
          that.setData({
            billList: parse.data
          });
        }

      } else {
        getApp().wxToast({
          title: parse.message
        })
      }

    },
    complete: function() {
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
    url: getApp().baseUrl + "api/getTagList2.php",
    success: function(res) {
      var parse = JSON.parse(res.data);
      if (parse.code == SUCCEED) {
        var list = [];
        var tags = parse.data.tag;
        for (var j = 0, len = tags.length; j < len; j++) {
          var item = {
            name: tags[j].name,
            image: tags[j].image,
            tid: tags[j].tid,
            selected: j == 0 ? true : false
          }
          list.push(item);
        }

        that.setData({
          tag: {
            tags: list
          },
          recommend: parse.data.note
        })
        typeof cb == 'function' && cb()
      }
    },
    complete: function() {
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
    success: function(res) {
      // console.log(res);
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
 * 获取今日的消费情况
 */
function getTodayCost(data, cb) {
  wx.request({
    method: "POST",
    dataType: "JSON",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: getApp().baseUrl + "api/getTodayCostDetail.php",
    data: data,
    success: function(res) {
      var parse = JSON.parse(res.data);
      console.log(parse);
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

module.exports = {
  getBillList: getBillList,
  getTags: getTags,
  createBill: createBill,
  deleteBill: deleteBill,
  analysis: analysis,
  getTodayCost: getTodayCost,
}