import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React from 'react'

function EditPopup() {
  const { setStatus } = useActivityReviewService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<ActivityReview>()
  const { toCurrency, toDateTime } = useTransfer()
  const handleSubmit = async () => {
    try {
      await setStatus(viewData.id, ProcessStatus.Finish)
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = async () => {
    try {
      await setStatus(viewData.id, ProcessStatus.Cancel)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="活動審核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="通過"
      cancelText="駁回"
      cancelButtonProps={{ danger: true, type: 'primary' }}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="活動名稱">
          {viewData.activity.title}
        </Descriptions.Item>
        <Descriptions.Item label="申請人">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="活動獎金">
          ${toCurrency(viewData.bonus)}
        </Descriptions.Item>
        <Descriptions.Item label="申請時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
