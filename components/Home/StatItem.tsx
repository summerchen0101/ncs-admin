import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Center, Flex, HStack } from '@chakra-ui/layout'
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/stat'
import React from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

interface StatItemProps {
  icon: IconType
  label: string
  num: number
  color: string
}

function StatItem({ label, icon, num, color }: StatItemProps) {
  const { toCurrency } = useTransfer()
  return (
    <Flex
      // borderRadius="md"
      alignItems="stretch"
      overflow="hidden"
      // borderColor={`${color}.100`}
      // borderWidth="1px"
      shadow="md"
      mb="5px"
      // flex="1"
      bg="white"
      minW="200px"
    >
      <Center p="20px" bg={`${color}.500`} color="white">
        <Icon as={icon} fontSize="37px" />
      </Center>
      <Center minW="120px">
        <Stat pr="15px" pl="10px">
          <StatLabel fontSize="md" color="gray.700">
            {label}
          </StatLabel>
          <StatNumber color={`${color}.500`}>{toCurrency(num)}</StatNumber>
          {/* <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText> */}
        </Stat>
      </Center>
    </Flex>
  )
}

export default StatItem
