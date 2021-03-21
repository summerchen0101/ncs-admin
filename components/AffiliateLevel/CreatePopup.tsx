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
        active_agent_count: +d.active_agent_count,
        result_min: +d.result_min,
        result_percent: +d.result_percent,
        fee_min: +d.fee_min,
        fee_percent: +d.fee_percent,
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
          active_agent_count: null,
          result_min: null,
          result_percent: null,
          fee_min: null,
          fee_percent: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
