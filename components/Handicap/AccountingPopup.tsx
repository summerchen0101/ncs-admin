import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { sectionOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Modal } from 'antd'
import React from 'react'
import AccountingItem from './AccountingItem'

function AccountingPopup() {
  const [visible, setVisible] = usePopupContext('score')
  const { viewData } = useDataContext<Member>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  if (!viewData) return <></>
  return (
    <Modal
      title="賽事結帳"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      {/* <AccountingItem title="即時比分" /> */}
      {sectionOpts.map((t, i) => (
        <AccountingItem key={i} title={t.label} section={t} />
      ))}
    </Modal>
  )
}

export default AccountingPopup
