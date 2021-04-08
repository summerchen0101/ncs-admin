import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus, RewardProcess } from '@/lib/enums'
import menu from '@/lib/menu'
import { processStatusOpts, rewardProcessOpts } from '@/lib/options'
import { AffiliateProfit } from '@/types/api/AffiliateProfit'
import useAffiliateProfitService from '@/utils/services/useAffiliateProfitService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: AffiliateProfit[] }) {
  const { toDateTime } = useTransfer()
  const { setViewData } = useDataContext<AffiliateProfit>()
  const [, setReviewVisible] = usePopupContext('editForm')
  // const { fetchById, doPay } = useAffiliateProfitService()
  const handleReview = (data: AffiliateProfit) => {
    setViewData(data)
    setReviewVisible(true)
  }
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<AffiliateProfit> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => {
          if (row.child_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.affiliate.pages.report.path,
                  query: { pid: row.id },
                }}
              >
                <Text color="brand.500" textDecor="underline" as="a">
                  {row.member.acc}[{row.member.name}]
                </Text>
              </Link>
            )
          }
          return `${row.member.acc}[${row.member.name}]`
        },
      },

      {
        title: '结算週期',
        render: (_, row) => row.accounting_date,
      },
      {
        title: '手续费%',
        render: (_, row) => <Text fontWeight="bold">{row.fee_percent}%</Text>,
        align: 'center',
      },
      {
        title: '派发金额',
        render: (_, row) =>
          row.confirmed_at ? (
            <Text fontWeight="bold" color="blue.500">
              {row.fee_profit}
            </Text>
          ) : (
            '-'
          ),
        align: 'center',
      },

      {
        title: '审核状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.confirm_status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.confirm_status)}
            </Tag>
          )
        },
      },
      {
        title: '派彩状态',
        render: (_, row) => {
          const colorMap = {
            [RewardProcess.Finish]: 'green',
            [RewardProcess.Pending]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.pay_status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(rewardProcessOpts, row.pay_status)}
            </Tag>
          )
        },
      },
      {
        title: '审核/拨款时间',
        render: (_, row) => (
          <>
            <Text>{toDateTime(row.confirmed_at)}</Text>
            <Text>{toDateTime(row.paid_at)}</Text>
          </>
        ),
      },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="purple"
              label="审核"
              icon={<HiPencilAlt />}
              // disabled={!!row.confirmed_at}
              onClick={() => handleReview(row)}
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
