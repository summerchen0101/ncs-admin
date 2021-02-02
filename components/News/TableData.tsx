import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { newsTypeOpts } from '@/lib/options'
import { News } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: News[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useNewsService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<News> = useMemo(
    () => [
      {
        title: '類型',
        render: (_, row) => toOptionName(newsTypeOpts, row.news_type),
      },
      { title: '標題', render: (_, row) => row.title },
      { title: '開始日期', render: (_, row) => toDate(row.start_at) },
      { title: '結束日期', render: (_, row) => toDate(row.end_at) },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencilAlt />}
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
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
