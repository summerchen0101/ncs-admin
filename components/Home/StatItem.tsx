import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Center, Flex, HStack, Text } from '@chakra-ui/layout'
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/stat'
import React, { ReactNode } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

interface StatItemProps {
  icon: IconType
  label: ReactNode
  num: number
  color: string
  isSearch?: boolean
}

function StatItem({ label, icon, num, color, isSearch }: StatItemProps) {
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
            {isSearch ? (
              <HStack>
                <Text>{label}</Text>
                <Icon color="gray.400" as={BiSearch} fontSize="20px" />
              </HStack>
            ) : (
              label
            )}
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
