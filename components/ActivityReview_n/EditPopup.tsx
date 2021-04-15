import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack } from '@chakra-ui/layout'
import { Button, Descriptions, Modal } from 'antd'
import React, { useEffect } from 'react'

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
    setVisible(false)
  }
  const handleReject = async () => {
    try {
      await setStatus(viewData.id, ProcessStatus.Cancel)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="活动审核"
      visible={visible}
      onCancel={handleCancel}
      footer={
        <HStack justify="flex-end">
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" danger onClick={handleReject}>
            駁回
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            通過
          </Button>
        </HStack>
      }
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="活动名称">
          {viewData.activity.title}
        </Descriptions.Item>
        <Descriptions.Item label="申请人">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="活动奖金">
          ${toCurrency(viewData.bonus)}
        </Descriptions.Item>
        <Descriptions.Item label="申请时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup