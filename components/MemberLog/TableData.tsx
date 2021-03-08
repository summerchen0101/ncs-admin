import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberLog } from '@/types/api/MemberLog'
import useMemberLogService from '@/utils/services/useMemberLogService'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Spacer, Stack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

function TableData({ list }: { list: MemberLog[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete, doDeleteAll } = useMemberLogService()
  // const { dateRanges } = useTransfer()

  const handleBatchRemove = async () => {
    await doDeleteAll({
      start_at: 0,
      end_at: moment().subtract(2, 'month').unix(),
    })
  }
  const columns: ColumnsType<MemberLog> = useMemo(
    () => [
      { title: '登入時間', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      { title: 'IP', render: (_, row) => row.ip },
      { title: '位址', render: (_, row) => row.ip_location },
      {
        title: '操作',
        fixed: 'right',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="刪除"
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
    <>
      <Stack direction={['column', 'row']}>
        <Spacer />
        <Button
          borderRadius="sm"
          colorScheme="purple"
          h="35px"
          onClick={handleBatchRemove}
          leftIcon={<HiOutlineTrash />}
          mb="10px"
        >
          清除2個月前紀錄
        </Button>
      </Stack>
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
