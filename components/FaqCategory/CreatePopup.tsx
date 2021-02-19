import { usePopupContext } from '@/context/PopupContext'
import useFaqCategoryService from '@/utils/services/useFaqCategoryService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { FaqCategoryFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useFaqCategoryService()
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
  const [form] = Form.useForm<FaqCategoryFormProps>()
  return (
    <Modal
      title="新增分类"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          sort: 0,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
