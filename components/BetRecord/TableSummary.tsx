import { useDataContext } from '@/context/DataContext'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Stack, StackDivider, Text } from '@chakra-ui/layout'
import React from 'react'
import ColorText from '../ColorText'

function TableSummary() {
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
      // divider={<StackDivider borderColor="teal.500" />}
    >
      <Text>下注金額： {toCurrency(betSummary.amount)}</Text>
      <Text>有效金額： {toCurrency(betSummary.valid_amount)}</Text>
      <Text>
        服務費： <ColorText num={betSummary.fee} />
      </Text>
      <Text>
        輸贏結果： <ColorText num={betSummary.result} />
      </Text>
    </Stack>
  )
}

export default TableSummary
