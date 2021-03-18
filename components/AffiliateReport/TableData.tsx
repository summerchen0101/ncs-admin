import BasicTable from '@/components/BasicTable'
import { MemberReport } from '@/types/api/MemberReport'
import useMemberReportService from '@/utils/services/useMemberReportService'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

function TableData({ list }: { list: MemberReport[] }) {
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<MemberReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.acc} [${row.name}]`,
      },

      { title: '总会员数', render: (_, row) => row.child_count },
      { title: '有效会员数', render: (_, row) => '92' },
      {
        title: '上期未派',
        render: (_, row) => <Text>1,280</Text>,
      },
      {
        title: '本期佣金績效',
        children: [
          { title: '活跃会员数', render: (_, row) => '68' },
          // 活跃会员标准：当月存款金额≥1000，当月总流水≥15000
          { title: '会员输赢结果', render: (_, row) => '12,1220' },
          { title: '有效投注量', render: (_, row) => '232,220' },
          { title: '会员储值金', render: (_, row) => '231,220' },

          {
            title: '达标等级',
            render: (_, row) => (
              <Text color="brown.500" fontWeight="bold">
                白金级 20%
              </Text>
            ),
          },
          {
            title: '佣金结算',
            render: (_, row) => (
              <Text fontWeight="600" color="red.500" fontSize="md">
                21,000
              </Text>
            ),
          },
        ],
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
