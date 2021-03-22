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
        title: '活跃会员数',
        children: [
          { title: '7天内', render: (_, row) => '68' },
          { title: '当期', render: (_, row) => '68' },
        ],
      },

      { title: '会员输赢结果', render: (_, row) => '12,1220' },
      { title: '有效投注量', render: (_, row) => '232,220' },
      { title: '会员储值金', render: (_, row) => '231,220' },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
