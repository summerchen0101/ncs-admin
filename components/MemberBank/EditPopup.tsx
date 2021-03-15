import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { MemberBank } from '@/types/api/MemberBank'
import useMemberBankService from '@/utils/services/useMemberBankService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React, { useEffect } from 'react'
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
      title="银行卡审核"
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
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="银行名称">{viewData.name}</Descriptions.Item>
        <Descriptions.Item label="分行名称">
          {viewData.branch}
        </Descriptions.Item>
        <Descriptions.Item label="帐户名称">
          {viewData.person}
        </Descriptions.Item>
        <Descriptions.Item label="银行帐号">{viewData.acc}</Descriptions.Item>
        <Descriptions.Item label="存折封面">
          <Image src={viewData.img} />
        </Descriptions.Item>

        <Descriptions.Item label="申请时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
