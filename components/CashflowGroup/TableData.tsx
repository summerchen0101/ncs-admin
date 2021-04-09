import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { CashflowGroup } from '@/types/api/CashflowGroup'
import useCashflowGroupService from '@/utils/services/useCashflowGroupService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: CashflowGroup[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useCashflowGroupService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<CashflowGroup> = useMemo(
    () => [
      { title: '群组名称', render: (_, row) => row.name },
      { title: '群组代码', render: (_, row) => row.code },
      // { title: '绑定支付系统数', render: (_, row) => '2' },
      { title: '备注', render: (_, row) => row.note || '-' },
      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
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
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => fetchById(row.id)}
            />
            {/* <TipIconButton
              label="删除"
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
