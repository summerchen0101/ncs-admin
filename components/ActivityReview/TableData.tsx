import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: ActivityReview[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useActivityReviewService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<ActivityReview> = useMemo(
    () => [
      { title: '活動名稱', render: (_, row) => row.activity.title },
      {
        title: '申請人',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '金額', render: (_, row) => `$${toCurrency(row.bonus)}` },
      { title: '申請時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '狀態',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green.500',
            [ProcessStatus.Cancel]: 'red.500',
          }
          return (
            <Text color={colorMap[row.status]}>
              {toOptionName(processStatusOpts, row.status)}
            </Text>
          )
        },
      },
      { title: '審核人員', render: (_, row) => row.editor || '-' },
      { title: '審核時間', render: (_, row) => toDateTime(row.confirmed_at) },
      { title: '撥款時間', render: (_, row) => toDateTime(row.paid_at) },
      {
        title: '審核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="purple"
              label="審核"
              icon={<HiPencilAlt />}
              onClick={() => fetchById(row.id)}
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
