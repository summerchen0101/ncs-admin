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
      title="储值审核"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="通过"
      cancelText="驳回"
      cancelButtonProps={{ danger: true, type: 'primary' }}
    >
      {/* bank_acc: "012312300002"
bank_branch: "台中分行"
bank_name: "合作金库商业银行(006)"
bank_person: "蔡苹果3" */}
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="储值单号">
          c0vg21tnf4qap9a9cp30
        </Descriptions.Item>
        <Descriptions.Item label="金流商">绿界</Descriptions.Item>
        <Descriptions.Item label="支付方式">信用卡</Descriptions.Item>
        <Descriptions.Item label="分行名称">台中分行</Descriptions.Item>
        <Descriptions.Item label="帐户名称">蔡苹果</Descriptions.Item>
        <Descriptions.Item label="申请人">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="提领金额">
          <Text fontSize="lg" fontWeight="500" color="blue.500">
            ${toCurrency(2000)}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="申请时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
