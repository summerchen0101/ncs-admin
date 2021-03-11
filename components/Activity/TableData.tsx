import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { newsTypeOpts } from '@/lib/options'
import { Activity } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: Activity[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useActivityService()
  const { toCurrency, toDate } = useTransfer()
  const columns: ColumnsType<Activity> = useMemo(
    () => [
      { title: '標題', render: (_, row) => row.title },
      {
        title: '開始日期',
        render: (_, row) => (row.start_at ? toDate(row.start_at) : '-'),
      },
      {
        title: '結束日期',
        render: (_, row) => (row.end_at ? toDate(row.end_at) : '-'),
      },
      {
        title: '紅利',
        render: (_, row) => <Text>${toCurrency(row.bonus)}</Text>,
      },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
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
              icon={<HiPencilAlt />}
              colorScheme="brown"
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
