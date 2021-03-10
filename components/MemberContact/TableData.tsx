import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberContact } from '@/types/api/MemberContact'
import useMemberContactService from '@/utils/services/useMemberContactService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiEye, HiOutlineEye, HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: MemberContact[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById } = useMemberContactService()
  const columns: ColumnsType<MemberContact> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
        fixed: true,
      },
      {
        title: '郵箱',
        render: (_, row) => row.email || '-',
      },
      {
        title: 'QQ',
        render: (_, row) => row.qq_id || '-',
      },
      {
        title: 'LINE',
        render: (_, row) => row.line_id || '-',
      },
      {
        title: 'Telegram',
        render: (_, row) => row.telegram_id || '-',
      },
      {
        title: '微信',
        render: (_, row) => row.wechat_id || '-',
      },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '查看',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              colorScheme="blue"
              icon={<HiOutlineEye />}
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
