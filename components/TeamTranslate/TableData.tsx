import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { TeamTranslate } from '@/types/api/TeamTranslate'
import useTeamTranslateService from '@/utils/services/useTeamTranslateService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { gameOpts } from '@/lib/options'

function TableData({ list }: { list: TeamTranslate[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useTeamTranslateService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<TeamTranslate> = useMemo(
    () => [
      {
        title: '球种',
        render: (_, row) => toOptionName(gameOpts, row.league?.game_code),
      },
      { title: '联盟', render: (_, row) => row.league?.name },
      { title: '抓盘名称', render: (_, row) => row.name },
      { title: '修正名称', render: (_, row) => row.fix_name },

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
