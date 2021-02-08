import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Sport } from '@/types/api/Sport'
import useSportService from '@/utils/services/useSportService'
import useTransfer from '@/utils/useTransfer'
import { HStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

function TableData({ list }: { list: Sport[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useSportService()
  const columns: ColumnsType<Sport> = useMemo(
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
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencilAlt />}
              onClick={() => fetchById(row.id)}
            />
            {/* <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            /> */}
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
