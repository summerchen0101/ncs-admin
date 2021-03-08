import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { AgentReport } from '@/types/api/AgentReport'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import menu from '@/lib/menu'

const MONTHS = () => {
  const months: string[] = []
  const dateStart = moment().subtract(4, 'month')
  const dateEnd = moment()
  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push(dateStart.format('YYYY-MM'))
    dateStart.add(1, 'month')
  }
  return months
}

function TableData({ list }: { list: AgentReport[] }) {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const columns: ColumnsType<AgentReport> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        fixed: true,
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.report.pages.agent.path,
                  query: { ...router.query, pid: row.id },
                }}
              >
                <Text color="brand.500" as="a">
                  {row.acc}[{row.name}]
                </Text>
              </Link>
            )
          }
          return `${row.acc}[${row.name}]`
        },
      },
      {
        title: '下注筆數',
        render: (_, row) => toCurrency(row.count, 0),
      },
      {
        title: '注額',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '有效注額',
        render: (_, row) => toCurrency(row.valid_amount),
      },
      {
        title: '會員',
        children: [
          {
            title: '結果',
            render: (_, row) => <ColorText num={row.result} />,
          },
          {
            title: '退水',
            render: (_, row) => toCurrency(row.rebate),
          },
          {
            title: '服務費',
            render: (_, row) => toCurrency(row.fee),
          },
        ],
      },
      {
        title: '代理',
        children: [
          {
            title: '結果',
            render: (_, row) => <ColorText num={row.agent_result} />,
          },
          {
            title: '退水',
            render: (_, row) => toCurrency(row.agent_rebate),
          },
          {
            title: '負擔退水',
            render: (_, row) => toCurrency(row.agent_share_rebate),
          },
          {
            title: '服務費',
            render: (_, row) => toCurrency(row.agent_fee),
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
          label="回上頁"
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
