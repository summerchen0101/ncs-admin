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
  const columns = useMemo(
    () =>
      [
        // {
        //   title: '年份',
        //   render: (value, row, index) => {
        //     const obj = {
        //       children: '2020',
        //       props: { rowSpan: index % 4 === 0 ? 4 : 0 },
        //     }
        //     return obj
        //   },
        //   align: 'center',
        // },
        {
          title: '季度',
          render: (value, row, index) => {
            const obj = {
              children: `Q${moment().month(row.month).quarter()}`,
              props: { rowSpan: index % 3 === 0 ? 3 : 0 },
            }
            return obj
          },
          align: 'center',
        },
        {
          title: '月份',
          render: (_, row) => row.month,
          align: 'center',
        },
        ...gameOpts.map((m) => ({
          title: m.label,
          children: [
            {
              title: '筆數',
              render: (_, row) => '3,020',
              align: 'center',
            },
            {
              title: '注額',
              render: (_, row) => '1220,300',
              align: 'center',
            },
            {
              title: '退水',
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
      ] as ColumnsType<GameReport & { month: number }>,
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={Array(12)
        .fill('')
        .map((t, i) => ({ id: i, month: i + 1 }))}
    />
  )
}

export default TableData
