import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { Merchant, MerchantAllowIpType } from '@/types/api/Merchant'
import useMerchantService from '@/utils/services/useMerchantService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { HStack, Stack, Switch, Text } from '@chakra-ui/react'
import { Button, Popconfirm, Popover } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import {
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiPencilAlt,
} from 'react-icons/hi'

const allowIpPopover = (ips: MerchantAllowIpType[]) => {
  return (
    <>
      {ips.map((t, i) => (
        <Text key={i}>{t.ip}</Text>
      ))}
    </>
  )
}
function TableData({ list }: { list: Merchant[] }) {
  const { setActive, fetchById, generateApiKey } = useMerchantService()
  const { copyToClipboard } = useHelper()
  const columns: ColumnsType<Merchant> = useMemo(
    () => [
      { title: '名稱', render: (_, row) => row.name },
      { title: '前綴', render: (_, row) => row.prefix },
      { title: '網域', render: (_, row) => row.domain || '-' },
      {
        title: '白名單',
        render: (_, row) => {
          if (row.allow_ips.length > 0) {
            return (
              <Popover content={allowIpPopover(row.allow_ips)} title="白名單">
                <Button type="link">{row.allow_ips.length}</Button>
              </Popover>
            )
          }
          return 0
        },
      },
      {
        title: 'API Key',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="複製"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() => copyToClipboard(row.api_key.String)}
            />
            <Popconfirm
              title="是否確定重置API Key?"
              onConfirm={() => generateApiKey(row.id, row.api_key.String)}
              okText="是"
              cancelText="否"
            >
              <TipIconButton
                label="重置API Key"
                icon={<HiOutlineKey />}
                colorScheme="pink"
              />
            </Popconfirm>
          </HStack>
        ),
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
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
