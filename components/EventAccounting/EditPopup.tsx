import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MarqueeFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useMarqueeService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Marquee>()
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
  const [form] = Form.useForm<MarqueeFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="赛事结帐"
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
