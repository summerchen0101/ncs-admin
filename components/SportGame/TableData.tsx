import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { SportGame } from '@/types/api/SportGame'
import useSportGameService from '@/utils/services/useSportGameService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: SportGame[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useSportGameService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<SportGame> = useMemo(
    () => [
      {
        title: '名稱',
        render: (_, row) => row.name,
      },
      {
        title: '代碼',
        render: (_, row) => row.code,
      },
      {
        title: '創建時間',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新時間',
        render: (_, row) => toDateTime(row.updated_at),
      },
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
