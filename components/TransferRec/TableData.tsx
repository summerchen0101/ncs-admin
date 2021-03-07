import BasicTable from '@/components/BasicTable'
import { walletRecTypeOpts } from '@/lib/options'
import { TransferRec } from '@/types/api/TransferRec'
import useTransfer from '@/utils/useTransfer'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'

function TableData({ list }: { list: TransferRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const columns: ColumnsType<TransferRec> = useMemo(
    () => [
      { title: '異動時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      {
        title: '類型',
        render: (_, row) =>
          toOptionName(walletRecTypeOpts, row.wallet_rec_type),
      },
      {
        title: '點數',
        render: (_, row) => <ColorText num={row.amount} />,
      },
      // {
      //   title: '餘額',
      //   render: (_, row) => `${toCurrency(row.balance)}`,
      // },
      {
        title: '備註',
        render: (_, row) => row.note || '-',
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
