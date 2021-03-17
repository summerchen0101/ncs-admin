import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import {
  ActivityRecStatus,
  ProcessStatus,
  ReviewStatus,
  RewardProcess,
} from '@/lib/enums'
import {
  activityRecStatusOpts,
  processStatusOpts,
  reviewStatusOpts,
  rewardProcessOpts,
} from '@/lib/options'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { BiDollar } from 'react-icons/bi'
import {
  HiCurrencyDollar,
  HiOutlineCurrencyDollar,
  HiPencilAlt,
  HiStar,
} from 'react-icons/hi'

function TableData({ list }: { list: ActivityReview[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doPay } = useActivityReviewService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<ActivityReview> = useMemo(
    () => [
      {
        title: '达标等级',
        render: (_, row) => (
          <Text color="brown.500" fontSize="18px" fontWeight="bold">
            白金级
          </Text>
        ),
      },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '总会员数', render: (_, row) => '124' },
      { title: '有效会员数', render: (_, row) => '92' },
      {
        title: '本期佣金绩效',
        children: [
          { title: '活跃会员数', render: (_, row) => '68' },
          // 活跃会员标准：当月存款金额≥1000，当月总流水≥15000
          { title: '输赢结果', render: (_, row) => '12,1220' },
          { title: '会员流水量', render: (_, row) => '232,220' },
          { title: '会员储值金', render: (_, row) => '231,220' },
        ],
      },
      {
        title: (
          <>
            <Text>退佣金额</Text>
            <Text>佣金比例</Text>
          </>
        ),
        render: (_, row) => (
          <>
            <Text fontSize="16px" fontWeight="600" color="pink.500">
              21,000
            </Text>
            <Text>20%</Text>
          </>
        ),
      },

      {
        title: '审核状态',
        render: (_, row) => {
          // const colorMap = {
          //   [ReviewStatus.Recieve]: 'green',
          //   [ReviewStatus.Reject]: 'red',
          // }
          return (
            <Tag colorScheme="green" variant="solid" borderRadius="sm">
              {toOptionName(reviewStatusOpts, ReviewStatus.Recieve)}
            </Tag>
          )
        },
      },
      {
        title: '派彩状态',
        render: (_, row) => {
          // const colorMap = {
          //   [RewardProcess.Finish]: 'green',
          //   [RewardProcess.Pending]: 'red',
          // }
          return (
            <Tag colorScheme="red" variant="solid" borderRadius="sm">
              {toOptionName(rewardProcessOpts, RewardProcess.Pending)}
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
              disabled={!!row.confirmed_at}
              onClick={() => fetchById(row.id)}
            />
          </HStack>
        ),
      },
      {
        title: '派彩',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="pink"
              label="派彩"
              icon={<BiDollar />}
              onClick={() => doPay(row.id)}
              disabled={!!row.paid_at}
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
