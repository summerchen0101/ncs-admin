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
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '达标等级',
        render: (_, row) => (
          <Text color="brown.500" fontWeight="bold">
            白金级
          </Text>
        ),
      },

      // { title: '总会员数', render: (_, row) => '124' },
      { title: '有效会员数', render: (_, row) => '92' },
      { title: '活跃会员数', render: (_, row) => '68' },
      // 活跃会员标准：当月存款金额≥1000，当月总流水≥15000
      { title: '会员输赢结果', render: (_, row) => '12,1220' },
      { title: '有效投注量', render: (_, row) => '232,220' },
      { title: '会员储值金', render: (_, row) => '231,220' },

      {
        title: '佣金比例',
        render: (_, row) => (
          <Text color="brown.500" fontWeight="bold">
            20%
          </Text>
        ),
      },
      {
        title: '佣金金额',
        render: (_, row) => (
          <Text fontWeight="600" color="pink.500" fontSize="md">
            21,000
          </Text>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
