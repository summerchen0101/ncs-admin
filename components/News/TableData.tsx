import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { newsTypeOpts } from '@/lib/options'
import { News } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiEye } from 'react-icons/hi'

function TableData({ list }: { list: News[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useNewsService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<News> = useMemo(
    () => [
      {
        title: '类型',
        render: (_, row) => toOptionName(newsTypeOpts, row.news_type),
      },
      { title: '标题', render: (_, row) => row.title },
      {
        title: '开始日期',
        render: (_, row) => (row.start_at ? toDate(row.start_at) : '-'),
      },
      {
        title: '结束日期',
        render: (_, row) => (row.end_at ? toDate(row.end_at) : '-'),
      },
      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '查看',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              icon={<HiEye />}
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
