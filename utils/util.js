//格式化创建时间
function formatCreateTime(time) {
  var date = new Date(time)
  var curTime = new Date()
  var diff = (curTime.getTime() - date.getTime()) / 1000

  if (diff <= 0) {
    return date.getMonth() + "月" + date.getDate() + "日，已过期"
  } else if (diff < 60 * 60) {
    return parseInt(diff / 60 + 0.5) + "分钟前"
  } else if (diff < 60 * 60 * 24) {
    return parseInt(diff / 60 / 60 + 0.5) + "小时前"
  } else if (diff < 60 * 60 * 24 * 7) {
    return parseInt(diff / 60 / 60 / 24 + 0.5) + "天前"
  } else {
    return (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "电" + date.getMinutes() + "分"
  }
  return diff
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime(date) {

}

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
*是否过期
*/
function isOutDate(time) {
  var destroyTime = new Date(time)
  var curTime = new Date()
  if (curTime.getTime() - destroyTime.getTime() >= 0) {
    return true
  } else return false
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
  formatTime: formatTime,
  formatCreateTime: formatCreateTime,
  getCurFormatTime: getCurFormatTime,
  isOutDate: isOutDate,
  getCurHMS: getCurHMS,
}
