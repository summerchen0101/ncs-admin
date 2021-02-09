import { usePopupContext } from '@/context/PopupContext'
import useOddsService from '@/utils/services/useOddsService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { OddsFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useOddsService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        content: d.content,
        url: d.url,
        is_blank: d.is_blank,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
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
  const [form] = Form.useForm<OddsFormProps>()
  return (
    <Modal
      title="新增跑馬燈"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          content: '',
          url: '',
          date_range_type: 'forever',
          limit_range: [null, null],
          is_active: true,
          is_blank: false,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
