import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { DefaultBet } from '@/types/api/DefaultBet'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { DefaultBetFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useDefaultBetService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<DefaultBet>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
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
  const [form] = Form.useForm<DefaultBetFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑下注設定"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          game_code: viewData.game_code,
        }}
      />
    </Modal>
  )
}

export default EditPopup
