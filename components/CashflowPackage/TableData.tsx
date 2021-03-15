import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import { Button, Checkbox, HStack, Radio, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<Marquee> = useMemo(
    () => [
      { title: '排序', render: (_, row, index) => index + 1 },
      { title: '名称', render: (_, row) => '绿界-N' },
      { title: '金流商', render: (_, row) => '绿界' },
      { title: '支付方式', render: (_, row) => '信用卡, ATM' },
      // { title: '轮替群组', render: (_, row) => '默认' },
      {
        title: '轮替资讯',
        children: [
          {
            title: '总入点上限 / 目前累计',
            render: (_, row) => (
              <HStack>
                <Text>100,000 / 80,123</Text>
                <TipIconButton
                  label="清空"
                  icon={<HiOutlineTrash />}
                  colorScheme="purple"
                />
              </HStack>
            ),
          },
          { title: '总累计金额', render: (_, row) => '1280,300' },
          { title: '总轮替次数', render: (_, row) => '212 次' },
        ],
      },
      { title: '更新时间', render: (_, row) => toDateTime(row.updated_at) },
      {
        title: '服务中',
        render: (_, row) => (
          <Radio
            colorScheme="red"
            size="lg"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked
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
