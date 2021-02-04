import { usePopupContext } from '@/context/PopupContext'
import { MemberType } from '@/lib/enums'
import useMessageService from '@/utils/services/useMessageService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { MessageFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMessageService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        title: d.title,
        content: d.content,
        member_type: +d.member_type,
        receivers: d.receivers,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<MessageFormProps>()
  return (
    <Modal
      title="寄送站內信"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          title: '',
          content: '',
          member_type: MemberType.Member,
          receivers: [],
          is_all: false,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
