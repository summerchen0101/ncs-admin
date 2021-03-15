import BasicTable from '@/components/BasicTable'
import { walletRecTypeOpts } from '@/lib/options'
import { WalletRec } from '@/types/api/WalletRec'
import useTransfer from '@/utils/useTransfer'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'

function TableData({ list }: { list: WalletRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
