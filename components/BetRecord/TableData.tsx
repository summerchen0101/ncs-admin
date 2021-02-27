import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { accountingStatusOpts, gameOpts, sectionOpts } from '@/lib/options'
import { BetRecord } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlineEye } from 'react-icons/hi'

function TableData({ list }: { list: BetRecord[] }) {
  const { toDateTime } = useTransfer()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const [, setViewVisible] = usePopupContext('view')
  const { setViewData } = useDataContext<BetRecord>()
  const { fetchBetRatios } = useBetRecordService()
  const handleLevelView = async (d: BetRecord) => {
    await fetchBetRatios(d.id)
    setViewData(d)
    setViewVisible(true)
  }
  const columns: ColumnsType<BetRecord> = useMemo(
    () => [
      {
        title: '注单编号',
        render: (_, row) => row.sn,
      },
      { title: '會員名稱', render: (_, row) => `${row.acc}[${row.name}]` },
      { title: '下注時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '結帳狀態',
        render: (_, row) =>
          toOptionName(accountingStatusOpts, row.accounting_status),
      },
      {
        title: '歸帳日',
        render: (_, row) => toDate(row.handicap.accounting_at),
      },
      {
        title: '下注項目',
        render: (_, row) => (
          <Box>
            <HStack>
              <Text color="teal.500" fontWeight="bold">
                {toOptionName(gameOpts, row.game_code)}
              </Text>
              <Text>{row.handicap.team_home.league_name}</Text>
              <Text fontWeight="bold">
                {toOptionName(sectionOpts, row.section_code)}-反波膽
              </Text>
            </HStack>
            <HStack>
              <HStack spacing="3px">
                <Text>{row.handicap.team_home.name}</Text>
                <Text color="red.500">(主)</Text>
                <Text>vs</Text>
                <Text>{row.handicap.team_away.name}</Text>
              </HStack>
              <Text color="brand.500" d="inline">
                @{(row.odds * 100).toFixed(2)}
              </Text>{' '}
              <Text>
                {row.home_point}-{row.away_point}
              </Text>
            </HStack>
          </Box>
        ),
      },
      { title: '下注金額', render: (_, row) => toCurrency(row.amount) },
      { title: '有效金額', render: (_, row) => toCurrency(row.valid_amount) },
      {
        title: '會員結果',
        render: (_, row) => <Text>{toCurrency(row.valid_amount)}</Text>,
      },
      {
        title: '退水',
        render: (_, row) => <Text>{toCurrency(row.rebate)}</Text>,
      },
      {
        title: '佔成資訊',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              icon={<HiOutlineEye />}
              onClick={() => handleLevelView(row)}
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
