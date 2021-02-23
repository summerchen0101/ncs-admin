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
      await doEdit({
        id: viewData.id,
        name: d.name,
        is_active: d.is_active,
      })
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
          name: viewData.name,
          code: viewData.code,
          country_code: viewData.country_code,
          sport_code: viewData.sport_code,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
