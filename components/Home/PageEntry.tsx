import { Accordion } from '@chakra-ui/accordion'
import { SimpleGrid } from '@chakra-ui/layout'
import React from 'react'
import {
  BiDollar,
  BiLayerMinus,
  BiLayerPlus,
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
        <MyAccordionItem title="搜尋結果" icon={HiOutlineSearch}>
          <SimpleGrid spacing="4" columns={[1, 3, 4]}>
            {/* <StatItem
              color="blue"
              label="注單數量"
              num={3142}
              icon={HiOutlineLightningBolt}
            /> */}
            <StatItem
              color="purple"
              label="累計注額"
              num={312242}
              icon={HiOutlineLightningBolt}
            />
            <StatItem color="red" label="累計輸贏" num={3142} icon={BiDollar} />
            <StatItem
              color="blue"
              label="累計充值"
              num={312242}
              icon={BiLayerPlus}
            />
            <StatItem
              color="blue"
              label="累計出金"
              num={312242}
              icon={BiLayerMinus}
            />
          </SimpleGrid>
          {/* <Text fontSize="md" fontWeight="500" mb="2">
              會員活躍情況
            </Text> */}
        </MyAccordionItem>
        <MyAccordionItem mt="3" title="會員活躍情況" icon={BiUser}>
          <SimpleGrid spacing="4" columns={[1, 3, 4]}>
            <StatItem
              color="purple"
              label="首次下注(筆)"
              num={312242}
              icon={HiOutlineLightningBolt}
            />
            <StatItem
              color="blue"
              label="首次充值(筆)"
              num={3142}
              icon={BiLayerPlus}
            />
            {/* <StatItem
              color="green"
              label="首次提現(筆)"
              num={312242}
              icon={BiLayerMinus}
            /> */}
            <StatItem
              color="orange"
              label="註冊人數"
              num={312242}
              icon={BiUserPlus}
            />
            <StatItem
              color="orange"
              label="總會員數"
              num={312242}
              icon={HiOutlineUserGroup}
            />
            {/* <StatItem
              color="orange"
              label="登入人數"
              num={312242}
              icon={BiLogIn}
            /> */}
          </SimpleGrid>
        </MyAccordionItem>
        <MyAccordionItem mt="3" title="輸贏結果" icon={BiDollar}>
          <SimpleGrid spacing="4" columns={[1, 3, 4]}>
            <StatItem color="red" label="當日輸贏" num={3142} icon={BiDollar} />
            <StatItem
              color="green"
              label="本週輸贏"
              num={-312242}
              icon={BiDollar}
            />
            <StatItem
              color="red"
              label="上週輸贏"
              num={312242}
              icon={BiDollar}
            />
            <StatItem
              color="green"
              label="本月輸贏"
              num={-12242}
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
        <MyAccordionItem mt="3" title="優惠活動" icon={BiDollar}>
          <SimpleGrid spacing="4" columns={[1, 3, 4]}>
            <StatItem
              color="teal"
              label="優惠申請(筆)"
              num={221}
              icon={BiDollar}
            />
            <StatItem color="teal" label="彩金派發" num={221} icon={BiDollar} />
          </SimpleGrid>
        </MyAccordionItem>
      </Accordion>
    </Dashboard>
  )
}

export default PageEntry
