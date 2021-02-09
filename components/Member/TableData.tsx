import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Switch, toast, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import {
  HiClipboardCopy,
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineEye,
  HiOutlineTrash,
} from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { BlockStatus, MemberType } from '@/lib/enums'
import useHelper from '@/utils/useHelper'
import Link from 'next/link'
import menuInfo from '@/lib/menu'
import { useRouter } from 'next/dist/client/router'

function TableData({ list }: { list: Member[] }) {
  const {
    setActive,
    setOpenBet,
    setStatus,
    fetchById,
    doDelete,
  } = useMemberService()
  const { toCurrency, toDateTime } = useTransfer()
  const { copyToClipboard } = useHelper()
  const router = useRouter()
  const toast = useToast()
  const handleCopy = async (text: string) => {
    await copyToClipboard(text)
    toast({ status: 'success', title: '已複製推廣碼' })
  }

  const columns: ColumnsType<Member> = useMemo(
    () => [
      { title: '帳號/暱稱', render: (_, row) => `${row.acc} [${row.name}]` },
      {
        title: '下層會員',
        render: (_, row) => {
          if (row.member_count > 0) {
            return (
              <Link
                href={{
                  pathname: menuInfo.member.pages.member.path,
                  query: { pid: row.id, type: MemberType.Member },
                }}
              >
                {toCurrency(row.member_count)}
              </Link>
            )
          }
          return toCurrency(row.member_count)
        },
      },
      {
        title: '下層代理',
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menuInfo.member.pages.member.path,
                  query: { pid: row.id, type: MemberType.Agent },
                }}
              >
                {toCurrency(row.agent_count)}
              </Link>
            )
          }
          return toCurrency(row.agent_count)
        },
      },
      { title: '子帳號', render: (_, row) => toCurrency(row.shadow_count) },
      { title: '餘額', render: (_, row) => `$${toCurrency(row.balance)}` },
      {
        title: '推廣碼',
        render: (_, row) => (
          <TipIconButton
            label="複製"
            icon={<HiOutlineClipboardCopy />}
            onClick={() => handleCopy(row.promo_code)}
          />
        ),
      },
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
            colorScheme="brand"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '下注',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
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
  return (
    <>
      {router?.query?.pid && (
        <TipIconButton
          label="回上頁"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
