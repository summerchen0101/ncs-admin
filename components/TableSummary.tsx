import { useDataContext } from '@/context/DataContext'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Stack, StackDivider, Text } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

function TableSummary({ children }: { children: ReactNode }) {
  const { betSummary } = useDataContext()
  const { toCurrency } = useTransfer()
  if (!betSummary) return <></>
  return (
    <Stack
      bg="gray.900"
      borderTopRadius="4px"
      color="white"
      py="10px"
      px="15px"
      fontWeight="600"
      fontSize="15px"
      spacing={['10px', null, '20px']}
      direction={['column', null, 'row']}
      justify="flex-end"
      borderBottomColor="#bbb8af"
      borderBottomWidth="1px"
      // divider={<StackDivider borderColor="teal.500" />}
    >
      {children}
    </Stack>
  )
}

export default TableSummary
