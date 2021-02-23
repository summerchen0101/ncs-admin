import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { GameReport } from '@/types/api/GameReport'
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

function TableData({ list }: { list: GameReport[] }) {
  const columns: ColumnsType<GameReport> = useMemo(
    () => [
      {
        title: '代理',
        render: (_, row) => 'ruby[RUBY]',
        align: 'center',
        // children: [
        //   {
        //     title: '帳號/暱稱',
        //     render: (_, row) => 'ruby[RUBY]',
        //   },
        //   {
        //     title: '會員數',
        //     render: (_, row) => '200',
        //   },
        // ],
      },
      ...MONTHS().map((m) => ({
        title: m,
        children: [
          { title: '實貨量', render: (_, row) => '1220,300', align: 'center' },
          {
            title: '會員退水',
            render: (_, row) => <Text color="green.500">23,220</Text>,
            align: 'center',
          },
          {
            title: '會員結果',
            render: (_, row) => <Text color="red.500">-143,220</Text>,
            align: 'center',
          },
        ],
      })),
    ],
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={Array(8)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
