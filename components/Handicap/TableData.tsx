import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Handicap } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { gameOpts, gameStatusOpts } from '@/lib/options'

function TableData({ list }: { list: Handicap[] }) {
  const {
    setActive,
    fetchById,
    setOpenBet,
    setAutoAccounting,
  } = useHandicapService()
  const { toOptionName, toDate, toShortDateTime } = useTransfer()
  const columns: ColumnsType<Handicap> = useMemo(
    () => [
      { title: '開賽時間', render: (_, row) => toShortDateTime(row.play_at) },
      {
        title: '球種',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '狀態',
        render: (_, row) => toOptionName(gameStatusOpts, row.game_status),
      },
      { title: '聯盟', render: (_, row) => row.league.name },
      { title: '主隊', render: (_, row) => row.team_home.name },
      { title: '客隊', render: (_, row) => row.team_away.name },
      {
        title: '自動結帳',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_auto_accounting}
            onChange={(e) => setAutoAccounting(row.id, e.target.checked)}
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
        title: '上架',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
