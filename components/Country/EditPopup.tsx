import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Country } from '@/types/api/Country'
import useCountryService from '@/utils/services/useCountryService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { CountryFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useCountryService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Country>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, name: d.name })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<CountryFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯國家"
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
        }}
      />
    </Modal>
  )
}

export default EditPopup
