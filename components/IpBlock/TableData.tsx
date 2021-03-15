import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { IpBlock } from '@/types/api/IpBlock'
import useIpBlockService from '@/utils/services/useIpBlockService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { IPBlockTypeOpts, platformTypeOpts } from '@/lib/options'

function TableData({ list }: { list: IpBlock[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useIpBlockService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<IpBlock> = useMemo(
    () => [
      {
        title: 'IP地址',
        render: (_, row) => row.ip,
      },
      {
        title: '类型',
        render: (_, row) => toOptionName(IPBlockTypeOpts, row.ip_block_type),
      },
      {
        title: '端口设置',
        render: (_, row) => toOptionName(platformTypeOpts, row.platform_type),
      },
      {
        title: '备注',
        render: (_, row) => row.note || '-',
      },
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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
