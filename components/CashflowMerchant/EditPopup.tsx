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
      await doEdit({ ...d, id: d.id })
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
      width={700}
    >
      <FormData
        form={form}
        data={{
          ...viewData,
        }}
      />
    </Modal>
  )
}

export default EditPopup
