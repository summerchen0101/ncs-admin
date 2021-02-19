import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { CountryBlock } from '@/types/api/CountryBlock'
import useCountryBlockService from '@/utils/services/useCountryBlockService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { CountryBlockFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useCountryBlockService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<CountryBlock>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        code: d.code,
        platform_type: d.platform_type,
        note: d.note,
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
  const [form] = Form.useForm<CountryBlockFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑黑名单国家"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          platform_type: viewData.platform_type,
          code: viewData.code,
          note: viewData.note,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
