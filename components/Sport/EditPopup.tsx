import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Sport } from '@/types/api/Sport'
import useSportService from '@/utils/services/useSportService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useSportService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Sport>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, ...d })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<SportFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯國家"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          name: viewData.name,
          code: viewData.code,
          note: viewData.note,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
