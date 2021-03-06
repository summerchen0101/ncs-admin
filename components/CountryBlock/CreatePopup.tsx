import { usePopupContext } from '@/context/PopupContext'
import { IPBlockType, PlatformType } from '@/lib/enums'
import useCountryBlockService from '@/utils/services/useCountryBlockService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { CountryBlockFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCountryBlockService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
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
  return (
    <Modal
      title="新增黑名單國家"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          code: null,
          platform_type: PlatformType.Admin,
          note: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
