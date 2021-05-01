import { useDataContext } from '@/context/DataContext'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Stack, StackDivider, Text } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

function TableSummary({ children }: { children: ReactNode }) {
  return (
    <Stack
      bg="brand.800"
      borderRadius="4px"
      color="white"
      py="10px"
      px="15px"
      fontWeight="600"
      fontSize="15px"
      spacing={['10px', null, '20px']}
      direction={['column', null, 'row']}
      justify="flex-end"
      mb="8px"
      flexWrap="wrap"
      // divider={<StackDivider borderColor="brand.500" />}
    >
      {children}
    </Stack>
  )
}

export default TableSummary
