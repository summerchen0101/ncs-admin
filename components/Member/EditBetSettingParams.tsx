import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { paramsOpts } from './FormData'

interface BetSettingParamsProps {
  game: OptionType
  section: OptionType
  play: OptionType
  parentParams?: Partial<BetSetting>
  data: BetSetting
}

function EditBetSettingParams({
  game,
  section,
  play,
  parentParams,
  data,
}: BetSettingParamsProps) {
  const { doEditBetSetting, fetchBetSetting } = useMemberService()
  const [form] = useForm<BetSetting>()
  const handleSubmit = async () => {
    const d = await form.validateFields()
    try {
      await doEditBetSetting({
        id: data.id,
        ...d,
      })
    } catch (err) {}
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 7]}>
        {paramsOpts.map((t, t_i) => (
          <Form.Item
            key={t_i}
            label={t.label}
            rules={[
              { required: true },
              {
                validator: async (rule, value) => {
                  if (value > parentParams?.[t.value]) {
                    throw new Error(`最大值為${parentParams?.[t.value]}`)
                  }
                },
              },
            ]}
            name={t.value}
          >
            <InputNumber
              style={{ width: '100%' }}
              step={100}
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        ))}
        <Button
          size="sm"
          borderRadius="sm"
          colorScheme="blue"
          mt={['auto', '30px']}
          mb={['30px', 'auto']}
          onClick={handleSubmit}
        >
          更新
        </Button>
      </SimpleGrid>
    </Form>
  )
}

export default EditBetSettingParams
