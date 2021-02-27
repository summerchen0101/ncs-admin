import { usePopupContext } from '@/context/PopupContext'
import { Modal } from 'antd'
import React from 'react'
import BetSettingsTabGroup from './BetSettingsTabGroup'

function BetSettingEditPopup() {
  const [visible, setVisible] = usePopupContext('betSetting')

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
