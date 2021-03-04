import { dateBtnsOpts } from '@/lib/options'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Moment } from 'moment'
import React from 'react'

interface DateRangeBtnsProps {
  onChange?: (v: [Moment, Moment]) => void
}

function DateRangeBtns({ onChange }: DateRangeBtnsProps) {
  const { dateRanges } = useTransfer()
  return (
    <HStack>
      {dateBtnsOpts.map((t, i) => (
        <Button
          key={i}
          onClick={() => onChange(dateRanges[t.value])}
          borderRadius="sm"
          h="30px"
          colorScheme="teal"
        >
          {t.label}
        </Button>
      ))}
    </HStack>
  )
}

export default DateRangeBtns
