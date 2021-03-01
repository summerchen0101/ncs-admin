import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingStatus, Section } from '@/lib/enums'
import { OptionType } from '@/types'
import { Handicap } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Center, Stack, VStack } from '@chakra-ui/layout'
import { Select, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useMemo } from 'react'

interface AccountingItemProps {
  title: string
  section?: OptionType
}

interface AccountingFormProps {
  // section_code: Section
  home_score: number
  away_score: number
  accounting_status: AccountingStatus
}
function AccountingItem({ title, section }: AccountingItemProps) {
  const { setResult } = useHandicapService()
  const [, setVisible] = usePopupContext('score')
  const { viewData } = useDataContext<Handicap>()
  const [form] = useForm<AccountingFormProps>()

  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await setResult({
        id: viewData.id,
        section_code: section.value as Section,
        home_score: d.home_score,
        away_score: d.away_score,
        accounting_status: d.accounting_status,
      })
      setVisible(false)
    } catch (err) {}
  }
  const initData = useMemo<AccountingFormProps>(() => {
    const scoreMap = {
      [Section.Full]: {
        home_score: viewData.home_score,
        away_score: viewData.away_score,
      },
      [Section.FirstHalf]: {
        home_score: viewData.home_half_score,
        away_score: viewData.away_half_score,
      },
    }
    return {
      ...scoreMap[section.value],
      accounting_status: viewData.accounting_status,
    }
  }, [viewData, section])
  return (
    <Stack
      as={Form}
      form={form}
      alignItems="stretch"
      mb="4"
      direction={['column', 'row']}
      onSubmit={handleSubmit}
      initialValues={initData}
    >
      <Center
        w="100px"
        bg="blue.500"
        color="white"
        fontWeight="bold"
        borderRadius="sm"
      >
        {title}
      </Center>
      <VStack>
        <Form.Item
          name={[section.value, 'home_score']}
          fieldKey={[section.value, 'home_score']}
          noStyle
        >
          <Input placeholder="主" size="sm" />
        </Form.Item>
        <Form.Item
          name={[section.value, 'away_score']}
          fieldKey={[section.value, 'away_score']}
          noStyle
        >
          <Input placeholder="客" size="sm" />
        </Form.Item>
      </VStack>
      <VStack flex="1">
        <Form.Item
          name={[section.value, 'accounting_status']}
          fieldKey={[section.value, 'accounting_status']}
          noStyle
        >
          <Box
            as={Select}
            w="full"
            defaultValue={AccountingStatus.Finish}
            options={[
              { label: '一般', value: AccountingStatus.Finish },
              { label: '延賽/取消', value: AccountingStatus.Cancel },
            ]}
          />
        </Form.Item>
        <Button
          w="full"
          size="sm"
          colorScheme="teal"
          borderRadius="sm"
          type="submit"
        >
          結帳
        </Button>
      </VStack>
    </Stack>
  )
}

export default AccountingItem
