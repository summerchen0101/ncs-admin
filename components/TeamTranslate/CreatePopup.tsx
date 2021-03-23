import { usePopupContext } from '@/context/PopupContext'
import useTeamTranslateService from '@/utils/services/useTeamTranslateService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { TeamTranslateFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useTeamTranslateService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        fix_name: d.fix_name,
        league_id: d.league_id,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<TeamTranslateFormProps>()

  return (
    <Modal
      title="新增队伍翻译"
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
          league_id: null,
          is_active: true,
          game_code: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
