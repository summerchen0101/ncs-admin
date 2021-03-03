import moment from 'moment'
import numeral from 'numeral'
import { useCallback } from 'react'
import { OptionType } from '../types'

const useTransfer = () => {
  const toDateTime = (unixTime: number) =>
    unixTime ? moment(unixTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
  const toShortDateTime = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD HH:mm')
  const toDate = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD')
  const isBeforeDay = (unixTime: number) =>
    moment(unixTime * 1000).isBefore(moment(), 'day')

  const toCurrency = (num: number, decimal = 2) =>
    numeral(num).format(
      decimal ? `0,0.${Array(decimal).fill('0').join('')}` : '0,0',
    )

  const toEventId = (id: number) => numeral(id).format('0000000')

  const toDateRange = useCallback((rangeType: string) => {
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
  }, [])

  const fileToDataUrl = useCallback(async (file: Blob): Promise<string> => {
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
  }, [])

  const toOptionName = function (
    options: OptionType[],
    code: number | string,
  ): string {
    return options.find((t) => t.value === code)?.label
  }

  return {
    toDate,
    toDateTime,
    toShortDateTime,
    isBeforeDay,
    toCurrency,
    toDateRange,
    fileToDataUrl,
    toOptionName,
    toEventId,
  }
}

export default useTransfer
