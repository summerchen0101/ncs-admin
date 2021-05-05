import BasicTable from '@/components/BasicTable'
import { useDataContext } from '@/context/DataContext'
import { walletRecTypeOpts } from '@/lib/options'
import { WalletRec } from '@/types/api/WalletRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import TableSummary from '../TableSummary'

function TableData({ list }: { list: WalletRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const { walletRecSummary: summary } = useDataContext()
  const filteredSummary = useMemo(
    () =>
      summary &&
      summary.filter((t) =>
        walletRecTypeOpts.find((opt) => opt.value === t.wallet_rec_type),
      ),
    [summary],
  )
  const columns: ColumnsType<WalletRec> = useMemo(
    () => [
      { title: '异动时间', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      {
        title: '类型',
        render: (_, row) =>
          toOptionName(walletRecTypeOpts, row.wallet_rec_type),
      },
      {
        title: '点数',
        render: (_, row) => <ColorText num={row.amount} />,
      },
      {
        title: '余额',
        render: (_, row) => `${toCurrency(row.balance)}`,
      },
      {
        title: '备注',
        render: (_, row) => row.note || '-',
      },
    ],
    [],
  )
  return (
    <>
      {filteredSummary?.length > 0 && (
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
