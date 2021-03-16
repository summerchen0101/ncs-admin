import { usePopupContext } from '@/context/PopupContext'
import useMerchantService from '@/utils/services/useMerchantService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { MerchantFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMerchantService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        acc: d.acc,
        pass: d.pass,
        prefix: d.prefix,
        domain: d.domain,
        biz_email: d.biz_email,
        biz_telegram: d.biz_telegram,
        finance_email: d.finance_email,
        finance_telegram: d.finance_telegram,
        tech_email: d.tech_email,
        tech_telegram: d.tech_telegram,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MerchantFormProps>()

  return (
    <Modal
      title="新增商户"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          name: '',
          acc: '',
          pass: '',
          prefix: '',
          domain: '',
          biz_email: '',
          biz_telegram: '',
          finance_email: '',
          finance_telegram: '',
          tech_email: '',
          tech_telegram: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
