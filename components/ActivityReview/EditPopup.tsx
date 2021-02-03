import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { ActivityReviewFormProps } from './FormData'

function EditPopup() {
  const { setStatus } = useActivityReviewService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<ActivityReview>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await setStatus(viewData.id, ProcessStatus.Done)
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<ActivityReviewFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="活動審核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          title: viewData.title,
          content: viewData.content,
          date_range_type: viewData.start_at ? 'limit' : 'forever',
          limit_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.start_at && moment(viewData.start_at * 1000),
          ],
          is_active: viewData.is_active,
          content_mobile: viewData.content_mobile,
          img: viewData.img,
          img_mobile: viewData.img_mobile,
          bonus: viewData.bonus,
        }}
      />
    </Modal>
  )
}

export default EditPopup
