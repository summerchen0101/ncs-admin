import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { Popconfirm } from 'antd'

function TableData({ list }: { list: AdminRole[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useAdminRoleService()
  const columns: ColumnsType<AdminRole> = useMemo(
    () => [
      {
        title: '角色名稱',
        render: (_, row) => row.name,
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
              icon={<HiPencilAlt />}
              colorScheme="orange"
              onClick={() => fetchById(row.id)}
            />
            <Popconfirm
              title="是否確認刪除？"
              placement="left"
              onConfirm={() => doDelete(row.id)}
              okText="確認"
              cancelText="取消"
            >
              <TipIconButton
                label="刪除"
                icon={<HiOutlineTrash />}
                colorScheme="red"
              />
            </Popconfirm>
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
