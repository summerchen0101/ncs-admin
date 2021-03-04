import { usePopupContext } from '@/context/PopupContext'
import useMemberTagService from '@/utils/services/useMemberTagService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { MemberTagFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberTagService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        content: d.content,
      })

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {

    setVisible(false)
  }
  const [form] = Form.useForm<MemberTagFormProps>()
  return (
    <Modal
      title="新增会员标签"
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
          content: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
