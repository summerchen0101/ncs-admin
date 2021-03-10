import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberContact } from '@/types/api/MemberContact'
import useMemberContactService from '@/utils/services/useMemberContactService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: MemberContact[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById } = useMemberContactService()
  const columns: ColumnsType<MemberContact> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
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
      // {
      //   title: '審核人員/時間',
      //   render: (_, row) => {
      //     if (row.is_confirm) {
      //       return (
      //         <>
      //           <Text>{row.editor || '-'}</Text>
      //           <Text>{toDateTime(row.confirmed_at)}</Text>
      //         </>
      //       )
      //     }
      //     return '-'
      //   },
      // },
      // {
      //   title: '審核狀態',
      //   render: (_, row) =>
      //     row.is_confirm ? (
      //       <Text color="green.500">已通過</Text>
      //     ) : (
      //       <Text color="red.500">未審核</Text>
      //     ),
      // },
      // {
      //   title: '審核',
      //   render: (_, row) => (
      //     <HStack my="-4">
      //       <TipIconButton
      //         label="審核"
      //         colorScheme="purple"
      //         icon={<HiPencilAlt />}
      //         onClick={() => fetchById(row.id)}
      //         disabled={row.is_confirm}
      //       />
      //     </HStack>
      //   ),
      // },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
