import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ReviewStatus, RewardProcess } from '@/lib/enums'
import { reviewStatusOpts, rewardProcessOpts } from '@/lib/options'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiPencilAlt } from 'react-icons/hi'

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
        title: '结算週期',
        render: (_, row) => '2021-03',
      },
      {
        title: '佣金资讯',
        children: [
          // {
          //   title: '会员输赢',
          //   render: (_, row) => '20,221',
          // },
          // {
          //   title: '优惠礼金',
          //   render: (_, row) => '3,221',
          // },
          // {
          //   title: '公司费用',
          //   render: (_, row) => '1,921',
          // },

          {
            title: '上期未派',
            render: (_, row) => <Text fontWeight="bold">1,280</Text>,
          },
          // {
          //   title: '佣金比例',
          //   render: (_, row) => (
          //     <>
          //       <Text>20%</Text>
          //     </>
          //   ),
          //   align: 'center',
          // },
          // { title: '总累计佣金', render: (_, row) => '231,220' },
          {
            title: '本期佣金',
            render: (_, row) => <Text fontWeight="bold">31,000</Text>,
            align: 'center',
          },
          {
            title: '本期派发',
            render: (_, row) => (
              <Text color="red.500" fontWeight="bold" fontSize="md">
                32,280
              </Text>
            ),
          },
        ],
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
