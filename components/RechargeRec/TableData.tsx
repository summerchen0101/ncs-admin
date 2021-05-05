import BasicTable from '@/components/BasicTable'
import { useDataContext } from '@/context/DataContext'
import { RechargeType } from '@/lib/enums'
import { rechargeTypeOpts, walletRecTypeOpts } from '@/lib/options'
import { RechargeRec } from '@/types/api/RechargeRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import TableSummary from '../TableSummary'

function TableData({ list }: { list: RechargeRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const { rechargeRecSummary: summary } = useDataContext()
  const filteredSummary = useMemo(
    () =>
      summary.filter((t) =>
        walletRecTypeOpts.find((opt) => opt.value === t.wallet_rec_type),
      ),
    [summary],
  )
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
        title: '纪录属性',
        render: (_, row) =>
          toOptionName(walletRecTypeOpts, row.wallet_rec_type) || '-',
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
        render: (_, row) => row.note || '-',
      },

      { title: '操作时间', render: (_, row) => toDateTime(row.created_at) },
    ],
    [],
  )
  return (
    <>
      {filteredSummary.length > 0 && (
        <TableSummary>
          {filteredSummary.map((t) => (
            <Text key={t.wallet_rec_type} lineHeight="26px">
              {toOptionName(walletRecTypeOpts, t.wallet_rec_type)}{' '}
              <ColorText num={t.amount} /> 共 {t.count || 0} 笔
            </Text>
          ))}
        </TableSummary>
      )}

      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
