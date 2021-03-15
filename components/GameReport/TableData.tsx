import BasicTable from '@/components/BasicTable'
import { GameReport } from '@/types/api/GameReport'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

function TableData({ list }: { list: GameReport[] }) {
  const columns: ColumnsType<GameReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => <a>abc[ABC]</a>,
      },
      {
        title: '笔数',
        render: (_, row) => 0,
      },
      {
        title: '注额',
        render: (_, row) => 0,
      },
      {
        title: '有效注额',
        render: (_, row) => 0,
      },
      {
        title: '输赢金额',
        render: (_, row) => 0,
      },
      {
        title: '会员退水',
        render: (_, row) => 0,
      },
      {
        title: '小计',
        render: (_, row) => 0,
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
