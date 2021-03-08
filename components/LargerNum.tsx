import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import React from 'react'

function LargerNum({ num, ...props }: { num: number }, ref) {
  const { toCurrency } = useTransfer()
  return (
    <Text
      color="red.500"
      as="a"
      fontSize="17px"
      fontWeight="600"
      ref={ref}
      {...props}
    >
      {toCurrency(num, 0)}
    </Text>
  )
}

export default React.forwardRef(LargerNum)
