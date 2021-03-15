import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { DefaultBet } from '@/types/api/DefaultBet'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: DefaultBet[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useDefaultBetService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<DefaultBet> = useMemo(
    () => [
      {
        title: '球种',
        render: (_, row) => '美棒',
      },
      {
        title: '场次',
        render: (_, row) => '全场',
      },
      {
        title: '玩法',
        render: (_, row) => '反波胆',
      },
      {
        title: '单注上限',
        render: (_, row) => '100,000',
      },
      {
        title: '单注下限',
        render: (_, row) => '100',
      },
      {
        title: '单边',
        render: (_, row) => '500,000',
      },
      {
        title: '单场',
        render: (_, row) => '800,000',
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
  return (
    <BasicTable
      columns={columns}
      data={Array(2)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
