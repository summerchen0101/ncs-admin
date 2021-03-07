import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Box, Button, Checkbox, HStack, Text, VStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const router = useRouter()
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
      { title: '實貨量', render: (_, row) => '2,000' },

      {
        title: '選擇',
        fixed: 'right',
        render: (_, row) => (
          <HStack>
            <Checkbox colorScheme="teal" size="lg" />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
      <BasicTable columns={columns} data={list} />
      <HStack mt="4" justifyContent="flex-end">
        <Button
          colorScheme="teal"
          borderRadius="sm"
          onClick={() =>
            process.browser &&
            window.open(`${location.origin}/event/monitor/details`, '_blank')
          }
        >
          前往控盤
        </Button>
      </HStack>
    </>
  )
}

export default TableData
