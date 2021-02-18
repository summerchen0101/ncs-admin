import BasicTable from '@/components/BasicTable'
import { MemberActivity } from '@/types/api/MemberActivity'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

function TableData({ list }: { list: MemberActivity[] }) {
  const columns: ColumnsType<MemberActivity> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        render: (_, row) => (
          <a>
            {row.acc}[{row.name}]
          </a>
        ),
      },
      {
        title: '首次充值(筆)',
        render: (_, row) => 0,
      },
      {
        title: '首次充值加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '再次充值(筆)',
        render: (_, row) => 0,
      },
      {
        title: '再次充值加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '總充值(筆)',
        render: (_, row) => 0,
      },
      {
        title: '總充值加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '首次提現(筆)',
        render: (_, row) => 0,
      },
      {
        title: '首次提現加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '再次提現(筆)',
        render: (_, row) => 0,
      },
      {
        title: '再次提現加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '總提現(筆)',
        render: (_, row) => 0,
      },
      {
        title: '總提現加總(元)',
        render: (_, row) => 0,
      },
      {
        title: '總登入人數',
        render: (_, row) => 0,
      },
      {
        title: '註冊人數',
        render: (_, row) => 0,
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
