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
  const { setStatus, setActive, fetchUserById } = useAdminRoleService()
  const [_, setVisible] = usePopupContext('editForm')
  const columns: ColumnType<AdminRole>[] = useMemo(
    () => [
      { title: '帳號', code: 'acc' },
      { title: '暱稱', code: 'name' },
      {
        title: '角色',
        render: (_, row) => row.roles.map((t) => t.name).join(','),
      },
      { title: '上次登入時間', render: (_, row) => toDateTime(row.logined_at) },
      { title: '上次登入IP', code: 'login_ip' },
      {
        title: '鎖定',
        render: (_, row) => (
          <Switch
            colorScheme="red"
            isChecked={row.status === 2}
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
        title: '密碼',
        render: () => (
          <TipIconButton label="密碼修改" icon={<HiOutlinePencilAlt />} />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencilAlt />}
              onClick={() => fetchUserById(row.id)}
            />
            <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
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
