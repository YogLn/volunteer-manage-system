import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATA_FORMAT = 'YYYY-MM-DD HH:mm:ss'
// 日期格式化函数
export function formatUtcString(utcString, dateFormat = DATA_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(dateFormat)
}
// vue指令快件格式化时间
export function registerTime(app) {
  app.config.globalProperties.$filter = {
    formatTime(value) {
      return formatUtcString(value)
    }
  }
}
