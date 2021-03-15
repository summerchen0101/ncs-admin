import { usePopupContext } from '@/context/PopupContext'
import useMemberTagService from '@/utils/services/useMemberTagService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MemberTagFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberTagService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        color: d.color,
        content: d.content,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MemberTagFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增会员级别"
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
          color: '',
          content: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
