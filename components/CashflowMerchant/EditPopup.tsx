import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { CashflowMerchant } from '@/types/api/CashflowMerchant'
import useCashflowMerchantService from '@/utils/services/useCashflowMerchantService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { CashflowMerchantFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useCashflowMerchantService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<CashflowMerchant>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        sort: d.sort,
        name: d.name,
        prefix: d.prefix,
        merchant_id: d.merchant_id,
        hash_key: d.hash_key,
        hash_iv: d.hash_iv,
        base_url: d.base_url,
        deposit_return_url: d.deposit_return_url,
        withdraw_return_url: d.withdraw_return_url,
        withdraw_fee: +d.withdraw_fee,
        withdraw_fee_percent: +d.withdraw_fee_percent,
        withdraw_limit_day: +d.withdraw_limit_day,
        withdraw_limit_week: +d.withdraw_limit_week,
        withdraw_limit_mon: +d.withdraw_limit_mon,
        note: d.note,
        sys_code: d.sys_code,
        group_code: d.group_code,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<CashflowMerchantFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑金流商戶"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={800}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          sort: viewData.sort,
          name: viewData.name,
          prefix: viewData.prefix,
          merchant_id: viewData.merchant_id,
          hash_key: viewData.hash_key,
          hash_iv: viewData.hash_iv,
          base_url: viewData.base_url,
          deposit_return_url: viewData.deposit_return_url,
          withdraw_return_url: viewData.withdraw_return_url,
          withdraw_fee: viewData.withdraw_fee,
          withdraw_fee_percent: viewData.withdraw_fee_percent,
          withdraw_limit_day: viewData.withdraw_limit_day,
          withdraw_limit_week: viewData.withdraw_limit_week,
          withdraw_limit_mon: viewData.withdraw_limit_mon,
          note: viewData.note,
          sys_code: viewData.sys_code,
          group_code: viewData.group_code,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
