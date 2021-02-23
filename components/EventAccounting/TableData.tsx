import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '球種', render: (_, row) => '歐足' },
      { title: '賽事編號', render: (_, row) => 'AB1234124' },
      { title: '開賽時間', render: (_, row) => toDateTime(row.updated_at) },
      { title: '聯盟', render: (_, row) => '123大聯盟' },
      {
        title: '隊伍',
        render: (_, row) => (
          <Box>
            可愛大象隊(主)
            <br />
            可愛河馬隊
          </Box>
        ),
      },
      { title: '累計下注', render: (_, row) => '2,000' },
      { title: '有效金額', render: (_, row) => '2,000' },
      { title: '結帳時間', render: (_, row) => '-' },

      {
        title: '結帳',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              icon={<HiOutlinePencilAlt />}
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
