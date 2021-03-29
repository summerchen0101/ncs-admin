import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useValidator from '@/utils/useValidator'
import { Form, Input, InputNumber, Modal } from 'antd'
import React, { useEffect } from 'react'
import CurrencyInputNumber from '../CurrencyInputNumber'

function CreditPopup() {
  const { doEditCredit } = useMemberService()
  const [visible, setVisible] = usePopupContext('credit')
  const { viewData } = useDataContext<Member>()
  const [form] = Form.useForm<{ credit: number }>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEditCredit(viewData.id, d.credit)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      title="额度调整"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={400}
      destroyOnClose
    >
      <Form form={form} layout="vertical" validateTrigger="onBlur">
        <Form.Item
          label="额度"
          name="credit"
          rules={[{ required: true }, { type: 'number', message: '须为数字' }]}
          initialValue={viewData?.credit}
        >
          <CurrencyInputNumber style={{ width: '100%' }} step={100} min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreditPopup
