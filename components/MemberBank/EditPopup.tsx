import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { MemberBank } from '@/types/api/MemberBank'
import useMemberBankService from '@/utils/services/useMemberBankService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React from 'react'
import { Image } from '@chakra-ui/react'

function EditPopup() {
  const { setConfirm } = useMemberBankService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<MemberBank>()
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
      title="銀行卡審核"
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
        <Descriptions.Item label="銀行名稱">{viewData.name}</Descriptions.Item>
        <Descriptions.Item label="分行名稱">
          {viewData.branch}
        </Descriptions.Item>
        <Descriptions.Item label="帳戶名稱">
          {viewData.person}
        </Descriptions.Item>
        <Descriptions.Item label="銀行帳號">{viewData.acc}</Descriptions.Item>
        <Descriptions.Item label="存摺封面">
          <Image src={viewData.img} />
        </Descriptions.Item>

        <Descriptions.Item label="申請時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
