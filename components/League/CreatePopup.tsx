import { usePopupContext } from '@/context/PopupContext'
import useLeagueService from '@/utils/services/useLeagueService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { LeagueFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useLeagueService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueFormProps>()
  return (
    <Modal
      title="新增聯盟"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          bet365_code: '',
          note: '',
          game_id: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
