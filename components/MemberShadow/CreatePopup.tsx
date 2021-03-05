import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import useSubAccService from '@/utils/services/useMemberShadowService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SubAccFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSubAccService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        acc: d.acc,
        pass: d.pass,
        name: d.name,
        note: d.note,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SubAccFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增子帳號"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          note: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
