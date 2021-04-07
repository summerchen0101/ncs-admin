import { usePopupContext } from '@/context/PopupContext'
import useCashflowGroupService from '@/utils/services/useCashflowGroupService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { CashflowGroupFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCashflowGroupService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        code: d.code,
        note: d.note,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<CashflowGroupFormProps>()

  return (
    <Modal
      title="新增金流群组"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={400}
    >
      <FormData
        form={form}
        data={{
          code: '',
          name: '',
          note: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
