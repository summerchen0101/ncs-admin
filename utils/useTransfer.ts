import moment from 'moment'
import numeral from 'numeral'
import { OptionsType } from '../lib/types'

const useTransfer = () => {
  const toDateTime = (unixTime: number) =>
    moment.unix(unixTime).format('YYYY-MM-DD HH:mm:ss')
  const toDate = (unixTime: number) =>
    moment.unix(unixTime).format('YYYY-MM-DD')
  const isBeforeDay = (unixTime: number) =>
    moment.unix(unixTime).isBefore(moment(), 'day')

  const toCurrency = (num: number) => numeral(num).format('0,0')

  const toDateRange = (rangeType: string) => {
    switch (rangeType) {
      case 'today':
        return {
          start: moment().startOf('day').unix(),
          end: moment().endOf('day').unix(),
        }
      case 'yesterday':
        return {
          start: moment().subtract(1, 'day').startOf('day').unix(),
          end: moment().subtract(1, 'day').endOf('day').unix(),
        }
      case 'thisWeek':
        return {
          start: moment().startOf('week').unix(),
          end: moment().endOf('week').unix(),
        }
      case 'lastWeek':
        return {
          start: moment().subtract(1, 'week').startOf('week').unix(),
          end: moment().subtract(1, 'week').endOf('week').unix(),
        }
      case 'thisMonth':
        return {
          start: moment().startOf('month').unix(),
          end: moment().endOf('month').unix(),
        }
      case 'lastMonth':
        return {
          start: moment().subtract(1, 'month').startOf('month').unix(),
          end: moment().subtract(1, 'month').endOf('month').unix(),
        }
    }
    return { start: 0, end: 0 }
  }

  const fileToDataUrl = async (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const toOptionName = function <T>(options: OptionsType<T>, code: T): string {
    return options.find((t) => t.value === code)?.label
  }

  return {
    toDate,
    toDateTime,
    isBeforeDay,
    toCurrency,
    toDateRange,
    fileToDataUrl,
    toOptionName,
  }
}

export default useTransfer
