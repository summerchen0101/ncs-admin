import { usePopupContext } from '@/context/PopupContext'
import useCashflowMerchantService from '@/utils/services/useCashflowMerchantService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { CashflowMerchantFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCashflowMerchantService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({ ...d, gateways: d.gateways })
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
      width={700}
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
