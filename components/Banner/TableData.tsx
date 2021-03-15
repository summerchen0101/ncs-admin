import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Banner } from '@/types/api/Banner'
import useBannerService from '@/utils/services/useBannerService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Image, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: Banner[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useBannerService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Banner> = useMemo(
    () => [
      { title: '主题', render: (_, row) => row.title },
      {
        title: '图片',
        render: (_, row) => (
          <Image
            src={row.img_mobile}
            boxSize={['100px', '150px']}
            objectFit="cover"
            minW={['100px', 'auto']}
          />
        ),
      },
      {
        title: '开始日期',
        render: (_, row) => (row.start_at ? toDate(row.start_at) : '-'),
      },
      {
        title: '结束日期',
        render: (_, row) => (row.end_at ? toDate(row.end_at) : '-'),
      },
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
