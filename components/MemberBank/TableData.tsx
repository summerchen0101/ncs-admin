import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { MemberBank } from '@/types/api/MemberBank'
import useMemberBankService from '@/utils/services/useMemberBankService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: MemberBank[] }) {
  const { toDateTime } = useTransfer()
  const { setConfirm, fetchById, doDelete } = useMemberBankService()
  const columns: ColumnsType<MemberBank> = useMemo(
    () => [
      {
        title: '会员帐号',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '银行名称', render: (_, row) => row.name },
      { title: '分行名称', render: (_, row) => row.branch },
      { title: '帐户名称', render: (_, row) => row.person },
      { title: '银行帐号', render: (_, row) => row.acc },
      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '通过',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_confirm}
            onChange={(e) => setConfirm(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="审核"
              colorScheme="purple"
              icon={<HiPencilAlt />}
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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
