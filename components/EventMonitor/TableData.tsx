import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { Handicap } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useCheckList from '@/utils/useCheckList'
import useStorage from '@/utils/useStorage'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import MyCheckBox from '../MyCheckBox'

function TableData({ list }: { list: Handicap[] }) {
  const { toDateTime, toOptionName, toEventId } = useTransfer()
  const { checked, toggleCheckedAll, toggleChecked } = useCheckList(list)
  const [, setEventIds] = useStorage<number[]>('eventIds', [])

  useEffect(() => {
    setEventIds(list.filter((t, i) => checked.includes(i)).map((t) => t.id))
  }, [checked])

  const columns: ColumnsType<Handicap> = useMemo(
    () => [
      {
        title: '球种',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      { title: '赛事编号', render: (_, row) => toEventId(row.id) },
      { title: '开赛时间', render: (_, row) => toDateTime(row.play_at) },
      { title: '联盟', render: (_, row) => row.team_home.league_name },
      {
        title: '队伍',
        render: (_, row) => (
          <>
            {/* <Text color="teal.600" fontWeight="bold">
              可爱动物大联盟
            </Text> */}
            <Text>
              {row.team_home.name}
              <Text color="red.500" as="span">
                ★
              </Text>
            </Text>
            <Text>{row.team_away.name}</Text>
          </>
        ),
      },
      {
        title: '注额累计',
        render: (_, row) => row.bet_sum + row.half_bet_sum,
      },

      {
        title: (
          <Text onClick={toggleCheckedAll} cursor="default">
            全选
          </Text>
        ),
        fixed: 'right',
        render: (_, row, index) => (
          <HStack>
            <MyCheckBox
              isChecked={checked.includes(index)}
              onChange={() => toggleChecked(index)}
            />
          </HStack>
        ),
      },
    ],
    [checked],
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
          前往控盘
        </Button>
      </HStack>
    </>
  )
}

export default TableData
