import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Country } from '@/types/api/Country'
import useCountryService from '@/utils/services/useCountryService'
import useTransfer from '@/utils/useTransfer'
import { HStack } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'

function TableData({ list }: { list: Country[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doDelete } = useCountryService()
  const columns: ColumnsType<Country> = useMemo(
    () => [
      {
        title: '名称',
        render: (_, row) => row.name,
      },
      {
        title: '代码',
        render: (_, row) => row.code,
      },
      {
        title: '创建时间',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新时间',
        render: (_, row) => toDateTime(row.updated_at),
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
            {/* <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            /> */}
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
