import { usePopupContext } from '@/context/PopupContext'
import useCashflowMerchantService from '@/utils/services/useCashflowMerchantService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { CashflowMerchantFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCashflowMerchantService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
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
        gateways: d.gateways.map((t) => ({
          merchant_id: t.merchant_id,
          payment_type: t.payment_type,
          single_deposit_least: +t.single_deposit_least,
          single_deposit_limit: +t.single_deposit_limit,
          deposit_fee: +t.deposit_fee,
          deposit_fee_percent: +t.deposit_fee_percent,
          deposit_limit_day: +t.deposit_limit_day,
          deposit_limit_week: +t.deposit_limit_week,
          deposit_limit_mon: +t.deposit_limit_mon,
          is_active: t.is_active,
        })),
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<CashflowMerchantFormProps>()

  return (
    <Modal
      title="新增金流商戶"
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
          sort: null,
          name: '',
          prefix: '',
          merchant_id: '',
          hash_key: '',
          hash_iv: '',
          base_url: '',
          deposit_return_url: '',
          withdraw_return_url: '',
          withdraw_fee: null,
          withdraw_fee_percent: null,
          withdraw_limit_day: null,
          withdraw_limit_week: null,
          withdraw_limit_mon: null,
          note: '',
          sys_code: '',
          group_code: '',
          is_active: true,
          gateways: [],
        }}
      />
    </Modal>
  )
}

export default CreatePopup
