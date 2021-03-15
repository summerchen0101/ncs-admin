import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlineKey, HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: AdminUser[] }) {
  const { toDateTime } = useTransfer()
  const { setStatus, setActive, fetchById, doDelete } = useAdminUserService()
  const { setViewId } = useDataContext<AdminUser>()
  const [, setPasswordVisible] = usePopupContext('passForm')
  const handlePasswordEdit = (id: number) => {
    setViewId(id)
    setPasswordVisible(true)
  }
  const columns: ColumnsType<AdminUser> = useMemo(
    () => [
      { title: '帐号', render: (_, row) => row.acc },
      { title: '暱称', render: (_, row) => row.name },
      {
        title: '角色',
        render: (_, row) => row.roles.map((t) => t.name).join(',') || '-',
      },
      { title: '上次登录时间', render: (_, row) => toDateTime(row.logined_at) },
      { title: '上次登录IP', render: (_, row) => row.login_ip },
      {
        title: '锁定',
        render: (_, row) => (
          <Switch
            colorScheme="red"
            isChecked={row.status === BlockStatus.Blocked}
            onChange={(e) =>
              setStatus(
                row.id,
                e.target.checked ? BlockStatus.Blocked : BlockStatus.Normal,
              )
            }
          />
        ),
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
        title: '密码',
        render: (_, row) => (
          <TipIconButton
            label="密码修改"
            icon={<HiOutlineKey />}
            colorScheme="pink"
            onClick={() => handlePasswordEdit(row.id)}
          />
        ),
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
            <TipIconButton
              label="删除"
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
