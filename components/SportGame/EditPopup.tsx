import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { SportGame } from '@/types/api/SportGame'
import useSportGameService from '@/utils/services/useSportGameService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportGameFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useSportGameService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<SportGame>()
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
  const [form] = Form.useForm<SportGameFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯球種"
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
          country_id: viewData.country.id,
          sport_id: viewData.sport.id,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
