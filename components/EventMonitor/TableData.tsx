import BasicTable from '@/components/BasicTable'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useCheckList from '@/utils/useCheckList'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo, useState } from 'react'
import MyCheckBox from '../MyCheckBox'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const [fakeList, setFakeList] = useState(
    Array(5)
      .fill('')
      .map((t, i) => ({ id: i })),
  )
  const { checked, toggleCheckedAll, toggleChecked } = useCheckList(fakeList)
  console.log(checked)
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '球种', render: (_, row) => '欧足' },
      { title: '赛事编号', render: (_, row) => 'AB1234124' },
      { title: '开赛时间', render: (_, row) => toDateTime(moment().unix()) },
      { title: '联盟', render: (_, row) => '可爱动物大联盟' },
      {
        title: '队伍',
        render: (_, row) => (
          <>
            {/* <Text color="teal.600" fontWeight="bold">
              可爱动物大联盟
            </Text> */}
            <Text>
              长颈鹿冲锋队
              <Text color="red.500" as="span">
                ★
              </Text>
            </Text>
            <Text>小河马宇宙可爱队</Text>
          </>
        ),
      },
      { title: '实货量', render: (_, row) => '2,000' },

      {
        title: (
          <Text onClick={toggleCheckedAll} cursor="default">
            全选
          </Text>
        ),
        fixed: 'right',
        render: (_, row) => (
          <HStack>
            <MyCheckBox
              isChecked={checked.includes(row.id)}
              onChange={() => toggleChecked(row.id)}
            />
          </HStack>
        ),
      },
    ],
    [checked],
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
          前往控盘
        </Button>
      </HStack>
    </>
  )
}

export default TableData
