import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { sectionOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { Box, Center, HStack, Stack, VStack } from '@chakra-ui/layout'
import { Input, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
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
      title="赛事结帐"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <AccountingItem title="即时比分" />
      {sectionOpts.map((t, i) => (
        <AccountingItem key={i} title={t.label} />
      ))}
    </Modal>
  )
}

export default ViewPopup
