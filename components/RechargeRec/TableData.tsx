import BasicTable from '@/components/BasicTable'
import { RechargeType } from '@/lib/enums'
import { rechargeTypeOpts } from '@/lib/options'
import { RechargeRec } from '@/types/api/RechargeRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'

function TableData({ list }: { list: RechargeRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const columns: ColumnsType<RechargeRec> = useMemo(
    () => [
      {
        title: '类型',
        render: (_, row) => (
          <Text
            color={
              row.recharge_type === RechargeType.Add ? 'green.500' : 'red.500'
            }
          >
            {toOptionName(rechargeTypeOpts, row.recharge_type)}
          </Text>
        ),
      },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      {
        title: '点数',
        render: (_, row) => (
          <Text
            color={
              row.recharge_type === RechargeType.Add ? 'green.500' : 'red.500'
            }
          >
            {toCurrency(row.amount)}
          </Text>
        ),
      },
      {
        title: '余额',
        render: (_, row) => `${toCurrency(row.balance)}`,
      },
      {
        title: '备注',
        render: (_, row) => row.note,
      },

      { title: '操作时间', render: (_, row) => toDateTime(moment().unix()) },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
