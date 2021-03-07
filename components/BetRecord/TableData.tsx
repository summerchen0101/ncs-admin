import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { accountingStatusColorMap } from '@/lib/colorMaps'
import { AccountingStatus, Section } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, sectionOpts } from '@/lib/options'
import { BetRecord } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import numeral from 'numeral'
import React, { useMemo } from 'react'
import {
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineEye,
} from 'react-icons/hi'
import ColorText from '../ColorText'
import TableSummary from './TableSummary'

function TableData({ list }: { list: BetRecord[] }) {
  const { toDateTime } = useTransfer()
  const { toOptionName, toDate, toCurrency, toEventId } = useTransfer()
  const [, setViewVisible] = usePopupContext('view')
  const { copyToClipboard } = useHelper()
  const { setViewData } = useDataContext<BetRecord>()
  const { fetchBetRatios } = useBetRecordService()
  const router = useRouter()
  const handleLevelView = async (d: BetRecord) => {
    await fetchBetRatios(d.id)
    setViewData(d)
    setViewVisible(true)
  }
  const columns: ColumnsType<BetRecord> = useMemo(
    () => [
      {
        title: '注单编号',
        render: (_, row) => (
          <HStack>
            <Text>{row.sn}</Text>
            <TipIconButton
              label="複製"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() => copyToClipboard(row.sn)}
            />
          </HStack>
        ),
      },
      {
        title: '會員名稱',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      { title: '下注時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '歸帳日',
        render: (_, row) => toDate(row.handicap.accounting_at),
      },
      {
        title: '下注項目',
        render: (_, row) => (
          <Box>
            <HStack fontWeight="bold">
              <Text color="yellow.700">#{toEventId(row.handicap.id)}</Text>
              <Text color="blue.500">
                {toOptionName(gameOpts, row.game_code)}
              </Text>
              <Text color="teal.500">{row.handicap.team_home.league_name}</Text>
              <Text color="yellow.700">
                [{toOptionName(sectionOpts, row.section_code)}] 反波膽
              </Text>
            </HStack>
            <HStack>
              <HStack spacing="3px">
                <Text>★{row.handicap.team_home.name}</Text>
                <Text>vs</Text>
                <Text>{row.handicap.team_away.name}</Text>
              </HStack>
              <Text color="red.500" d="inline">
                @{(row.odds * 100).toFixed(2)}
              </Text>{' '}
              <Text fontWeight="600">
                {row.home_point}-{row.away_point}
              </Text>
            </HStack>
          </Box>
        ),
      },
      {
        title: '結帳狀態',
        render: (_, row) => {
          return (
            <Text color={accountingStatusColorMap[row.accounting_status]}>
              {toOptionName(accountingStatusOpts, row.accounting_status)}
            </Text>
          )
        },
      },
      {
        title: '比分',
        render: (_, row) => {
          if (row.section_code === Section.Full) {
            return row.handicap.accounting_status === AccountingStatus.Finish
              ? `${row.handicap.home_score}-${row.handicap.away_score}`
              : '-'
          }
          return row.handicap.half_accounting_status === AccountingStatus.Finish
            ? `${row.handicap.home_half_score}-${row.handicap.away_half_score}`
            : '-'
        },
      },
      { title: '下注金額', render: (_, row) => toCurrency(row.amount) },
      { title: '有效金額', render: (_, row) => toCurrency(row.valid_amount) },
      {
        title: '服務費',
        render: (_, row) => <ColorText num={row.fee} />,
      },
      {
        title: '退水',
        render: (_, row) => <Text>{toCurrency(row.rebate)}</Text>,
      },
      {
        title: '會員結果',
        render: (_, row) => <ColorText num={row.result} />,
      },
      {
        title: '佔成資訊',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              colorScheme="blue"
              icon={<HiOutlineEye />}
              onClick={() => handleLevelView(row)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
      {router?.query?.from && (
        <TipIconButton
          label="回上頁"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      <TableSummary />
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
