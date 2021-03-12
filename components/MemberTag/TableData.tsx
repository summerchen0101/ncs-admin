import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberTag } from '@/types/api/MemberTag'
import useMemberTagService from '@/utils/services/useMemberTagService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Tag } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: MemberTag[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useMemberTagService()
  const columns: ColumnsType<MemberTag> = useMemo(
    () => [
      { title: '名稱', render: (_, row) => row.name },
      {
        title: '顏色',
        render: (_, row) => (
          <Tag bg={row.color} color="white" borderRadius="sm">
            {row.color}
          </Tag>
        ),
      },
      { title: '描述', render: (_, row) => row.content },
      { title: '會員數', render: (_, row) => row.member_count },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="刪除"
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
