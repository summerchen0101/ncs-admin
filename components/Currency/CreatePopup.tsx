import { usePopupContext } from '@/context/PopupContext'
import useMarqueeService from '@/utils/services/useMarqueeService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MarqueeFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMarqueeService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      // await doCreate({
      //   content: d.content,
      //   url: d.url,
      //   is_blank: d.is_blank,
      //   start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
      //   end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
      //   is_active: d.is_active,
      // })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MarqueeFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
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
