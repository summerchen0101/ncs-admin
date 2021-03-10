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
        title: '球種',
        render: (_, row) => '美棒',
      },
      {
        title: '場次',
        render: (_, row) => '全場',
      },
      {
        title: '玩法',
        render: (_, row) => '反波膽',
      },
      {
        title: '單注上限',
        render: (_, row) => '100,000',
      },
      {
        title: '單注下限',
        render: (_, row) => '100',
      },
      {
        title: '單邊',
        render: (_, row) => '500,000',
      },
      {
        title: '單場',
        render: (_, row) => '800,000',
      },

      {
        title: '創建時間',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新時間',
        render: (_, row) => toDateTime(row.updated_at),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiPencilAlt />}
              colorScheme="brand"
              onClick={() => fetchById(row.id)}
            />
            {/* <TipIconButton
              label="刪除"
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
