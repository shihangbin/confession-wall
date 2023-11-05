import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const timeFormat = (
  time: any,
  myFormat: string = 'YYYY-MM-DD HH:mm',
  isUtf: boolean = true
) => {
  return dayjs(time).utc(isUtf).format(myFormat)
}
