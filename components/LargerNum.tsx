import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import React from 'react'

function LargerNum({ num }: { num: number }) {
  const { toCurrency } = useTransfer()
  return (
    <Text color="red.500" as="a" fontSize="17px" fontWeight="600">
      {toCurrency(num, 0)}
    </Text>
  )
}

export default LargerNum
