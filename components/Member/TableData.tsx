import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus, MemberType } from '@/lib/enums'
import menu from '@/lib/menu'
import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { HStack, Icon, Switch, Text, useToast } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import {
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineX,
  HiPencilAlt,
  HiPlus,
  HiStar,
} from 'react-icons/hi'
import LargerNum from '../LargerNum'

function TableData({ list }: { list: Member[] }) {
  const {
    setActive,
    setOpenBet,
    setStatus,
    setRealName,
    setPromo,
    fetchById,
    fetchBetSetting,
    fetchParentBetSetting,
  } = useMemberService()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  const { copyToClipboard } = useHelper()
  const router = useRouter()
  const pid = useMemo(() => router.query?.pid && +router.query?.pid, [
    router.query,
  ])
  const toast = useToast()
  const { setViewId, setBetSettingMemberType } = useDataContext<Member>()
  const [, setPassVisible] = usePopupContext('passForm')
  const [, setTradePassVisible] = usePopupContext('tradePassForm')
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setBetSettingVisible] = usePopupContext('betSetting')

  const handlePassEdit = (id: number) => {
    setViewId(id)
    setPassVisible(true)
  }
  const handleTradePassEdit = (id: number) => {
    setViewId(id)
    setTradePassVisible(true)
  }
  const handleBetSettingEdit = async (id: number, parent_id?: number) => {
    await fetchById(id)
    await fetchBetSetting(id)
    setBetSettingVisible(true)
  }

  const handleEdit = async (id: number) => {
    await fetchById(id)
    setEditVisible(true)
  }
  const handleCreate = async (id: number) => {
    setBetSettingMemberType(MemberType.Agent)
    await fetchParentBetSetting(id)
    setCreateVisible(true)
  }

  const columns: ColumnsType<Member> = useMemo(
    () => [
      { title: '帳號/暱稱', render: (_, row) => `${row.acc} [${row.name}]` },
      {
        title: '身份',
        render: (_, row) => {
          if (row.member_type === MemberType.Member) {
            return `${row.vip_level}級會員`
          }
          return toOptionName(memberTypeOpts, row.member_type)
        },
      },
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
                <LargerNum num={row.member_count} />
              </Link>
            )
          }
          return toCurrency(row.member_count, 0)
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
                <LargerNum num={row.agent_count} />
              </Link>
            )
          } else if (row.member_type === MemberType.Member) {
            return <Icon as={HiOutlineX} />
          }
          return toCurrency(row.agent_count, 0)
        },
      },
      { title: '子帳號', render: (_, row) => toCurrency(row.shadow_count, 0) },
      {
        title: '帳務類型',
        render: (_, row) =>
          toOptionName(accountingTypeOpts, row.accounting_type),
      },
      { title: '點數', render: (_, row) => `$${toCurrency(row.balance)}` },
      { title: '額度', render: (_, row) => `$${toCurrency(row.credit)}` },
      {
        title: '推廣碼/啟用',
        render: (_, row) => (
          <HStack>
            <TipIconButton
              label="複製"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() => copyToClipboard(row.promo_code)}
            />
            <Switch
              colorScheme="brand"
              isChecked={row.is_promo}
              onChange={(e) => setPromo(row.id, e.target.checked)}
            />
          </HStack>
        ),
      },
      {
        title: '登入失敗',
        render: (_, row) =>
          row.login_error_times ? `${row.login_error_times}次` : '-',
      },
      {
        title: '登入時間/IP/位置',
        render: (_, row) => {
          if (row.login_ip) {
            return (
              <>
                <Text>{row.logined_at && toDateTime(row.logined_at)}</Text>
                <Text>{row.login_ip}</Text>
                <Text>{row.ip_location || '-'}</Text>
              </>
            )
          }
          return '-'
        },
      },
      {
        title: '實名',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_real_name}
            onChange={(e) => setRealName(row.id, e.target.checked)}
          />
        ),
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
            colorScheme="pink"
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
            colorScheme="pink"
            onClick={() => handleTradePassEdit(row.id)}
          />
        ),
      },

      {
        title: '操作',
        fixed: 'right',
        render: (_, row) => (
          <HStack my="-4">
            {row.member_type === MemberType.Agent && (
              <TipIconButton
                label="新增下層"
                icon={<HiPlus />}
                colorScheme="teal"
                onClick={() => handleCreate(row.id)}
              />
            )}
            <TipIconButton
              label="遊戲參數"
              icon={<HiStar />}
              colorScheme="purple"
              onClick={() => handleBetSettingEdit(row.id, pid)}
            />
            <TipIconButton
              label="編輯"
              icon={<HiPencilAlt />}
              colorScheme="orange"
              onClick={() => handleEdit(row.id)}
            />

            {/* <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            /> */}
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
      {pid && (
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
