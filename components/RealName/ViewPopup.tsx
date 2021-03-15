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
      title="实名审核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      okText="通过"
    >
      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ width: '100px' }}
      >
        <Descriptions.Item label="会员">
          {viewData.member?.acc} [{viewData.member?.name}]
        </Descriptions.Item>
        <Descriptions.Item label="真实姓名">{viewData.name}</Descriptions.Item>

        <Descriptions.Item label="身分证">
          <Image src={viewData.id_card_img} />
        </Descriptions.Item>

        <Descriptions.Item label="申请时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          {toDateTime(viewData.updated_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
