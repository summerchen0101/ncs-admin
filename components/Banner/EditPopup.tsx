import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Banner } from '@/types/api/Banner'
import useBannerService from '@/utils/services/useBannerService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { BannerFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useBannerService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Banner>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        title: d.title,
        url: d.url,
        is_blank: d.is_blank,
        start_at: d.date_range?.[0].startOf('day').unix() || 0,
        end_at: d.date_range?.[1].unix() || 0,
        is_active: d.is_active,
        img: d.img,
        img_mobile: d.img_mobile,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<BannerFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑轮播图"
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
          title: viewData.title,
          url: viewData.url,
          date_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.end_at && moment(viewData.end_at * 1000),
          ],
          is_active: viewData.is_active,
          is_blank: viewData.is_blank,
          img: viewData.img,
          img_mobile: viewData.img_mobile,
        }}
      />
    </Modal>
  )
}

export default EditPopup
