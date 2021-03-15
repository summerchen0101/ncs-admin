import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '球种', render: (_, row) => '欧足' },
      { title: '赛事编号', render: (_, row) => 'AB1234124' },
      { title: '开赛时间', render: (_, row) => toDateTime(row.updated_at) },
      { title: '联盟', render: (_, row) => '123大联盟' },
      {
        title: '队伍',
        render: (_, row) => (
          <Box>
            可爱大象队(主)
            <br />
            可爱河马队
          </Box>
        ),
      },
      { title: '累计下注', render: (_, row) => '2,000' },
      { title: '有效金额', render: (_, row) => '2,000' },
      { title: '结帐时间', render: (_, row) => '-' },

      {
        title: '查看',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              colorScheme="brand"
              icon={<HiPencilAlt />}
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
