import { useDataContext } from '@/context/DataContext'
import { Accordion } from '@chakra-ui/accordion'
import { SimpleGrid, Stack } from '@chakra-ui/layout'
import React, { useCallback } from 'react'
import {
  BiDollar,
  BiFootball,
  BiGift,
  BiLayer,
  BiLayerMinus,
  BiLayerPlus,
  BiLogIn,
  BiUser,
  BiUserPlus,
} from 'react-icons/bi'
import { HiOutlineLightningBolt, HiOutlineUserGroup } from 'react-icons/hi'
import Dashboard from '../Dashboard'
import MyAccordionItem from './MyAccordionItem'
import PageSearchBar from './PageSearchBar'
import StatItem from './StatItem'

const PageEntry: React.FC = () => {
  const { dashboardInfo } = useDataContext()
  const numToColor = useCallback((num: number) => {
    return num > 0 ? 'green' : num < 0 ? 'red' : 'gray'
  }, [])
  return (
    <Dashboard>
      <PageSearchBar />
      <Accordion
        defaultIndex={[0, 1, 2, 3, 4]}
        allowMultiple
        maxW="full"
        overflowX="auto"
      >
        <Stack spacing="3">
          <MyAccordionItem title="輸贏結果" icon={BiDollar}>
            <SimpleGrid spacing="4" columns={[1, 3, 4]}>
              <StatItem
                color={numToColor(dashboardInfo?.result)}
                isSearch
                label="累計輸贏"
                num={dashboardInfo?.result}
                icon={BiDollar}
                decimal={2}
              />
              <StatItem
                color={numToColor(dashboardInfo?.today_result)}
                label="當日輸贏"
                num={dashboardInfo?.today_result}
                icon={BiDollar}
                decimal={2}
              />
              <StatItem
                color={numToColor(dashboardInfo?.week_result)}
                label="本週輸贏"
                num={dashboardInfo?.week_result}
                icon={BiDollar}
                decimal={2}
              />
              <StatItem
                color={numToColor(dashboardInfo?.mon_result)}
                label="本月輸贏"
                num={dashboardInfo?.mon_result}
                icon={BiDollar}
                decimal={2}
              />
            </SimpleGrid>
          </MyAccordionItem>
          <SimpleGrid spacing="3" columns={[1, null, null, 2]}>
            <MyAccordionItem title="投注狀況" icon={BiFootball}>
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  isSearch
                  color="purple"
                  label="注單數量"
                  num={dashboardInfo?.bet_count}
                  icon={HiOutlineLightningBolt}
                />
                <StatItem
                  isSearch
                  color="purple"
                  label="累計注額"
                  num={dashboardInfo?.bet_sum}
                  icon={HiOutlineLightningBolt}
                />
              </SimpleGrid>
              {/* <Text fontSize="md" fontWeight="500" mb="2">
              會員活躍情況
            </Text> */}
            </MyAccordionItem>
            <MyAccordionItem title="優惠活動" icon={BiGift}>
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  isSearch
                  color="teal"
                  label="優惠申請(筆)"
                  num={dashboardInfo?.activity_count}
                  icon={BiDollar}
                />
                <StatItem
                  isSearch
                  color="teal"
                  label="彩金派發"
                  num={dashboardInfo?.activity_sum}
                  icon={BiDollar}
                />
              </SimpleGrid>
            </MyAccordionItem>
            <MyAccordionItem title="會員統計" icon={BiUser}>
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  color="orange"
                  label="總會員數"
                  num={dashboardInfo?.member_count}
                  icon={HiOutlineUserGroup}
                />
                <StatItem
                  isSearch
                  color="orange"
                  label="註冊人數"
                  num={dashboardInfo?.register_count}
                  icon={BiUserPlus}
                />
                <StatItem
                  isSearch
                  color="orange"
                  label="登入人數"
                  num={dashboardInfo?.login_count}
                  icon={BiLogIn}
                />
              </SimpleGrid>
            </MyAccordionItem>
            <MyAccordionItem title="充提累計" icon={BiLayer}>
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  isSearch
                  color="blue"
                  label="累計充值"
                  num={dashboardInfo?.deposit_sum}
                  icon={BiLayerPlus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="首次充值(筆)"
                  num={dashboardInfo?.first_deposit_count}
                  icon={BiLayerPlus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="累計提領"
                  num={dashboardInfo?.withdraw_sum}
                  icon={BiLayerMinus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="首次提領(筆)"
                  num={dashboardInfo?.first_withdraw_count}
                  icon={BiLayerMinus}
                />
              </SimpleGrid>
            </MyAccordionItem>
          </SimpleGrid>
        </Stack>
      </Accordion>
    </Dashboard>
  )
}

export default PageEntry
