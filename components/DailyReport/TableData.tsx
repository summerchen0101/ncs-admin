import BasicTable from '@/components/BasicTable'
import { DailyReport } from '@/types/api/DailyReport'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
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
        render: (_, row) => toCurrency(row.count, 0),
      },
      {
        title: '累計注額',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '未結注額',
        render: (_, row) => toCurrency(row.not_accounting_amount),
      },
      {
        title: '退水',
        render: (_, row) => toCurrency(row.rebate),
      },
      {
        title: '服務費',
        render: (_, row) => toCurrency(row.fee),
      },
      {
        title: '會員結果',
        render: (_, row) => <ColorText num={row.result} />,
      },
      {
        title: '公司結果',
        render: (_, row) => <ColorText num={row.sys_result} />,
      },
    ],
    [],
  )
  return (
    <BasicTable
      rowKey="date"
      columns={columns}
      data={list}
      summary={() => {
        return (
          <Box as={Table.Summary.Row} fontWeight="bold">
            <Table.Summary.Cell index={0}>小計</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              {toCurrency(
                _.sumBy(list, (t) => t.count, 0),
                0,
              )}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              {toCurrency(_.sumBy(list, (t) => t.amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              {toCurrency(_.sumBy(list, (t) => t.not_accounting_amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4}>
              {toCurrency(_.sumBy(list, (t) => t.rebate))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5}>
              {toCurrency(_.sumBy(list, (t) => t.fee))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              <ColorText num={_.sumBy(list, (t) => t.result)} />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <ColorText num={_.sumBy(list, (t) => t.sys_result)} />
            </Table.Summary.Cell>
          </Box>
        )
      }}
    />
  )
}

export default TableData
