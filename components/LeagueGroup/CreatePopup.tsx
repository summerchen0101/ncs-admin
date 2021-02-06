import { usePopupContext } from '@/context/PopupContext'
import useLeagueGroupService from '@/utils/services/useLeagueGroupService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { LeagueGroupFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useLeagueGroupService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        code: d.code,
        name: d.name,
        is_active: d.is_active,
        game_code: d.game_code,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueGroupFormProps>()
  return (
    <Modal
      title="新增聯盟群組"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          code: '',
          game_code: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
