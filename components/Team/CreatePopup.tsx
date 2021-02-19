import { usePopupContext } from '@/context/PopupContext'
import useTeamService from '@/utils/services/useTeamService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { TeamFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useTeamService()
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
  const [form] = Form.useForm<TeamFormProps>()
  return (
    <Modal
      title="新增队伍"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          name_en: '',
          note: '',
          game_code: '',
          league_id: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
