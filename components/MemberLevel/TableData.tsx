import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberTag } from '@/types/api/MemberTag'
import useMemberTagService from '@/utils/services/useMemberTagService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Icon, Switch, Tag } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash, HiCheck } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: MemberTag[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useMemberTagService()
  const columns: ColumnsType<MemberTag> = useMemo(
    () => [
      {
        title: '级别名称',
        render: (_, row, index) => `VIP${index + 1}`,
        fixed: true,
      },
      { title: '金流群组', render: (_, row) => '默认' },
      {
        title: '套用/保级条件',
        children: [
          { title: '累计流水', render: (_, row) => '10,000' },
          { title: '累计储值', render: (_, row) => '3,000' },
          { title: '保级流水', render: (_, row) => '1,000' },
        ],
      },
      {
        title: '提款相关',
        children: [
          { title: '单笔上限', render: (_, row) => '100,000' },
          { title: '单笔下限', render: (_, row) => '500' },
          { title: '提领额度(日)', render: (_, row) => '无上限' },
          { title: '手续费%', render: (_, row) => '1.2%' },
          { title: '免手续费(日)', render: (_, row) => '1次' },
        ],
      },
      {
        title: '专属礼包',
        children: [
          {
            title: '生日礼金',
            render: (_, row) => '1,000',
          },
          {
            title: '升级礼金',
            render: (_, row) => '2,000',
          },
          {
            title: '每月红包',
            render: (_, row) => '500',
          },
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
  return (
    <BasicTable
      columns={columns}
      data={Array(3)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
