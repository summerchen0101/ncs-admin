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
        title: '角色名称',
        render: (_, row) => row.name,
      },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '创建时间',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新时间',
        render: (_, row) => toDateTime(row.updated_at),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => fetchById(row.id)}
            />
            <Popconfirm
              title="是否确认删除？"
              placement="left"
              onConfirm={() => doDelete(row.id)}
              okText="确认"
              cancelText="取消"
            >
              <TipIconButton
                label="删除"
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
