// pages/create.js 
var money = 0.0; //金额
var note = ""; //备注
var tid = 0; //标签id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: {
      twp: '750', // 总宽度(rpx)
      swp: '150', // 单个item宽度(rpx)
      row: 1,
      col: 1,
      lastClick: 0, //上一次选择的
      tags: [],
    },
    recommend: [],
    note: "",
    date: "", //时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    money = 0.0;
    note = "";
    tid = 0;
    var self = this
    var iBillService = require("../../utils/IBillService.js");
    iBillService.getTags(self, function() {
      self.setTags()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  setTags: function() {
    var winWidth = 750; // 屏幕宽度（rpx）
    var maxCol = 5; // 一页最大列数
    var tag = this.data.tag;
    var tags = tag.tags; // 数据
    var len = tags.length; // 数组长度
    var row, col; // 行、列
    if (tags.length <= maxCol) { // 小于等于一页最大列数
      row = 1; // 1行
      col = len; // 列数 = 数组长度
      tag.row = 1; // 赋值
      tag.col = col; // 赋值
      tag.twp = winWidth; // 容器总宽度 = 屏幕宽度
      tag.swp = winWidth / col; // 列宽
    } else { // 大于一页最大列数
      row = 2; // 2行
      col = Math.ceil(len / row); // 列数 = 向上取整(数组长度 / 行数):例如7、8都应该显示4列
      tag.row = row;
      tag.col = col;
      if (col <= maxCol) { // 列数小于等于一页最大列数
        tag.swp = winWidth / col; // 列宽 = 屏幕宽度 / 列数
        tag.twp = tag.swp * col; // 容器总宽度 = 列宽 *　列数
      } else { // 列数大于一页最大列数
        tag.swp = winWidth / maxCol;
        tag.twp = tag.swp * col;
      }
    }
    tag.lastClick = 0;
    this.setData({
      tag: tag
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  showHi: function(res) {
    getApp().wxToast({
      title: res
    })
  },

  /**
   * 标签的选择
   */
  selectItem: function(e) {
    var index = e.currentTarget.dataset.index;
    var tag = this.data.tag;
    var lastClick = tag.lastClick;
    if (index != lastClick) {
      console.log(tag.tags[lastClick]);
      tag.tags[lastClick]['selected'] = false
      tag.tags[index]['selected'] = true
      tag.lastClick = index
    }
    this.setData({
      tag: tag
    })
  },
  /**
   * 选择了推荐的备注消息
   */
  selectedNote: function(e) {
    // console.debug(e);
    note = e.currentTarget.id;
    this.setData({
      note: note
    });
  },
  /**
   * 输入金额
   */
  inputMoney: function(res) {
    money = res.detail.value;
  },

  /**
   * 输入备注
   */
  inputNote: function(res) {
    note = res.detail.value;
  },

  /**
   * 选择时间
   */
  bindDateChange: function(res) {
    console.log(res.detail.value);
    this.setData({
      date: res.detail.value
    })
  },

  /**
   * 记一笔
   */
  createBill: function(res) {
    if (money == 0) {
      getApp().wxToast({
        title: '请输入金额'
      });
      return;
    }

    var time = "";
    var util = require("../../utils/util.js");
    if (this.data.date == "") {
      time = util.getCurFormatTime();
    } else {
      time = this.data.date + " " + util.getCurHMS();
    }

    var tag = this.data.tag;
    var index = tag.lastClick;
    var data = {
      "uid": wx.getStorageSync("uid"),
      "cost": money,
      "time": time,
      "tag": tag.tags[index].tid,
      "note": note
    };

    var that = this;
    var ibillService = require("../../utils/IBillService.js");
    ibillService.createBill(data, function() {
      getApp().globalData.created = true;
      wx.setStorageSync("create", true);
      wx.switchTab({
        url: '../bill/bill',
      })
    });

  }
})