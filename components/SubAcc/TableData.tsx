import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { SubAcc } from '@/types/api/SubAcc'
import useSubAccService from '@/utils/services/useSubAccService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import {
  HiOutlineKey,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: SubAcc[] }) {
  const { toDateTime } = useTransfer()
  const { setStatus, setActive, fetchById, doDelete } = useSubAccService()
  const { setViewId } = useDataContext<SubAcc>()
  const [, setPasswordVisible] = usePopupContext('passForm')
  const handlePasswordEdit = (id: number) => {
    setViewId(id)
    setPasswordVisible(true)
  }
  const columns: ColumnsType<SubAcc> = useMemo(
    () => [
      { title: '帳號', render: (_, row) => row.acc },
      { title: '暱稱', render: (_, row) => row.name },
      { title: '備註', render: (_, row) => '-' },
      { title: '上次登入時間', render: (_, row) => toDateTime(row.logined_at) },
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
        title: '密碼',
        render: (_, row) => (
          <TipIconButton
            label="密碼修改"
            icon={<HiOutlineKey />}
            onClick={() => handlePasswordEdit(row.id)}
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
