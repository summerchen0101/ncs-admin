import { usePopupContext } from '@/context/PopupContext'
import useLeagueService from '@/utils/services/useLeagueService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { LeagueFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useLeagueService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueFormProps>()

  return (
    <Modal
      title="新增联盟"
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
          game_code: '',
          group_code: '',
          is_active: true,
          note: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
