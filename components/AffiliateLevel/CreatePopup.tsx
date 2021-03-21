import { usePopupContext } from '@/context/PopupContext'
import useAffiliateLevelService from '@/utils/services/useAffiliateLevelService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { AffiliateLevelFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useAffiliateLevelService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        level: +d.level,
        name: d.name,
        active_member_count: +d.active_member_count,
        profit_min: +d.profit_min,
        profit_max: +d.profit_max,
        profit_percent: +d.profit_percent,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<AffiliateLevelFormProps>()

  return (
    <Modal
      title="新增合营阶级"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          level: null,
          name: '',
          active_member_count: null,
          profit_min: null,
          profit_max: null,
          profit_percent: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
