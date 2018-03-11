
/**
 * 获取当前时间的格式化字符串
 * 2017-08-04 18:18:42
 */
function getCurFormatTime() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
}

/**
 * 获取当前时间的时分秒
 */
function getCurHMS() {
  var date = new Date()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return hour + ":" + minute + ":" + second
}

module.exports = {
  getCurFormatTime: getCurFormatTime,
  getCurHMS: getCurHMS,
}
