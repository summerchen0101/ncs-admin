import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { RealName } from '@/types/api/RealName'
import useRealNameService from '@/utils/services/useRealNameService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

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
        render: (_, row) => row.name,
      },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '審核人員/時間',
        render: (_, row) => {
          if (row.is_confirm) {
            return (
              <>
                <Text>{row.editor || '-'}</Text>
                <Text>{toDateTime(row.confirmed_at)}</Text>
              </>
            )
          }
          return '-'
        },
      },
      {
        title: '審核狀態',
        render: (_, row) => {
          return (
            <Tag
              colorScheme={row.is_confirm ? 'green' : 'gray'}
              variant="solid"
              borderRadius="sm"
            >
              {row.is_confirm ? '已通過' : '未審核'}
            </Tag>
          )
        },
      },
      {
        title: '審核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="審核"
              colorScheme="purple"
              icon={<HiPencilAlt />}
              onClick={() => fetchById(row.id)}
              disabled={row.is_confirm}
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
