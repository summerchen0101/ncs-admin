import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberBank } from '@/types/api/MemberBank'
import useMemberBankService from '@/utils/services/useMemberBankService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: MemberBank[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById } = useMemberBankService()
  const columns: ColumnsType<MemberBank> = useMemo(
    () => [
      {
        title: '會員帳號',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '銀行名稱', render: (_, row) => row.name },
      { title: '分行名稱', render: (_, row) => row.branch },
      { title: '帳戶名稱', render: (_, row) => row.person },
      { title: '銀行帳號', render: (_, row) => row.acc },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '通過',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_confirm}
            onChange={(e) => setConfirm(row.id, e.target.checked)}
          />
        ),
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
