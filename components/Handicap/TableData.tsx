import BasicTable from '@/components/BasicTable'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingStatus, Section } from '@/lib/enums'
import menu from '@/lib/menu'
import { accountingStatusOpts, gameOpts, gameStatusOpts } from '@/lib/options'
import { Handicap } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Stack, Switch, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

function TableData({ list }: { list: Handicap[] }) {
  const { setActive, setOpenBet, setAutoAccounting } = useHandicapService()
  const { toOptionName, toCurrency, toShortDateTime, toEventId } = useTransfer()
  const { setViewData, setAccountingSection } = useDataContext<Handicap>()
  const [, setScoreVisible] = usePopupContext('score')
  const handleScoreEdit = async (handicap: Handicap, section: Section) => {
    setAccountingSection(section)
    setViewData(handicap)
    setScoreVisible(true)
  }
  const columns: ColumnsType<Handicap> = useMemo(
    () => [
      {
        title: '賽事編號',
        render: (_, row) => (
          <Link
            href={{
              pathname: menu.event.pages.betRecord.path,
              query: { hid: toEventId(row.id) },
            }}
          >
            {toEventId(row.id)}
          </Link>
        ),
      },
      { title: '開賽時間', render: (_, row) => toShortDateTime(row.play_at) },
      {
        title: '球種',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '狀態',
        render: (_, row) => toOptionName(gameStatusOpts, row.game_status),
      },
      { title: '聯盟', render: (_, row) => row.team_home.league_name },
      {
        title: '隊伍',
        render: (_, row) => (
          <Stack>
            <Text>{row.team_home.name}</Text>
            <Text>{row.team_away.name}</Text>
          </Stack>
        ),
      },

      {
        title: '半場',
        children: [
          {
            title: '比分',
            render: (_, row) => (
              <Stack>
                <Text>{row.home_half_score}</Text>
                <Text>{row.away_half_score}</Text>
              </Stack>
            ),
          },
          {
            title: '注單量',
            render: (_, row) => toCurrency(row.half_bet_count, 0),
          },
          {
            title: '累計注額',
            render: (_, row) => toCurrency(row.half_bet_sum),
          },
          {
            title: '結帳狀態',
            render: (_, row) => {
              const textColorMap = {
                [AccountingStatus.Finish]: 'green.500',
                [AccountingStatus.Cancel]: 'red.500',
              }
              return (
                <Text color={textColorMap[row.half_accounting_status]}>
                  {toOptionName(
                    accountingStatusOpts,
                    row.half_accounting_status,
                  ) || '未結帳'}
                </Text>
              )
            },
          },
          {
            title: '結帳',
            render: (_, row) => (
              <HStack my="-4">
                <TipIconButton
                  label="半場結帳"
                  icon={<HiOutlinePencil />}
                  onClick={() => handleScoreEdit(row, Section.FirstHalf)}
                />
              </HStack>
            ),
          },
        ],
      },

      {
        title: '全場',
        children: [
          {
            title: '比分',
            render: (_, row) => (
              <Stack>
                <Text>{row.home_score}</Text>
                <Text>{row.away_score}</Text>
              </Stack>
            ),
          },
          {
            title: '注單量',
            render: (_, row) => toCurrency(row.bet_count, 0),
          },
          {
            title: '累計注額',
            render: (_, row) => toCurrency(row.bet_sum),
          },
          {
            title: '結帳狀態',
            render: (_, row) => {
              const textColorMap = {
                [AccountingStatus.Finish]: 'green.500',
                [AccountingStatus.Cancel]: 'red.500',
              }
              return (
                <Text color={textColorMap[row.accounting_status]}>
                  {toOptionName(accountingStatusOpts, row.accounting_status) ||
                    '未結帳'}
                </Text>
              )
            },
          },
          {
            title: '結帳',
            render: (_, row) => (
              <HStack my="-4">
                <TipIconButton
                  label="全場結帳"
                  icon={<HiOutlinePencil />}
                  onClick={() => handleScoreEdit(row, Section.Full)}
                />
              </HStack>
            ),
          },
        ],
      },

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
