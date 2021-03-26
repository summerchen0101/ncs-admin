import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Activity } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'

function TableData({ list }: { list: Activity[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useActivityService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Activity> = useMemo(
    () => [
      { title: '组合名称', render: (_, row) => '储值闯关任务' },
      { title: '活动数', render: (_, row) => 3 },
      {
        title: '活动期间',
        render: (_, row) => {
          return (
            <HStack>
              <Text>2021-03-01</Text>
              <Text>~</Text>
              <Text>2021-03-30</Text>
            </HStack>
          )
        },
      },
      { title: '更新时间', render: (_, row) => toDateTime(moment().unix()) },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
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
            <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={Array(3)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
