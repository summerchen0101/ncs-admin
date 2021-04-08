import BasicTable from '@/components/BasicTable'
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
        title: '会员资讯',
        children: [
          {
            title: '总会员数',
            render: (_, row) => row.member_count,
          },
          { title: '下层会员', render: (_, row) => row.child_count },
          { title: '有效会员', render: (_, row) => row.valid_member_count },
          { title: '会员代理', render: (_, row) => row.valid_agent_count },
          {
            title: '7天内活跃',
            render: (_, row) => (
              <Text color={row.week_valid_member_count > 0 && 'red.500'}>
                {row.week_valid_member_count}
              </Text>
            ),
          },
          {
            title: '当期活跃',
            render: (_, row) => (
              <Text color={row.mon_valid_member_count > 0 && 'red.500'}>
                {row.mon_valid_member_count}
              </Text>
            ),
          },
        ],
      },

      { title: '会员输赢', render: (_, row) => <ColorText num={row.result} /> },
      {
        title: '有效投注量',
        render: (_, row) => toCurrency(row.valid_bet_sum),
      },
      { title: '会员储值金', render: (_, row) => toCurrency(row.deposit_sum) },
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
