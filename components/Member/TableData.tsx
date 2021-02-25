import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus, MemberType } from '@/lib/enums'
import menu from '@/lib/menu'
import { Member } from '@/types/api/Member'
import useMemberAPI from '@/utils/apis/useMemberAPI'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text, useToast } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import {
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi'

function TableData({ list }: { list: Member[] }) {
  const { fetchBetSetting } = useMemberAPI()
  const {
    setActive,
    setOpenBet,
    setStatus,
    doDelete,
    fetchById,
  } = useMemberService()
  const { toCurrency, toDateTime } = useTransfer()
  const { copyToClipboard } = useHelper()
  const router = useRouter()
  const toast = useToast()
  const { setViewId } = useDataContext<Member>()
  const [, setPassVisible] = usePopupContext('passForm')
  const [, setTradePassVisible] = usePopupContext('tradePassForm')
  const [, setEditVisible] = usePopupContext('editForm')

  const handlePassEdit = (id: number) => {
    setViewId(id)
    setPassVisible(true)
  }
  const handleTradePassEdit = (id: number) => {
    setViewId(id)
    setTradePassVisible(true)
  }

  const handleEdit = async (id: number) => {
    await Promise.all([fetchById(id), fetchBetSetting(id)])
    setEditVisible(true)
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
                  pathname: menu.member.pages.member.path,
                  query: { pid: row.id, type: MemberType.Member },
                }}
              >
                <Text color="brand.500" as="a">
                  {toCurrency(row.member_count)}
                </Text>
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
                  pathname: menu.member.pages.member.path,
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
      { title: '點數', render: (_, row) => `$${toCurrency(row.balance)}` },
      { title: '額度', render: (_, row) => `$${toCurrency(row.creadit)}` },
      {
        title: '推廣碼',
        render: (_, row) => (
          <TipIconButton
            label="複製"
            icon={<HiOutlineClipboardCopy />}
            onClick={() => copyToClipboard(row.promo_code)}
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
        title: '密碼',
        render: (_, row) => (
          <TipIconButton
            label="密碼修改"
            icon={<HiOutlineKey />}
            onClick={() => handlePassEdit(row.id)}
          />
        ),
      },
      {
        title: '交易密碼',
        render: (_, row) => (
          <TipIconButton
            label="交易密碼修改"
            icon={<HiOutlineKey />}
            onClick={() => handleTradePassEdit(row.id)}
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencil />}
              onClick={() => handleEdit(row.id)}
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
