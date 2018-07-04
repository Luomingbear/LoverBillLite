// pages/analysis/analysis.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var weekCanvas = null;
var monthCanvas = null;
var halfYearCanvas = null;
var windowWidth = 320;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUnlogin: true,
    monthCost: "0.00",
    difMonthCost: "0.00",
    mostList: [],
    loverList: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initCanvas();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        var util = require("../../utils/IBillService.js");
        var data = {
          uid: res.data
        };
        util.analysis(data, function (res) {
          console.log(res);
          that.setData({
            showUnlogin: false
          });
          showCostTitle(res.data.halfYear, that);
          showWeek(res.data.week, that);
          showMonth(res.data.month, that);
          showMostCost(res.data.most, that);
          showHalfYear(res.data.halfYear, that);
          showLover(res.data.halfYear, that);
        })
      },
      fail: function () {
        that.setData({
          showUnlogin: true,
          monthCost: "0.00",
          difMonthCost: "0.00",
          showWeek: false,
          showMonth: false,
          showMonthMost: false,
          showHalfYear: false,
          showLover: false
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  touchWeekHandler: function (e) {
    weekCanvas.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  touchMonthHandler: function (e) {
    console.log(monthCanvas.getCurrentDataIndex(e));

  },

  touchHalfYearHandler: function (e) {
    halfYearCanvas.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
})

function initCanvas() {
  //初始化画布大小
  try {
    var res = wx.getSystemInfoSync();
    windowWidth = res.windowWidth;
  } catch (e) {
    console.error('getSystemInfoSync failed!');
  }
}

/**
 * 显示顶部的标题栏的数据
 */
function showCostTitle(res, that) {
  if (res == null || res.length == 0) {

    return;
  }
  var curMonth = res[0];
  var curMonthCost = 0;
  var lastMonthCost = 0;

  for (var i = 0; i < curMonth.lover.length; i++) {
    curMonthCost += curMonth.lover[i].cost;
  }
  if (res.length > 1) {
    var lastMonth = res[1];
    for (var i = 0; i < lastMonth.lover.length; i++) {
      lastMonthCost += lastMonth.lover[i].cost;
    }

    //计算变化值
    lastMonthCost = curMonthCost - lastMonthCost;
    lastMonthCost = lastMonthCost.toFixed(2);
    that.setData({
      monthCost: "" + curMonthCost.toFixed(2),
      difMonthCost: lastMonthCost > 0 ? ("+" + lastMonthCost) : (lastMonthCost)
    });
  } else {
    that.setData({
      monthCost: "" + curMonthCost.toFixed(2),
      difMonthCost: "+" + curMonthCost.toFixed(2)
    });
  }
}

/**
 * 显示最近一周的消费
 */
function showWeek(res, that) {
  if (res == null) {
    that.setData({
      showWeek: false
    })

    return;
  } else {
    that.setData({
      showWeek: true
    })
  }

  var series = [{
    name: '总消费',
    color: "#ff7073",
    data: res.cost,
    format: function (val, name) {
      return val.toFixed(2) + '元';
    }
  }];

  if (weekCanvas == null) {

    weekCanvas = new wxCharts({
      canvasId: 'weekCanvas',
      type: 'line',
      animation: true,
      categories: res.days,
      series: series,
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '消费金额（元）',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: false,
      extra: {
        lineStyle: 'curve'
      }
    });
  } else {
    weekCanvas.updateData({
      categories: res.days,
      series: series
    });
  }

}

/**
 * 显示本月的消费
 */
function showMonth(res, that) {
  if (res == null || res.length == 0) {
    that.setData({
      showMonth: false
    })
    return;
  } else {
    that.setData({
      showMonth: true
    })
  }

  var series = new Array();
  for (var i = 0, len = res.length; i < len; i++) {
    var item = {
      color: "" + getColor(i),
      name: res[i].tag,
      data: res[i].cost
    }
    series.push(item);
  }

  if (monthCanvas == null) {
    monthCanvas = new wxCharts({
      canvasId: 'monthCanvas',
      type: 'pie',
      animation: true,
      series: series,
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  } else {
    monthCanvas.updateData({
      series: series,
    })
  }
}
/**
 * 获取颜色
 */
function getColor(index) {
  var colors = new Array(
    "#FF8A8D",
    "#FFBEC0",
    "#FFBE8A",
    "#FFDBBE",
    "#FF8ACF",
    "#FFA7DB",
    "#A62D30"
  )

  if (index < colors.length || index >= 0) {
    return colors[index];
  } else
    return colors[colors.length - 1];
}

/**
 * 显示本月消费排行
 */
function showMostCost(list, that) {
  if (list == null || list.length == 0) {
    that.setData({
      showMonthMost: false
    })
    return;
  }
  that.setData({
    mostList: list,
    showMonthMost: true
  });
}

/**
 * 显示最近半年的消费趋势
 */
function showHalfYear(res, that) {
  if (res == null || res.length == 0) {
    that.setData({
      showHalfYear: false
    })
    return;
  } else {
    that.setData({
      showHalfYear: true
    })
  }

  var labs = new Array();
  var list = new Array();
  for (var len = res.length - 1, i = len; i >= 0; i--) {
    var month = res[i];
    var cost = 0;
    for (var j = 0; j < month.lover.length; j++) {
      cost += month.lover[j].cost;
    }

    list.push(cost);
    labs.push(month.month);
  }

  var series = [{
    name: '总消费',
    color: "#ff7073",
    data: list,
    format: function (val, name) {
      return val.toFixed(2) + '元';
    }
  }]

  if (halfYearCanvas == null) {
    halfYearCanvas = new wxCharts({
      canvasId: 'halfYearCanvas',
      type: 'line',
      animation: true,
      categories: labs,
      series: series,
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '消费金额（元）',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  } else {
    halfYearCanvas.updateData({
      categories: labs,
      series: series,
    })
  }
}

/**
 * 显示恋人的消费情况
 */
function showLover(res, that) {
  console.log(res);
  if (res == null || res.length == 0) {
    that.setData({
      showLover: false
    })
    return;
  }


  var month = res[0];
  if (month.lover == null || month.lover.length <= 1) {
    //隐藏界面
    that.setData({
      showLover: false
    })
    return;
  }

  var lastMonth = res[1];

  var list = new Array();
  for (var i = 0; i < month.lover.length; i++) {
    var dif = month.lover[i].cost - lastMonth.lover[i].cost;
    dif = dif.toFixed(2);
    var item = {
      nickname: month.lover[i].nickname,
      cost: month.lover[i].cost.toFixed(2),
      difCost: dif > 0 ? ("+" + dif) : (dif)
    }

    list.push(item);
  }
  that.setData({
    loverList: list,
    showLover: true
  })
}