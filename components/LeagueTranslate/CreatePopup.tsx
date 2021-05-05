import { usePopupContext } from '@/context/PopupContext'
import { SportGame } from '@/lib/enums'
import useLeagueTranslateService from '@/utils/services/useLeagueTranslateService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { LeagueTranslateFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useLeagueTranslateService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        fix_name: d.fix_name,
        game_code: d.game_code,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueTranslateFormProps>()

  return (
    <Modal
      title="新增联盟翻译"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          name: '',
          fix_name: '',
          is_active: true,
          game_code: SportGame.Soccor,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
