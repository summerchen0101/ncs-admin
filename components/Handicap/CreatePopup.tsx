import { usePopupContext } from '@/context/PopupContext'
import { GameStatus } from '@/lib/enums'
import useHandicapService from '@/utils/services/useHandicapService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { HandicapFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useHandicapService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        game_status: d.game_status,
        is_open_bet: d.is_open_bet,
        is_active: d.is_active,
        is_auto_accounting: d.is_auto_accounting,
        play_at: d.play_at.unix(),
        accounting_at: d.accounting_at.unix(),
        team_home_id: d.team_home_id,
        team_away_id: d.team_away_id,
        game_code: d.game_code,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<HandicapFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增賽事"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          game_status: GameStatus.Preparing,
          is_open_bet: true,
          is_active: true,
          is_auto_accounting: true,
          play_at: null,
          accounting_at: null,
          team_home_id: null,
          team_away_id: null,
          game_code: null,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
