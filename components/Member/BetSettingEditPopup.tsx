import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import { Modal } from 'antd'
import React, { useEffect } from 'react'
import BetSettingsTabGroup from './BetSettingsTabGroup'

function BetSettingEditPopup() {
  const [visible, setVisible] = usePopupContext('betSetting')
  const { viewData, setBetSettingMemberType } = useDataContext<Member>()
  useEffect(() => {
    setBetSettingMemberType(viewData?.member_type)
  }, [viewData])
  return (
    <Modal
      title="遊戲參數設定"
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      width={1000}
      destroyOnClose
      footer={false}
    >
      <BetSettingsTabGroup isEdit />
    </Modal>
  )
}

export default BetSettingEditPopup
