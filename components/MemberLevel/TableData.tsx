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
      { title: '级别名称', render: (_, row, index) => `VIP${index + 1}` },
      { title: '金流群组', render: (_, row) => '默认' },
      {
        title: '套用条件',
        children: [
          { title: '累计流水', render: (_, row) => '10,000' },
          { title: '推荐会员数', render: (_, row) => '3' },
        ],
      },
      {
        title: '出金条件',
        children: [
          { title: '累计流水', render: (_, row) => '15,000' },
          { title: '单笔下限', render: (_, row) => '500' },
          { title: '单笔上限', render: (_, row) => '100,000' },
          { title: '手续费%', render: (_, row) => '1.2%' },
        ],
      },
      {
        title: '级别会员数',
        children: [
          { title: '符合资格', render: (_, row) => '230' },
          { title: '已套用', render: (_, row) => '180' },
        ],
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
