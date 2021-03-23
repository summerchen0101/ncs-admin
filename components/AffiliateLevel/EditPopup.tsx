import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { AffiliateLevel } from '@/types/api/AffiliateLevel'
import useAffiliateLevelService from '@/utils/services/useAffiliateLevelService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { AffiliateLevelFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useAffiliateLevelService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<AffiliateLevel>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
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
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑合营阶级"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          level: viewData.level,
          name: viewData.name,
          active_member_count: viewData.active_member_count,
          active_agent_count: viewData.active_agent_count,
          result_min: viewData.result_min,
          result_percent: viewData.result_percent,
          fee_min: viewData.fee_min,
          fee_percent: viewData.fee_percent,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
