import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Odds } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
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
      // {
      //   title: '球种',
      //   render: (_, row) => (
      //     <Text color="brown.500">{toOptionName(gameOpts, row.game_code)}</Text>
      //   ),
      // },
      // {
      //   title: '场次',
      //   render: (_, row) => (
      //     <Text color="teal.500">
      //       {toOptionName(sectionOpts, row.section_code)}
      //     </Text>
      //   ),
      // },
      // {
      //   title: '玩法',
      //   render: (_, row) => (
      //     <Text color="pink.500">{toOptionName(playOpts, row.play_code)}</Text>
      //   ),
      // },

      {
        title: '比分',
        render: (_, row) => (
          <Text fontSize="md" color="teal.500" fontWeight="bold">
            {row.home_point}-{row.away_point}
          </Text>
        ),
        fixed: true,
      },

      {
        title: '单注下限',
        render: (_, row) => toCurrency(row.single_bet_least),
      },
      {
        title: '单注上限',
        render: (_, row) => toCurrency(row.single_bet_limit),
      },
      {
        title: '单边上限',
        render: (_, row) => toCurrency(row.single_bet_least),
      },
      {
        title: '单场上限',
        render: (_, row) => toCurrency(row.single_game_limit),
      },

      {
        title: '(主)赔率',
        children: [
          { title: '抓盘', render: (_, row) => row.home_auto_odds },
          { title: '押跳', render: (_, row) => row.home_fix_odds },
          { title: '控盘', render: (_, row) => row.home_odds },
        ],
      },
      {
        title: '(客)赔率',
        children: [
          { title: '抓盘', render: (_, row) => row.away_auto_odds },
          { title: '押跳', render: (_, row) => row.away_fix_odds },
          { title: '控盘', render: (_, row) => row.away_odds },
        ],
      },
      {
        title: '降赔金额',
        render: (_, row) => toCurrency(row.auto_odds_amount_unit),
      },
      {
        title: '降赔比例',
        render: (_, row) => toCurrency(row.auto_odds_rate_unit),
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
        title: '自动降赔',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_auto_odds}
            onChange={(e) => setAutoOdds(row.id, e.target.checked)}
          />
        ),
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
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brand"
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            />
          </HStack>
        ),
        fixed: 'right',
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
