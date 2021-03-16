import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Spacer, Text } from '@chakra-ui/layout'
import { Button, Descriptions, Divider, Modal } from 'antd'
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
      title="績效审核"
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
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="基本資訊"
        bordered
        size="small"
        column={1}
      >
        <Descriptions.Item label="帳號/暱稱">apple3[蘋果3]</Descriptions.Item>
        <Descriptions.Item label="總會員數">100</Descriptions.Item>
        <Descriptions.Item label="有效會員數">80</Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="下層會員績效"
        bordered
        size="small"
        column={1}
      >
        <Descriptions.Item label="活躍會員數">90</Descriptions.Item>
        <Descriptions.Item label="會員淨輸值">123,200</Descriptions.Item>
        <Descriptions.Item label="累計流水量">121,300</Descriptions.Item>
        <Descriptions.Item label="累計儲值金">322,221</Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="本期佣金計算"
        bordered
        size="small"
        column={1}
      >
        <Descriptions.Item label="等級/佣金比例">
          <Text color="blue.500" fontSize="lg" fontWeight="600">
            白金級 20 %
          </Text>
        </Descriptions.Item>
        {/* <Descriptions.Item label="退佣比例">20 %</Descriptions.Item> */}
        <Descriptions.Item label="派彩金額">
          <Text color="pink.500" fontSize="lg" fontWeight="600">
            $ 3,200
          </Text>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
