import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { ProfitReport } from '@/types/api/ProfitReport'
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
function TableData({ list }: { list: ProfitReport[] }) {
  const { toCurrency, toOptionName } = useTransfer()
  const columns: ColumnsType<
    ProfitReport & { date: string; count: number }
  > = useMemo(
    () => [
      {
        title: '日期',
        render: (_, row) => row.date,
      },
      {
        title: '球種',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '累計下注(筆)',
        render: (_, row) => toCurrency(row.count),
      },
      {
        title: '累計注額',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '有效注額',
        render: (_, row) => toCurrency(row.valid_amount),
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
            <Table.Summary.Cell index={0} colSpan={2}>
              小計
            </Table.Summary.Cell>
            {/* <Table.Summary.Cell index={1}></Table.Summary.Cell> */}
            <Table.Summary.Cell index={2}>
              {toCurrency(_.sumBy(list, (t) => t.count))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              {toCurrency(_.sumBy(list, (t) => t.amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4}>
              {toCurrency(_.sumBy(list, (t) => t.valid_amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5}>
              {toCurrency(_.sumBy(list, (t) => t.rebate))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              {toCurrency(_.sumBy(list, (t) => t.fee))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <ColorText num={_.sumBy(list, (t) => t.result)} />
            </Table.Summary.Cell>
          </Box>
        )
      }}
    />
  )
}

export default TableData
