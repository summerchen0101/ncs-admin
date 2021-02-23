import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '注单编号', render: (_, row) => 'AB1234124' },
      { title: '會員名稱', render: (_, row) => 'ruby(RUBY)' },
      { title: '下注時間', render: (_, row) => toDateTime(row.updated_at) },
      { title: '歸帳日', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '下注項目',
        render: (_, row) => (
          <Box>
            歐足 XXX聯盟 全場-反波膽 <br />
            可愛大象隊(主) vs 可愛和馬隊 @0.95 2-3
          </Box>
        ),
      },
      { title: '下注金額', render: (_, row) => '2,000' },
      { title: '有效金額', render: (_, row) => '2,000' },
      {
        title: '會員結果',
        render: (_, row) => <Text color="red.500">-1,000</Text>,
      },

      {
        title: '佔成資訊',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              icon={<HiOutlineEye />}
              onClick={() => fetchById(row.id)}
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
