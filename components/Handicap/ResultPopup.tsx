import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingStatus, Section } from '@/lib/enums'
import { sectionOpts } from '@/lib/options'
import { Handicap } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useTransfer from '@/utils/useTransfer'
import { SimpleGrid } from '@chakra-ui/layout'
import { Form, InputNumber, Modal, Radio, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

interface ResultFormProps {
  // section_code: Section
  home_score: number
  away_score: number
  accounting_status: AccountingStatus
}

function ResultPopup() {
  const { setResult } = useHandicapService()
  const [visible, setVisible] = usePopupContext('score')
  const { viewData, accountingSection } = useDataContext<Handicap>()
  const [isScoreRequired, setIsScoreRequired] = useState(true)
  const { toOptionName } = useTransfer()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await setResult({
        id: viewData.id,
        section_code: accountingSection,
        home_score: d.home_score,
        away_score: d.away_score,
        accounting_status: d.accounting_status,
      })
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<ResultFormProps>()

  const initData = useMemo(() => {
    const dataMap = {
      [Section.Full]: {
        home_score: viewData?.home_score,
        away_score: viewData?.away_score,
        accounting_status: viewData?.accounting_status,
      },
      [Section.FirstHalf]: {
        home_score: viewData?.home_half_score,
        away_score: viewData?.away_half_score,
        accounting_status: viewData?.half_accounting_status,
      },
    }
    return dataMap[accountingSection]
  }, [accountingSection, viewData])

  useEffect(() => {
    form.setFieldsValue(initData)
  }, [initData])

  return (
    <Modal
      title={`${toOptionName(sectionOpts, accountingSection)}結帳`}
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={400}
    >
      {viewData && (
        <Form layout="vertical" form={form} initialValues={initData}>
          <Form.Item
            label="結帳類型"
            name="accounting_status"
            rules={[{ required: true }]}
          >
            <Radio.Group
              options={[
                { label: '一般', value: AccountingStatus.Finish },
                { label: '延賽/取消', value: AccountingStatus.Cancel },
              ]}
              onChange={() =>
                setIsScoreRequired(
                  form.getFieldValue('accounting_status') ===
                    AccountingStatus.Finish,
                )
              }
            />
          </Form.Item>
          <SimpleGrid spacing="15px" columns={2}>
            <Form.Item
              label="主隊"
              name="home_score"
              rules={[{ required: isScoreRequired }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="客隊"
              name="away_score"
              rules={[{ required: isScoreRequired }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </SimpleGrid>
        </Form>
      )}
    </Modal>
  )
}

export default ResultPopup
