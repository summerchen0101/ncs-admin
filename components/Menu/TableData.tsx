import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Menu } from '@/types/api/Menu'
import useMenuService from '@/utils/services/useMenuService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Icon, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import * as HiIcons from 'react-icons/hi'

function TableData({ list }: { list: Menu[] }) {
  const [, setCreateVisible] = usePopupContext('createForm')
  const { setViewId } = useDataContext<Menu>()
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMenuService()
  const handleCreateChild = (id: number) => {
    setViewId(id)
    setCreateVisible(true)
  }
  const columns: ColumnsType<Menu> = useMemo(
    () => [
      { width: '60px' },
      { title: '名稱', render: (_, row) => row.name },
      { title: '路徑', render: (_, row) => row.path },
      {
        title: '圖示',
        render: (_, row) => {
          const Comp = HiIcons[row.icon]
          if (!row.icon) {
            return '-'
          }
          return <Icon as={Comp} fontSize="18px" />
        },
      },

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
              colorScheme="teal"
              label="新增下層"
              icon={<HiIcons.HiPlus />}
              disabled={!!row.parent_id}
              onClick={() => handleCreateChild(row.id)}
            />
            <TipIconButton
              label="編輯"
              icon={<HiIcons.HiOutlinePencilAlt />}
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="刪除"
              icon={<HiIcons.HiOutlineTrash />}
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
