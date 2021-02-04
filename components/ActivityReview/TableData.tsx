import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

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
      { title: '審核人員', render: (_, row) => row.editor },
      { title: '審核時間', render: (_, row) => toDateTime(row.confirmed_at) },
      { title: '撥款時間', render: (_, row) => toDateTime(row.paid_at) },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="審核"
              icon={<HiOutlinePencilAlt />}
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
