import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { MemberShadow } from '@/types/api/MemberShadow'
import useSubAccService from '@/utils/services/useMemberShadowService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlineKey, HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: MemberShadow[] }) {
  const { toDateTime } = useTransfer()
  const { setStatus, setActive, fetchById, doDelete } = useSubAccService()
  const { setViewId } = useDataContext<MemberShadow>()
  const [, setPasswordVisible] = usePopupContext('passForm')
  const handlePasswordEdit = (id: number) => {
    setViewId(id)
    setPasswordVisible(true)
  }
  const columns: ColumnsType<MemberShadow> = useMemo(
    () => [
      { title: '帐号', render: (_, row) => row.acc },
      { title: '暱称', render: (_, row) => row.name },
      { title: '备注', render: (_, row) => row.note || '-' },
      { title: '上次登录时间', render: (_, row) => toDateTime(row.logined_at) },
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
