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
        title: '盘口名称',
        render: (_, row) => 'A盘',
      },
      {
        title: '备注',
        render: (_, row) => '-',
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
