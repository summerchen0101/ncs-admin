import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Merchant } from '@/types/api/Merchant'
import useMerchantService from '@/utils/services/useMerchantService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MerchantFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useMerchantService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Merchant>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        domain: d.domain || undefined,
        biz_email: d.biz_email || undefined,
        biz_telegram: d.biz_telegram,
        finance_email: d.finance_email || undefined,
        finance_telegram: d.finance_telegram,
        tech_email: d.tech_email || undefined,
        tech_telegram: d.tech_telegram,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MerchantFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑商户"
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
          name: viewData.name,
          prefix: viewData.prefix,
          domain: viewData.domain,
          biz_email: viewData.biz_email,
          biz_telegram: viewData.biz_telegram,
          finance_email: viewData.finance_email,
          finance_telegram: viewData.finance_telegram,
          tech_email: viewData.tech_email,
          tech_telegram: viewData.tech_telegram,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
