const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
/**
 *
 * @param {Long} timestamp
 * @returns
 */
function jstDate(timestamp = Date.now()) {
  return new Date(
    timestamp + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
}
/**
 *
 * @param {Date} date - 日付型
 * @param {String} format - フォーマット形式
 * @returns
 */
function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
}
export { sleep, jstDate, formatDate };
