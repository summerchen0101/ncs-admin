import BasicTable from '@/components/BasicTable'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import MyCheckBox from '../MyCheckBox'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const router = useRouter()
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '球種', render: (_, row) => '歐足' },
      { title: '賽事編號', render: (_, row) => 'AB1234124' },
      { title: '開賽時間', render: (_, row) => toDateTime(moment().unix()) },
      { title: '聯盟', render: (_, row) => '可愛動物大聯盟' },
      {
        title: '隊伍',
        render: (_, row) => (
          <>
            {/* <Text color="teal.600" fontWeight="bold">
              可愛動物大聯盟
            </Text> */}
            <Text>
              長頸鹿衝鋒隊
              <Text color="red.500" as="span">
                ★
              </Text>
            </Text>
            <Text>小河馬宇宙可愛隊</Text>
          </>
        ),
      },
      { title: '實貨量', render: (_, row) => '2,000' },

      {
        title: '選擇',
        fixed: 'right',
        render: (_, row) => (
          <HStack>
            <MyCheckBox />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
      <BasicTable
        columns={columns}
        data={Array(5)
          .fill('')
          .map((t, i) => ({ id: i }))}
      />
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
