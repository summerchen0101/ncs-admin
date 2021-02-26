import BasicTable from '@/components/BasicTable'
import { RechargeRec } from '@/types/api/RechargeRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'

function TableData({ list }: { list: RechargeRec[] }) {
  const { toDateTime } = useTransfer()
  const columns: ColumnsType<RechargeRec> = useMemo(
    () => [
      { title: '類型', render: (_, row) => '加點' },
      { title: '會員帳號', render: (_, row) => 'ruby[RUBY]' },
      { title: '點數', render: (_, row) => <Text color="green.500">400</Text> },

      { title: '操作時間', render: (_, row) => toDateTime(moment().unix()) },
    ],
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={Array(2)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
