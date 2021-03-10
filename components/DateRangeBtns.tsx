import { dateRangeOpts } from '@/lib/options'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Moment } from 'moment'
import React, { useEffect } from 'react'

interface DateRangeBtnsProps {
  onChange?: (v: [Moment, Moment]) => void
  value?: [Moment, Moment]
}

function DateRangeBtns({ onChange, value }: DateRangeBtnsProps) {
  const { dateRanges, toDateTime } = useTransfer()
  return (
    <HStack>
      {dateRangeOpts.map((t, i) => (
        <Button
          key={i}
          onClick={() => onChange(dateRanges[t.value])}
          borderRadius="sm"
          h="30px"
          colorScheme={
            value?.[0]?.unix() === dateRanges[t.value][0].unix() &&
            value?.[1]?.unix() === dateRanges[t.value][1].unix()
              ? 'orange'
              : 'teal'
          }
        >
          {t.label}
        </Button>
      ))}
    </HStack>
  )
}

export default DateRangeBtns
