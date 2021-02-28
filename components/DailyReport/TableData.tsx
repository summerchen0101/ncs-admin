import BasicTable from '@/components/BasicTable'
import { DailyReport } from '@/types/api/DailyReport'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import React, { useMemo } from 'react'
const DAYS = (M: Moment) => {
  const days: string[] = []
  const dateStart = moment(M).startOf('month')
  const dateEnd = moment(M).endOf('month')
  while (dateEnd.unix() > dateStart.unix()) {
    days.push(dateStart.format('YYYY-MM-DD'))
    dateStart.add(1, 'day')
  }
  return days
}
function TableData({ list }: { list: DailyReport[] }) {
  const { toCurrency } = useTransfer()
  const columns: ColumnsType<
    DailyReport & { date: string; count: number }
  > = useMemo(
    () => [
      {
        title: '日期',
        render: (_, row) => row.date,
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
      {
        title: '累計下注(筆)',
        render: (_, row) => row.count,
      },
      {
        title: '累計注額',
        render: (_, row) => '231,300',
      },
      {
        title: '未結注額',
        render: (_, row) => '43,000',
      },
      {
        title: '退水',
        render: (_, row) => '0',
      },
      {
        title: '退佣',
        render: (_, row) => '0',
      },
      {
        title: '會員結果',
        render: (_, row) => 'xxxx',
      },
      {
        title: '公司結果',
        render: (_, row) => 'xxxx',
      },
    ],
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={DAYS(moment()).map((date, i) => ({ id: i, date, count: 100 }))}
      summary={(pageData) => {
        return (
          <Box as={Table.Summary.Row} bg="yellow.100">
            <Table.Summary.Cell index={0}>小計</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              {toCurrency(_.sumBy(pageData, 'count'))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>xxxx</Table.Summary.Cell>
            <Table.Summary.Cell index={3}>xxxx</Table.Summary.Cell>
            <Table.Summary.Cell index={4}>xxxx</Table.Summary.Cell>
            <Table.Summary.Cell index={5}>xxxx</Table.Summary.Cell>
            <Table.Summary.Cell index={6}>xxxx</Table.Summary.Cell>
            <Table.Summary.Cell index={7}>xxxx</Table.Summary.Cell>
          </Box>
        )
      }}
    />
  )
}

export default TableData
