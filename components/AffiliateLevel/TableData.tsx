import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { AffiliateLevel } from '@/types/api/AffiliateLevel'
import useAffiliateLevelService from '@/utils/services/useAffiliateLevelService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Icon, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { BiDiamond } from 'react-icons/bi'

function TableData({ list }: { list: AffiliateLevel[] }) {
  const { toDateTime, toCurrency } = useTransfer()
  const { setActive, fetchById, doDelete } = useAffiliateLevelService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<AffiliateLevel> = useMemo(
    () => [
      { title: '等级', render: (_, row) => row.level },
      { title: '阶级名称', render: (_, row) => row.name },
      // {
      //   title: '图标',
      //   render: (_, row) => <Icon as={BiDiamond} fontSize="lg" />,
      // },
      { title: '活跃会员数', render: (_, row) => row.active_member_count },
      { title: '有效代理数', render: (_, row) => row.active_agent_count },
      {
        title: '会员输赢结果',
        render: (_, row) => `≥${toCurrency(row.result_min, 0)}`,
      },
      { title: '输赢佣金％', render: (_, row) => `${row.result_percent}%` },
      {
        title: '手续费',
        render: (_, row) => `≥${toCurrency(row.fee_min, 0)}`,
      },
      { title: '手续费佣金％', render: (_, row) => `${row.fee_percent}%` },
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
