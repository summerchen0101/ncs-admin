import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import React, { ReactNode, useMemo } from 'react'

interface ColorTextProps {
  children?: ReactNode
  num: number
}

function ColorText({ children, num }: ColorTextProps) {
  const { toCurrency } = useTransfer()
  const color = useMemo(() => {
    return num > 0 ? 'green.500' : num < 0 ? 'red.500' : undefined
  }, [num])
  return <Text color={color}>{children || toCurrency(num)}</Text>
}

export default ColorText
