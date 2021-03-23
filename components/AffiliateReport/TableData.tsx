import BasicTable from '@/components/BasicTable'
import { MemberReport } from '@/types/api/MemberReport'
import useMemberReportService from '@/utils/services/useMemberReportService'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import LargerNum from '../LargerNum'

function TableData({ list }: { list: MemberReport[] }) {
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<MemberReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.acc} [${row.name}]`,
      },

      {
        title: '会员数',
        children: [
          {
            title: '总会员数',
            render: (_, row) => row.member_count,
          },
          { title: '下层会员', render: (_, row) => row.child_count },
          { title: '有效会员', render: (_, row) => row.valid_member_count },
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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
