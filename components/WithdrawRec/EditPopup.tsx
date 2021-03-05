import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { Descriptions, Modal } from 'antd'
import React, { useEffect } from 'react'

function EditPopup() {
  const { setStatus } = useWithdrawRecService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<WithdrawRec>()
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
      title="提領審核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="通過"
      cancelText="駁回"
      cancelButtonProps={{ danger: true, type: 'primary' }}
    >
      {/* bank_acc: "012312300002"
bank_branch: "台中分行"
bank_name: "合作金庫商業銀行(006)"
bank_person: "蔡蘋果3" */}
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="銀行名稱">
          合作金庫商業銀行(006)
        </Descriptions.Item>
        <Descriptions.Item label="分行名稱">台中分行</Descriptions.Item>
        <Descriptions.Item label="帳戶名稱">蔡蘋果</Descriptions.Item>
        <Descriptions.Item label="申請人">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="提領金額">
          <Text fontSize="lg" fontWeight="500" color="brand.500">
            ${toCurrency(2000)}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="申請時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
