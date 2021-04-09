import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ThirdParty } from '@/types/api/ThirdParty'
import useThirdPartyService from '@/utils/services/useThirdPartyService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { ThirdPartyFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useThirdPartyService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<ThirdParty>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        note: d.note,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<ThirdPartyFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑金流商"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={400}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          name: viewData.name,
          code: viewData.code,
          note: viewData.note,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
