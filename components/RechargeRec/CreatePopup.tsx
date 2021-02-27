import { usePopupContext } from '@/context/PopupContext'
import { RechargeType } from '@/lib/enums'
import useRechargeRecService from '@/utils/services/useRechargeRecService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { RechargeRecFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useRechargeRecService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<RechargeRecFormProps>()
  return (
    <Modal
      title="人工加扣點"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          acc: '',
          amount: null,
          note: '',
          recharge_type: RechargeType.Add,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
