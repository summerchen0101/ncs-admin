import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { RealName } from '@/types/api/RealName'
import useRealNameService from '@/utils/services/useRealNameService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React, { useEffect } from 'react'
import { Image } from '@chakra-ui/react'

function ViewPopup() {
  const { setConfirm } = useRealNameService()
  const [visible, setVisible] = usePopupContext('view')
  const { viewData } = useDataContext<RealName>()
  const { toCurrency, toDateTime } = useTransfer()
  const handleSubmit = async () => {
    try {
      await setConfirm(viewData.id, true)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="實名審核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      okText="通過"
    >
      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ width: '100px' }}
      >
        <Descriptions.Item label="會員">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="真實姓名">黃小琥</Descriptions.Item>

        <Descriptions.Item label="身分證">
          <Image src={viewData.img} />
        </Descriptions.Item>

        <Descriptions.Item label="申請時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
