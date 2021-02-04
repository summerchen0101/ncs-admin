import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { BlockStatus } from '@/lib/enums'

function TableData({ list }: { list: Member[] }) {
  const {
    setActive,
    setOpenBet,
    setStatus,
    fetchById,
    doDelete,
  } = useMemberService()
  const { toCurrency, toDateTime } = useTransfer()
  const columns: ColumnsType<Member> = useMemo(
    () => [
      { title: '帳號/暱稱', render: (_, row) => `${row.acc} [${row.name}]` },
      { title: '會員數', render: (_, row) => toCurrency(row.member_count) },
      { title: '餘額', render: (_, row) => `$${toCurrency(row.balance)}` },
      {
        title: '登入失敗',
        render: (_, row) =>
          row.login_error_times ? `${row.login_error_times}次` : '-',
      },
      { title: '登入IP', render: (_, row) => row.login_ip || '-' },
      {
        title: '登入時間',
        render: (_, row) => (row.logined_at ? toDateTime(row.logined_at) : '-'),
      },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="green"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '下注',
        render: (_, row) => (
          <Switch
            colorScheme="green"
            isChecked={row.is_open_bet}
            onChange={(e) => setOpenBet(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '鎖定',
        render: (_, row) => (
          <Switch
            colorScheme="red"
            isChecked={row.status === BlockStatus.Blocked}
            onChange={(e) =>
              setStatus(
                row.id,
                e.target.checked ? BlockStatus.Blocked : BlockStatus.Normal,
              )
            }
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="會員資訊"
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
