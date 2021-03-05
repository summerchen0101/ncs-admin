import { usePopupContext } from '@/context/PopupContext'
import useSportGameService from '@/utils/services/useSportGameService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SportGameFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSportGameService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        code: d.code,
        name: d.name,
        is_active: d.is_active,
        country_code: d.country_code,
        sport_code: d.sport_code,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SportGameFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增球种"
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
          code: '',
          country_code: '',
          sport_code: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
