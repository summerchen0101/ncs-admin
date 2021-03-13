import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberTag } from '@/types/api/MemberTag'
import useMemberTagService from '@/utils/services/useMemberTagService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Tag } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: MemberTag[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useMemberTagService()
  const columns: ColumnsType<MemberTag> = useMemo(
    () => [
      { title: '級別名稱', render: (_, row, index) => `VIP${index + 1}` },
      { title: '金流群組', render: (_, row) => '預設' },
      {
        title: '套用條件',
        children: [
          { title: '累計流水', render: (_, row) => '10,000' },
          { title: '推薦會員數', render: (_, row) => '3' },
        ],
      },
      {
        title: '出金條件',
        children: [
          { title: '累計流水', render: (_, row) => '15,000' },
          { title: '單筆下限', render: (_, row) => '500' },
          { title: '單筆上限', render: (_, row) => '100,000' },
          { title: '手續費%', render: (_, row) => '1.2%' },
        ],
      },
      {
        title: '級別會員數',
        children: [
          { title: '符合資格', render: (_, row) => '230' },
          { title: '已套用', render: (_, row) => '180' },
        ],
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiPencilAlt />}
              colorScheme="brown"
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
