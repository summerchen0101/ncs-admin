import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { RealName } from '@/types/api/RealName'
import useRealNameService from '@/utils/services/useRealNameService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: RealName[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById } = useRealNameService()
  const columns: ColumnsType<RealName> = useMemo(
    () => [
      {
        title: '會員帳號',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '真實姓名',
        render: (_, row) => '黃小琥',
      },
      { title: '申請時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '審核人員/時間',
        render: (_, row) => (
          <>
            <Text>{row.editor || '-'}</Text>
            <Text>{toDateTime(row.updated_at)}</Text>
          </>
        ),
      },
      {
        title: '審核狀態',
        render: (_, row) => <Text color="red.500">未審核</Text>,
      },
      {
        title: '審核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="審核"
              colorScheme="purple"
              icon={<HiOutlinePencilAlt />}
              onClick={() => fetchById(row.id)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
