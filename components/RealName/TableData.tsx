import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { RealName } from '@/types/api/RealName'
import useRealNameService from '@/utils/services/useRealNameService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: RealName[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById, doDelete } = useRealNameService()
  const columns: ColumnsType<RealName> = useMemo(
    () => [
      {
        title: '会员帐号',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '真实姓名',
        render: (_, row) => row.name,
      },
      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '审核人员/时间',
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
        title: '审核状态',
        render: (_, row) => {
          return (
            <Tag
              colorScheme={row.is_confirm ? 'green' : 'gray'}
              variant="solid"
              borderRadius="sm"
            >
              {row.is_confirm ? '已通过' : '未审核'}
            </Tag>
          )
        },
      },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="审核"
              colorScheme="purple"
              icon={<HiPencilAlt />}
              onClick={() => fetchById(row.id)}
              disabled={row.is_confirm}
            />
            <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
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
