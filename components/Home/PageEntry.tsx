import Icon from '@chakra-ui/icon'
import {
  Box,
  Center,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import React from 'react'
import {
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineLightningBolt,
} from 'react-icons/hi'
import Dashboard from '../Dashboard'
import PageSearchBar from './PageSearchBar'
import StatItem from './StatItem'

const PageEntry: React.FC = () => {
  return (
    <Dashboard>
      <PageSearchBar />
      <Box p="3" border="1px" borderColor="gray.300">
        <Box>
          <Text fontSize="md" fontWeight="500" mb="2">
            搜尋結果
          </Text>
          <SimpleGrid spacing="4" columns={[1, 3, 5]}>
            <StatItem
              color="blue"
              label="注單數量"
              num={3142}
              icon={HiOutlineLightningBolt}
            />
            <StatItem
              color="purple"
              label="累計注額"
              num={312242}
              icon={HiOutlineCurrencyDollar}
            />
            <StatItem
              color="orange"
              label="累計輸贏"
              num={3142}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="red"
              label="累計儲值"
              num={312242}
              icon={HiOutlineCurrencyDollar}
            />
            <StatItem
              color="teal"
              label="累計出金"
              num={312242}
              icon={HiOutlineCurrencyDollar}
            />
          </SimpleGrid>
        </Box>
        <Box mt="3">
          <Text fontSize="md" fontWeight="500" mb="2">
            會員活躍情況
          </Text>
          <SimpleGrid spacing="4" columns={[1, 3, 5]}>
            <StatItem
              color="blue"
              label="首次充值(筆)"
              num={3142}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="purple"
              label="首次提現(筆)"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="orange"
              label="首次下注(筆)"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="red"
              label="註冊人數"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="teal"
              label="登入人數"
              num={312242}
              icon={HiOutlineCalendar}
            />
          </SimpleGrid>
        </Box>
        {/* <Divider borderColor="gray.300" my="8" /> */}
        <Box mt="12">
          <Text fontSize="md" fontWeight="500" mb="2">
            輸贏結果
          </Text>
          <SimpleGrid spacing="4" columns={[1, 3, 5]}>
            <StatItem
              color="blue"
              label="當日輸贏"
              num={3142}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="purple"
              label="本週輸贏"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="orange"
              label="上週輸贏"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="teal"
              label="本月輸贏"
              num={312242}
              icon={HiOutlineCalendar}
            />
            <StatItem
              color="red"
              label="上月輸贏"
              num={312242}
              icon={HiOutlineCalendar}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Dashboard>
  )
}

export default PageEntry
