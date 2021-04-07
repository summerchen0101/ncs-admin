import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { CashflowPkg } from '@/types/api/CashflowPkg'
import useCashflowPkgService from '@/utils/services/useCashflowPkgService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { CashflowPkgFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useCashflowPkgService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<CashflowPkg>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        content: d.content,
        url: d.url,
        is_blank: d.is_blank,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<CashflowPkgFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑支付系统"
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
          id: viewData.id,
          content: viewData.content,
          url: viewData.url,
          date_range_type: viewData.start_at ? 'limit' : 'forever',
          limit_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.end_at && moment(viewData.end_at * 1000),
          ],
          is_active: viewData.is_active,
          is_blank: viewData.is_blank,
        }}
      />
    </Modal>
  )
}

export default EditPopup
