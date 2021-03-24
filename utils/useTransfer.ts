import { DateRangeType } from '@/lib/enums'
import moment, { Moment } from 'moment'
import numeral from 'numeral'
import { useCallback, useMemo } from 'react'
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
  const toPercent = (num: number) => `${numeral(num).multiply(100).value()} %`

  const toEventId = (id: number) => numeral(id).format('0000000')

  const dateRanges = useMemo<Record<DateRangeType, [Moment, Moment]>>(() => {
    return {
      [DateRangeType.Today]: [moment().startOf('day'), moment().endOf('day')],
      [DateRangeType.Yesterday]: [
        moment().subtract(1, 'day').startOf('day'),
        moment().subtract(1, 'day').endOf('day'),
      ],
      [DateRangeType.Tomorrow]: [
        moment().add(1, 'day').startOf('day'),
        moment().add(1, 'day').endOf('day'),
      ],
      [DateRangeType.ThisWeek]: [
        moment().startOf('week'),
        moment().endOf('week'),
      ],
      [DateRangeType.LastWeek]: [
        moment().subtract(1, 'week').startOf('week'),
        moment().subtract(1, 'week').endOf('week'),
      ],
      [DateRangeType.ThisMonth]: [
        moment().startOf('month'),
        moment().endOf('month'),
      ],
      [DateRangeType.LastMonth]: [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month'),
      ],
    }
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
    dateRanges,
    fileToDataUrl,
    toOptionName,
    toEventId,
    toPercent,
  }
}

export default useTransfer
