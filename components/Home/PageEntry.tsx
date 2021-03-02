import { Accordion } from '@chakra-ui/accordion'
import { SimpleGrid, Stack } from '@chakra-ui/layout'
import React from 'react'
import {
  BiCalendarAlt,
  BiDollar,
  BiFootball,
  BiGift,
  BiLayer,
  BiLayerMinus,
  BiLayerPlus,
  BiLogIn,
  BiMoney,
  BiUser,
  BiUserPlus,
} from 'react-icons/bi'
import {
  HiOutlineLightningBolt,
  HiOutlineSearch,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import Dashboard from '../Dashboard'
import MyAccordionItem from './MyAccordionItem'
import PageSearchBar from './PageSearchBar'
import StatItem from './StatItem'

const PageEntry: React.FC = () => {
  return (
    <Dashboard>
      <PageSearchBar />
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <Stack spacing="3">
          <MyAccordionItem title="輸贏結果" icon={BiDollar}>
            <SimpleGrid spacing="4" columns={[1, 3, 4]}>
              <StatItem
                color="red"
                isSearch
                label="累計輸贏"
                num={-3142}
                icon={BiDollar}
              />
              <StatItem
                color="red"
                label="當日輸贏"
                num={-3142}
                icon={BiDollar}
              />
              <StatItem
                color="green"
                label="本週輸贏"
                num={312242}
                icon={BiDollar}
              />
              {/* <StatItem
              color="red"
              label="上週輸贏"
              num={312242}
              icon={BiDollar}
            /> */}
              <StatItem
                color="green"
                label="本月輸贏"
                num={12242}
                icon={BiDollar}
              />
              {/* <StatItem
              color="red"
              label="上月輸贏"
              num={312242}
              icon={BiDollar}
            /> */}
            </SimpleGrid>
          </MyAccordionItem>
          <SimpleGrid spacing="3" columns={[1, 2]}>
            <MyAccordionItem title="投注狀況" icon={BiFootball} flex="1">
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  isSearch
                  color="purple"
                  label="注單數量"
                  num={3142}
                  icon={HiOutlineLightningBolt}
                />
                <StatItem
                  isSearch
                  color="purple"
                  label="累計注額"
                  num={312242}
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
                  num={221}
                  icon={BiDollar}
                />
                <StatItem
                  isSearch
                  color="teal"
                  label="彩金派發"
                  num={221}
                  icon={BiDollar}
                />
              </SimpleGrid>
            </MyAccordionItem>
            <MyAccordionItem title="會員統計" icon={BiUser} flex="1">
              <SimpleGrid spacing="4" columns={[1, 2]}>
                <StatItem
                  color="orange"
                  label="總會員數"
                  num={312242}
                  icon={HiOutlineUserGroup}
                />
                <StatItem
                  isSearch
                  color="orange"
                  label="註冊人數"
                  num={312242}
                  icon={BiUserPlus}
                />
                <StatItem
                  isSearch
                  color="orange"
                  label="登入人數"
                  num={312242}
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
                  num={312242}
                  icon={BiLayerPlus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="首次充值(筆)"
                  num={3142}
                  icon={BiLayerPlus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="累計提領"
                  num={312242}
                  icon={BiLayerMinus}
                />
                <StatItem
                  isSearch
                  color="blue"
                  label="首次提領(筆)"
                  num={312242}
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
