import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { AgentReport } from '@/types/api/AgentReport'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'

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
  const columns: ColumnsType<AgentReport> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.acc}[${row.name}]`,
      },
      {
        title: '下注筆數',
        render: (_, row) => toCurrency(row.count),
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
            title: '會員結果',
            render: (_, row) => toCurrency(row.result),
          },
          {
            title: '會員退水',
            render: (_, row) => toCurrency(row.rebate),
          },
          {
            title: '手續費',
            render: (_, row) => toCurrency(row.fee),
          },
        ],
      },
      {
        title: '代理',
        children: [
          {
            title: '代理結果',
            render: (_, row) => toCurrency(row.agent_result),
          },
          {
            title: '代理退水',
            render: (_, row) => toCurrency(row.agent_rebate),
          },
          {
            title: '代理退佣',
            render: (_, row) => toCurrency(row.agent_fee),
          },
        ],
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
