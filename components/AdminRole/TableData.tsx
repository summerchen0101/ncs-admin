import BasicTable, { ColumnType } from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

function TableData({ list }: { list: AdminRole[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useAdminRoleService()
  const [_, setVisible] = usePopupContext('editForm')
  const columns: ColumnType<AdminRole>[] = useMemo(
    () => [
      {
        title: '角色名稱',
        render: (_, row) => row.name,
      },
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
