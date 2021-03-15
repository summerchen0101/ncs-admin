import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Faq } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'

function TableData({ list }: { list: Faq[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useFaqService()
  const columns: ColumnsType<Faq> = useMemo(
    () => [
      { title: '分类', render: (_, row) => row.catalogue.name },
      { title: '标题', render: (_, row) => row.title },

      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
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
