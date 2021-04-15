import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, BlockStatus, MemberType } from '@/lib/enums'
import menu from '@/lib/menu'
import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import {
  HStack,
  Icon,
  Spacer,
  Switch,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import {
  HiCheck,
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineX,
  HiPencilAlt,
  HiPlus,
  HiStar,
  HiX,
} from 'react-icons/hi'
import LargerNum from '../LargerNum'
import MyCheckBox from '../MyCheckBox'

function TableData({ list }: { list: Member[] }) {
  const {
    setActive,
    setOpenBet,
    setTest,
    setStatus,
    setRealName,
    setPromo,
    fetchById,
    fetchBetSetting,
    fetchParentBetSetting,
    fetchAgentRootSetting,
  } = useMemberService()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  const { copyToClipboard } = useHelper()
  const router = useRouter()
  const pid = useMemo(() => +router.query?.pid || null, [router.query])
  const toast = useToast()
  const {
    setViewId,
    setViewData,
    setParentBetSettings,
  } = useDataContext<Member>()
  const [, setPassVisible] = usePopupContext('passForm')
  const [, setTradePassVisible] = usePopupContext('tradePassForm')
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setBetSettingVisible] = usePopupContext('betSetting')
  const [, setCreditVisible] = usePopupContext('credit')
  const [, setTagVisible] = usePopupContext('tag')
  const handleCreditEdit = async (id: number) => {
    await fetchById(id)
    setCreditVisible(true)
  }
  const handlePassEdit = (id: number) => {
    setViewId(id)
    setPassVisible(true)
  }
  const handleTradePassEdit = (id: number) => {
    setViewId(id)
    setTradePassVisible(true)
  }
  const handleBetSettingEdit = async (id: number, parent_id?: number) => {
    setParentBetSettings(null)
    await fetchById(id)
    await fetchBetSetting(id)
    parent_id
      ? await fetchParentBetSetting(parent_id)
      : await fetchAgentRootSetting()
    setBetSettingVisible(true)
  }

  const handleEdit = async (id: number) => {
    await fetchById(id)
    setEditVisible(true)
  }
  const handleTagEdit = async (id: number) => {
    await fetchById(id)
    setTagVisible(true)
  }
  const handleCreate = async (id: number) => {
    setParentBetSettings(null)
    await Promise.all([fetchById(id), fetchParentBetSetting(id)])
    setCreateVisible(true)
  }

  const columns: ColumnsType<Member> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.acc}[${row.name}]`,
      },
      {
        title: '身份',
        render: (_, row) => {
          if (row.member_type === MemberType.Member) {
            return row.vip_level ? `${row.vip_level}级会员` : '会员'
          }
          return toOptionName(memberTypeOpts, row.member_type)
        },
      },
      {
        title: '下层会员',
        render: (_, row) => {
          if (row.member_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.member.pages.member.path,
                  query: {
                    pid: row.id,
                    type: MemberType.Member,
                  },
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
        title: '下层代理',
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
      { title: '子帐号', render: (_, row) => toCurrency(row.shadow_count, 0) },
      {
        title: '帐务类型',
        render: (_, row) => {
          const colorMap = {
            [AccountingType.Cash]: 'yellow',
            [AccountingType.Credit]: 'blue',
          }
          return (
            <Tag
              size="md"
              variant="solid"
              colorScheme={colorMap[row.accounting_type]}
              borderRadius="sm"
            >
              {toOptionName(accountingTypeOpts, row.accounting_type)}
            </Tag>
          )
        },
      },
      {
        title: '点数',
        render: (_, row) => {
          if (row.accounting_type === AccountingType.Cash) {
            return toCurrency(row.balance)
          }
          return <HiX />
        },
      },
      {
        title: '额度/调整',
        render: (_, row) => {
          if (row.accounting_type === AccountingType.Credit) {
            return (
              <HStack>
                <Text>{toCurrency(row.credit)}</Text>
                <Spacer />
                <TipIconButton
                  label="额度调整"
                  icon={<HiPencilAlt />}
                  colorScheme="brand"
                  onClick={() => handleCreditEdit(row.id)}
                />
              </HStack>
            )
          }
          return <HiX />
        },
      },
      {
        title: '推广连结/启用',
        render: (_, row) => (
          <HStack spacing="15px">
            <TipIconButton
              label="复制"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() =>
                copyToClipboard(
                  `${process.env.memberUrl || 'https://ag88.online'}/p/${
                    row.promo_code
                  }`,
                )
              }
            />
            <MyCheckBox
              isChecked={row.is_promo}
              onChange={(e) => setPromo(row.id, e.target.checked)}
            />
          </HStack>
        ),
      },
      {
        title: '登录失败',
        render: (_, row) =>
          row.login_error_times ? `${row.login_error_times}次` : '-',
      },
      {
        title: '注册时间/最后登录',
        render: (_, row) => (
          <>
            <Text>{row.created_at && toDateTime(row.created_at)}</Text>
            <Text>{row.logined_at && toDateTime(row.logined_at)}</Text>
          </>
        ),
      },
      {
        title: '最后登录IP/位置',
        render: (_, row) => {
          if (row.login_ip) {
            return (
              <>
                <Text>{row.login_ip}</Text>
                <Text>{row.ip_location || '-'}</Text>
              </>
            )
          }
          return '-'
        },
      },
      {
        title: '实名认证',
        children: [
          {
            title: '真实姓名',
            render: (_, row) => {
              if (row.member_type === MemberType.Member) {
                return row.real_name || '-'
              }
              return <HiX />
            },
          },
          {
            title: '认证状态',
            render: (_, row) => {
              if (row.member_type === MemberType.Member) {
                return row.is_real_name ? (
                  <Icon color="green.500" as={HiCheck} fontSize="2xl" />
                ) : (
                  <Icon color="red.500" as={HiX} fontSize="2xl" />
                )
              }
              return <HiX />
            },
          },
        ],
      },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '测试帐号',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_test}
            onChange={(e) => setTest(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '下注',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_open_bet}
            onChange={(e) => setOpenBet(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '锁定',
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
        title: '密码',
        render: (_, row) => (
          <TipIconButton
            label="密码修改"
            icon={<HiOutlineKey />}
            colorScheme="pink"
            onClick={() => handlePassEdit(row.id)}
          />
        ),
      },
      {
        title: '交易密码',
        render: (_, row) => (
          <TipIconButton
            label="交易密码修改"
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
                label="新增下层"
                icon={<HiPlus />}
                colorScheme="teal"
                onClick={() => handleCreate(row.id)}
              />
            )}
            <TipIconButton
              label="游戏参数"
              icon={<HiStar />}
              colorScheme="purple"
              onClick={() => handleBetSettingEdit(row.id, pid)}
            />
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => handleEdit(row.id)}
            />

            {/* <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            /> */}
          </HStack>
        ),
      },
    ],
    [pid],
  )
  return (
    <>
      {pid && (
        <TipIconButton
          label="回上页"
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
