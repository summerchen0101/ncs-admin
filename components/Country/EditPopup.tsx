import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Country } from '@/types/api/Country'
import useCountryService from '@/utils/services/useCountryService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { CountryFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useCountryService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Country>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, name: d.name })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<CountryFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑国家"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
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
