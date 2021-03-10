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
        title: 'IP位址',
        render: (_, row) => row.ip,
      },
      {
        title: '類型',
        render: (_, row) => toOptionName(IPBlockTypeOpts, row.ip_block_type),
      },
      {
        title: '端口設置',
        render: (_, row) => toOptionName(platformTypeOpts, row.platform_type),
      },
      {
        title: '備註',
        render: (_, row) => row.note,
      },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
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
              label="編輯"
              icon={<HiPencilAlt />}
              colorScheme="brand"
              onClick={() => fetchById(row.id)}
            />
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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
