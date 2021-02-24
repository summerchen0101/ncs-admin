import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { sectionOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { Box, Center, HStack, Stack, VStack } from '@chakra-ui/layout'
import { Input, Modal, Select } from 'antd'
import React from 'react'
import AccountingItem from './AccountingItem'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Member>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  if (!viewData) return <></>
  const teams = [
    { label: '主', value: 1 },
    { label: '客', value: 2 },
  ]
  return (
    <Modal
      title="賽事結帳"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <AccountingItem title="即時比分" />
      {sectionOpts.map((t, i) => (
        <AccountingItem key={i} title={t.label} />
      ))}
      {/* <SimpleGrid spacing={3} columns={2}>
        {sectionOpts.map((g, g_i) => (
          <VStack key={g_i} whiteSpace="nowrap">
            <Text fontSize="16px" fontWeight="500">
              {g.label}
            </Text>
            <Descriptions bordered size="small" column={1}>
              {playOpts.map((p, p_i) => (
                <DescriptionsItem key={p_i} label={p.label}>
                  <VStack>
                    <Input size="small" />
                    <Input size="small" />
                  </VStack>
                </DescriptionsItem>
              ))}
            </Descriptions>
          </VStack>
        ))}
      </SimpleGrid> */}
    </Modal>
  )
}

export default ViewPopup
