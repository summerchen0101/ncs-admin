import BasicTable from '@/components/BasicTable'
import { useOptionsContext } from '@/context/OptionsContext'
import menu from '@/lib/menu'
import { MemberReport } from '@/types/api/MemberReport'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import ColorText from '../ColorText'
import TipIconButton from '../TipIconButton'

function TableData({ list }: { list: MemberReport[] }) {
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const [affiliateLevelOpts] = useOptionsContext().affiliateLevel
  console.log(affiliateLevelOpts)
  const router = useRouter()
  const columns: ColumnsType<MemberReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => {
          if (row.child_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.affiliate.pages.report.path,
                  query: { pid: row.id },
                }}
              >
                <Text color="brand.500" textDecor="underline" as="a">
                  {row.acc}[{row.name}]
                </Text>
              </Link>
            )
          }
          return `${row.acc}[${row.name}]`
        },
      },
      {
        title: '等級',
        render: (_, row) =>
          toOptionName(affiliateLevelOpts, row.promo_level) || '-',
      },
      {
        title: '手续费％',
        render: (_, row) => `${row.fee_percent} %`,
      },
      {
        title: '总会员数',
        render: (_, row) => row.member_count,
      },
      { title: '下层会员', render: (_, row) => row.child_count },
      {
        title: '个人绩效',
        children: [
          {
            title: '储值金额',
            render: (_, row) => <ColorText num={row.self_deposit_sum} />,
          },
          {
            title: '投注数',
            render: (_, row) => <ColorText num={row.self_bet_count} />,
          },
          {
            title: '投注金额',
            render: (_, row) => <ColorText num={row.self_bet_sum} />,
          },
          {
            title: '有效投注',
            render: (_, row) => <ColorText num={row.self_valid_bet_sum} />,
          },

          {
            title: '输赢结果',
            render: (_, row) => <ColorText num={row.self_result} />,
          },

          {
            title: '退水',
            render: (_, row) => <ColorText num={row.self_rebate} />,
          },
          {
            title: '手续费',
            render: (_, row) => <ColorText num={row.self_fee} />,
          },
        ],
      },
      {
        title: '组织绩效',
        children: [
          { title: '有效会员', render: (_, row) => row.valid_member_count },
          { title: '有效代理', render: (_, row) => row.valid_agent_count },
          {
            title: '7天内活跃会员',
            render: (_, row) => (
              <Text color={row.week_valid_member_count > 0 && 'red.500'}>
                {row.week_valid_member_count}
              </Text>
            ),
          },
          {
            title: '7天内活跃代理',
            render: (_, row) => (
              <Text color={row.week_valid_agent_count > 0 && 'red.500'}>
                {row.week_valid_agent_count}
              </Text>
            ),
          },
          {
            title: '当期活跃会员',
            render: (_, row) => (
              <Text color={row.mon_valid_member_count > 0 && 'red.500'}>
                {row.mon_valid_member_count}
              </Text>
            ),
          },
          {
            title: '当期活跃代理',
            render: (_, row) => (
              <Text color={row.mon_valid_agent_count > 0 && 'red.500'}>
                {row.mon_valid_agent_count}
              </Text>
            ),
          },
          {
            title: '会员储值金',
            render: (_, row) => <ColorText num={row.deposit_sum} />,
          },
          {
            title: '有效投注',
            render: (_, row) => <ColorText num={row.valid_bet_sum} />,
          },
          {
            title: '会员输赢',
            render: (_, row) => <ColorText num={row.result} />,
          },
          {
            title: '退水',
            render: (_, row) => <ColorText num={row.rebate} />,
          },
          {
            title: '手续费',
            render: (_, row) => <ColorText num={row.fee} />,
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      {router?.query?.pid && (
        <TipIconButton
          label="回上页"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
