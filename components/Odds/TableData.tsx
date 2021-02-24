import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Odds } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'

function TableData({ list }: { list: Odds[] }) {
  const {
    setActive,
    fetchById,
    doDelete,
    setOpenBet,
    setAutoOdds,
  } = useOddsService()
  const { toOptionName, toCurrency } = useTransfer()
  const columns: ColumnsType<Odds> = useMemo(
    () => [
      {
        title: '球種',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '場次',
        render: (_, row) => toOptionName(sectionOpts, row.section_code),
      },
      {
        title: '玩法',
        render: (_, row) => toOptionName(playOpts, row.play_code),
      },

      {
        title: '比分',
        render: (_, row) => `${row.home_point}-${row.away_point}`,
      },

      {
        title: '單注上限',
        render: (_, row) => toCurrency(row.single_bet_limit),
      },
      {
        title: '單注下限',
        render: (_, row) => toCurrency(row.single_bet_least),
      },
      {
        title: '單場上限',
        render: (_, row) => toCurrency(row.single_game_limit),
      },

      {
        title: '賠率',
        render: (_, row) => row.odds,
      },
      {
        title: '降陪金額',
        render: (_, row) => toCurrency(row.auto_odds_amount_unit),
      },
      {
        title: '降陪比例',
        render: (_, row) => toCurrency(row.auto_odds_rate_unit),
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
        title: '自動降賠',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_auto_odds}
            onChange={(e) => setAutoOdds(row.id, e.target.checked)}
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
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencilAlt />}
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
