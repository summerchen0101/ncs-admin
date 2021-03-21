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
          profit_min: viewData.profit_min,
          profit_max: viewData.profit_max,
          profit_percent: viewData.profit_percent,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
