import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { CashflowMerchant } from '@/types/api/CashflowMerchant'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Button, Descriptions, Input, InputNumber, Modal, Select } from 'antd'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import CurrencyInputNumber from '../CurrencyInputNumber'

function EditPopup() {
  const { setStatus } = useWithdrawRecService()
  const [currentMerchant, setCurrentMerchant] = useState<number>()
  const [cashflowMerchantOpts] = useOptionsContext().cashflowMerchant
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<WithdrawRec>()
  const { toCurrency, toDateTime } = useTransfer()
  const toast = useToast()
  const handleSubmit = async (status: ProcessStatus) => {
    // if (!currentMerchant) {
    //   toast({ status: 'warning', title: '请选择金流商户', duration: 2000 })
    //   return
    // }
    try {
      await setStatus({
        id: viewData.id,
        status,
        merchant_id: currentMerchant,
      })
      setVisible(false)
    } catch (err) {}
  }

  const handleCancel = async () => {
    setVisible(false)
  }

  if (!viewData) return <></>
  return (
    <Modal
      title="提领审核"
      visible={visible}
      onCancel={handleCancel}
      footer={
        <HStack justify="flex-end">
          {/* <Button onClick={handleCancel}>取消</Button> */}
          <Button
            type="primary"
            danger
            onClick={() => handleSubmit(ProcessStatus.Cancel)}
          >
            驳回
          </Button>
          <Button
            type="primary"
            onClick={() => handleSubmit(ProcessStatus.Finish)}
          >
            通过
          </Button>
        </HStack>
      }
    >
      {/* bank_acc: "012312300002"
bank_branch: "台中分行"
bank_name: "合作金库商业银行(006)"
bank_person: "蔡苹果3" */}
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="银行名称">
          {viewData.bank_name}
        </Descriptions.Item>
        <Descriptions.Item label="分行名称">
          {viewData.bank_branch}
        </Descriptions.Item>
        <Descriptions.Item label="帐户名称">
          {viewData.bank_acc} ({viewData.bank_person})
        </Descriptions.Item>
        <Descriptions.Item label="申请人">
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="提领金额">
          <Text fontWeight="bold">${toCurrency(viewData.amount)}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="提领手续费">
          <Text>${toCurrency(viewData.fee)}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="金流手续费">
          <Text>${toCurrency(viewData.payment_fee)}</Text>
        </Descriptions.Item>

        <Descriptions.Item label="申请时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="出款金额">
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            $
            {toCurrency(
              numeral(viewData.amount)
                .subtract(viewData.fee)
                .subtract(viewData.payment_fee)
                .value(),
            )}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="金流商户">
          <Select
            options={cashflowMerchantOpts}
            placeholder="请选择"
            onChange={(id) => setCurrentMerchant(id as number)}
            style={{ width: '100%' }}
          />
        </Descriptions.Item>
        {/* <Descriptions.Item label="备注">
          <Input.TextArea />
        </Descriptions.Item> */}
      </Descriptions>
    </Modal>
  )
}

export default EditPopup
