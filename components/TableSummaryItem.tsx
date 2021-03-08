import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

interface TableSummaryItemProps {
  label: string
  num?: number
  decimal?: number
  children?: ReactNode
}
function TableSummaryItem({
  label,
  num,
  decimal = 2,
  children,
}: TableSummaryItemProps) {
  const { toCurrency } = useTransfer()
  return (
    <Text>
      {label}：
      {children || (
        <Text as="span" color="orange.400">
          {toCurrency(num, decimal)}
        </Text>
      )}
    </Text>
  )
}

export default TableSummaryItem
