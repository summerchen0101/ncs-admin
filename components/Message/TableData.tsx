import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { memberTypeOpts, newsTypeOpts } from '@/lib/options'
import { Message } from '@/types/api/Message'
import useMessageService from '@/utils/services/useMessageService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: Message[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useMessageService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Message> = useMemo(
    () => [
      {
        title: '類型',
        render: (_, row) => toOptionName(memberTypeOpts, row.member_type),
      },
      { title: '標題', code: 'title' },
      {
        title: '帳號',
        render: (_, row) => row.receiver_accs.join(', ') || '-',
      },
      {
        title: '全部',
        render: (_, row) => (row.is_all ? '是' : '否'),
      },
      { title: '發送人', render: (_, row) => row.sender },
      { title: '發送時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="詳情"
              icon={<HiOutlineEye />}
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
