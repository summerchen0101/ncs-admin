import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { CountryBlock } from '@/types/api/CountryBlock'
import useCountryBlockService from '@/utils/services/useCountryBlockService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { countryOpts, platformTypeOpts } from '@/lib/options'

function TableData({ list }: { list: CountryBlock[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useCountryBlockService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<CountryBlock> = useMemo(
    () => [
      {
        title: '國別',
        render: (_, row) => toOptionName(countryOpts, row.code),
      },
      {
        title: '端口設置',
        render: (_, row) => toOptionName(platformTypeOpts, row.platform_type),
      },
      { title: '更新時間', render: (_, row) => toDateTime(row.updated_at) },
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
              icon={<HiOutlinePencilAlt />}
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
